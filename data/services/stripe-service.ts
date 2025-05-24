import { getStrapiURL } from "@/lib/utils";

interface CreateCheckoutSessionProps {
    orderId: string;
    totalPrice: number;
    email: string;
    orderItems: any[];
}

const baseUrl = getStrapiURL();

export async function createCheckoutSession(data: CreateCheckoutSessionProps) {
    const url = new URL("/api/stripe/checkout-session", baseUrl);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message ||
                    "An error occurred while creating checkout session.",
            );
        }

        const sessionData = await response.json();
        return sessionData;
    } catch (error: any) {
        console.error(
            "An error occurred while creating checkout session:",
            error,
        );
        return {
            error: {
                message: error.message || "An error occurred!",
            },
        };
    }
}
