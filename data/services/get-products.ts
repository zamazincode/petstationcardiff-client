import { BoxDeal, Product, StrapiResponse } from "@/lib/constants/definitions";
import { getStrapiURL } from "@/lib/utils";

export async function getProducts(
    query: string,
): Promise<StrapiResponse<Product>> {
    const url = getStrapiURL() + "/api/products" + query;

    try {
        const response = await fetch(url, { cache: "no-store" });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred");
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        return {
            data: [],
            error: error.message || "Unknown error",
        };
    }
}

export async function getBoxDeals(
    query: string,
): Promise<StrapiResponse<BoxDeal>> {
    const url = getStrapiURL() + "/api/box-deals" + query;

    try {
        const response = await fetch(url, { cache: "no-store" });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred");
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        return {
            data: [],
            error: error.message || "Unknown error",
        };
    }
}
