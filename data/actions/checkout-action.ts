"use server";

import { z } from "zod";
import { getUserMeLoader } from "../services/get-user-me-loader";
import { getBoxDeals, getProducts } from "../services/get-products";
import { getSiteURL } from "@/lib/utils";
import { createOrder } from "../services/order-service";
import { checkStock } from "../services/check-stock";
import { BoxDeal, Product } from "@/lib/stores/cartStore";

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

		// Parse cart items from client (zustand store)
		const normalItemsFromClient: Product[] = JSON.parse(
			formData.get("normalItems") as string,
		);
		const boxDealsFromClient: BoxDeal[] = JSON.parse(
			formData.get("boxDeals") as string,
		);

		// Validate and calculate prices from backend
		let totalPrice = 0;
		const validatedNormalItems: Product[] = [];

		// CRITICAL: Validate normal items with backend data
		if (normalItemsFromClient.length > 0) {
			for (const item of normalItemsFromClient) {
				// Get real product data from backend
				const query = `?filters[slug][$eq]=${item.slug}`;
				const { data, error } = await getProducts(query);

				if (error || !data || data.length === 0) {
					return {
						error: `Product ${item.slug} not found`,
					};
				}

				const product = data[0];

				// Check stock availability
				const availableStock = await checkStock(
					item.slug,
					item.quantity,
				);

				if (availableStock === 0) {
					return {
						error: `${product.name} is out of stock`,
					};
				}

				if (item.quantity > availableStock) {
					return {
						error: `Only ${availableStock} units available for ${product.name}`,
					};
				}

				// Use backend price, not client price!
				const backendPrice = product.salePrice || product.price;
				const itemTotal = backendPrice * item.quantity;
				totalPrice += itemTotal;

				validatedNormalItems.push({
					id: item.id,
					slug: item.slug,
					name: product.name,
					price: backendPrice,
					quantity: item.quantity,
					stock: availableStock,
					image: item.image,
				});
			}
		}

		// CRITICAL: Validate box deals with backend data
		const validatedBoxDeals: BoxDeal[] = [];
		if (boxDealsFromClient.length > 0) {
			for (const deal of boxDealsFromClient) {
				const query = `?filters[slug][$eq]=${deal.slug}`;
				const { data, error } = await getBoxDeals(query);

				if (error || !data || data.length === 0) {
					return {
						error: `Box deal ${deal.slug} not found`,
					};
				}

				const boxDealData = data[0];

				// Use backend price, not client price!
				const backendPrice = boxDealData.salePrice || boxDealData.price;
				totalPrice += backendPrice;

				// Validate selected items in box deal
				const validatedSelectedItems: Product[] = [];
				for (const selectedItem of deal.selectedItems) {
					const itemQuery = `?filters[slug][$eq]=${selectedItem.slug}`;
					const { data: itemData } = await getProducts(itemQuery);

					if (itemData && itemData.length > 0) {
						const itemProduct = itemData[0];
						validatedSelectedItems.push({
							id: selectedItem.id,
							slug: selectedItem.slug,
							name: itemProduct.name,
							price: itemProduct.salePrice || itemProduct.price,
							quantity: selectedItem.quantity,
							image: selectedItem.image,
						});
					}
				}

				validatedBoxDeals.push({
					id: deal.id,
					slug: deal.slug,
					name: boxDealData.name,
					maxSelection: deal.maxSelection,
					price: backendPrice,
					selectedItems: validatedSelectedItems,
					image: deal.image,
				});
			}
		}

		// Calculate shipping
		const shipType =
			formData.get("shipping") === "local" ? "local" : "flat";
		const shipPrice = shipType === "local" ? 0 : 4;
		totalPrice += shipPrice;

		const orderItems = {
			normalItems: validatedNormalItems,
			boxDeals: validatedBoxDeals,
		};

		const orderData = {
			orderItems: JSON.stringify(orderItems),
			totalPrice,
			user: userId,
			email: validatedFields.data.email,
			billingAddress,
			shippingAddress,
			note: (formData.get("note") as string) || "",
			shipType,
			shipCost: shipPrice,
			url: null,
		};

		// Create order
		const orderResult = await createOrder(orderData);
		if (orderResult.error) {
			return {
				error: orderResult.error || "Failed to create order",
			};
		}

		// stripe
		// Prepare items for Stripe (normal items + box deals flattened)
		const stripeItems = [
			...validatedNormalItems.map((item) => ({
				slug: item.slug,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
			})),
			...validatedBoxDeals.map((deal) => ({
				slug: deal.slug,
				name: deal.name,
				price: deal.price,
				quantity: 1, // Box deals always have quantity 1
			})),
		];

		// Create Stripe checkout session
		const stripeResponse = await fetch(
			getSiteURL() + "/api/checkout_session",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					items: stripeItems,
					shipPrice,
					email: validatedFields.data.email,
					orderId: orderResult.order.documentId,
				}),
			},
		);

		const stripeData = await stripeResponse.json();

		if (stripeData.error || !stripeData.url) {
			return {
				error: "Payment processing failed. Please try again.",
			};
		}

		return {
			url: stripeData.url,
		};
	} catch (err) {
		console.error("Checkout error:", err);
		return {
			error: "An unexpected error occurred. Please try again.",
		};
	}
}
