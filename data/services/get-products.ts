import { Product } from "@/lib/constants/definitions";
import { getStrapiURL } from "@/lib/utils";

export async function getProducts(query: string): Promise<Product[] | null> {
    const url = getStrapiURL() + "/api" + query;

    const response = await fetch(url);
    const data = await response.json();

    return data.data;
}
