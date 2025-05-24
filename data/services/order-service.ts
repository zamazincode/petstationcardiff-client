import { getStrapiURL } from "@/lib/utils";

export async function createOrder(data: any) {
    const baseUrl = getStrapiURL();
    const url = new URL("/api/orders", baseUrl);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data }),
        });

        return response.json();
    } catch (error) {
        console.log("***************************************");
        console.error("An error when creating order:", error);
        console.log("***************************************");
        return {
            error: {
                message: "An error occured!",
            },
        };
    }
}

export async function getOrder(id: string) {
    const baseUrl = getStrapiURL();
    const url = new URL(`/api/orders/${id}?populate=*`, baseUrl);

    try {
        const response = await fetch(url, { cache: "no-store" });
        const data = await response.json();

        return data.data;
    } catch (error) {
        console.log("***************************************");
        console.error("An error when getting order:", error);
        console.log("***************************************");
        return {
            error: {
                message: "An error occured!",
            },
        };
    }
}

export async function putOrder(id: string, paymentMethod: string) {
    const baseUrl = getStrapiURL();
    const url = new URL(`/api/orders/${id}`, baseUrl);

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    orderStatus: "paid",
                    paymentMethod,
                },
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("***************************************");
        console.error("An error when getting order:", error);
        console.log("***************************************");
        return {
            error: {
                message: "An error occured!",
            },
        };
    }
}

export async function getUserOrders(userId: string, jwt: string) {
    const query = `?filters[userId][$eq]=${userId}&populate=*`;

    const res = await fetch(`${getStrapiURL()}/api/orders${query}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
        cache: "no-store",
    });

    const json = await res.json();
    return json.data;
}
