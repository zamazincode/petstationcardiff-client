"use server";

import { z } from "zod";
import { getUserMeLoader } from "../services/get-user-me-loader";
import { getBoxDeals, getProducts } from "../services/get-products";
import { getSiteURL } from "@/lib/utils";
import { createOrder } from "../services/order-service";

const required = (message: string) => z.string().min(1, { message });

const schemaCheckout = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),

    // billing address
    bilFirstName: required("Please enter first name"),
    bilLastName: required("Please enter last name"),
    bilStreet: required("Please enter address"),
    bilCity: required("Please enter city"),
    bilPostCode: required("Please enter post code"),
    bilPhone: required("Please enter phone number"),
});

export async function checkoutAction(prevState: any, formData: FormData) {
    try {
        const validatedFields = schemaCheckout.safeParse({
            email: formData.get("email"),

            bilFirstName: formData.get("bilFirstName"),
            bilLastName: formData.get("bilLastName"),
            bilStreet: formData.get("bilStreet"),
            bilCity: formData.get("bilCity"),
            bilPostCode: formData.get("bilPostCode"),
            bilPhone: formData.get("bilPhone"),
        });

        if (!validatedFields.success) {
            return {
                ...prevState,
                zodErrors: validatedFields.error.flatten().fieldErrors,
            };
        }

        // get datas

        // if user exist, send user also
        const user = await getUserMeLoader();
        const userId = user.ok ? user.data.id : null;

        const email = validatedFields.data.email as string;

        // addresses
        const billingAddress = {
            firstName: validatedFields.data.bilFirstName as string,
            lastName: validatedFields.data.bilLastName as string,
            street: validatedFields.data.bilStreet as string,
            city: validatedFields.data.bilCity as string,
            postCode: validatedFields.data.bilPostCode as string,
            phone: validatedFields.data.bilPhone as string,
        };

        const isAddressesDifferent = formData.get("differentAddress") === "on";
        let shippingAddress: any;
        if (isAddressesDifferent) {
            shippingAddress = {
                firstName: formData.get("shipFirstName") as string,
                lastName: formData.get("shipLastName") as string,
                street: formData.get("shipStreet") as string,
                city: formData.get("shipCity") as string,
                postCode: formData.get("shipPostCode") as string,
                phone: formData.get("shipPhone") as string,
            };
        } else {
            shippingAddress = billingAddress;
        }

        // products
        const normalItems = JSON.parse(formData.get("normalItems") as string);
        const boxDeals = JSON.parse(formData.get("boxDeals") as string);

        const orderItems = {
            normalItems,
            boxDeals,
        };

        // total price
        let totalPrice = 0;

        if (normalItems.length > 0) {
            for (const item of normalItems) {
                const query = `?filters[slug][$eq]=${item.slug}`;

                const { data, error } = await getProducts(query);
                if (error) {
                    return {
                        error: "Couldn't get the products price!",
                    };
                }

                const price = data[0].salePrice
                    ? data[0].salePrice
                    : data[0].price;
                totalPrice += price;
            }
        }

        if (boxDeals.length > 0) {
            for (const item of boxDeals) {
                const query = `?filters[slug][$eq]=${item.slug}`;

                const { data, error } = await getBoxDeals(query);
                if (error) {
                    return {
                        error: "Couldn't get the box deal price!",
                    };
                }
                item.quantity = 1;
                const price = data[0].salePrice
                    ? data[0].salePrice
                    : data[0].price;
                totalPrice += price;
            }
        }

        const shipPrice =
            (formData.get("shipping") as string) === "local" ? 0 : 4;
        totalPrice += shipPrice;
        const shipType =
            (formData.get("shipping") as string) === "local" ? "local" : "flat";

        // shipping note
        const note = formData.get("note") as string;

        const data = {
            orderItems: JSON.stringify(orderItems),
            totalPrice,
            user: userId,
            email,
            billingAddress,
            shippingAddress,
            note: note || "",
            shipType,
            shipCost: shipPrice,
            url: null,
        };

        // create order
        const order_res = await createOrder(data);
        if (order_res.error) {
            return {
                error: order_res.err,
            };
        }

        // stripe
        const items = [...normalItems, ...boxDeals];
        const res = await fetch(getSiteURL() + "/api/checkout_session", {
            method: "POST",
            body: JSON.stringify({
                items,
                shipPrice,
                email,
                orderId: order_res.order.documentId,
            }),
        });
        const _data = await res.json();
        if (_data.error) {
            return { error: "An error occured in payment!" };
        }

        data.url = _data.url;

        return data;
    } catch (err) {
        return { error: "An error occured!" };
    }
}
