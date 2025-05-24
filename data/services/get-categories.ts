import { Brand, Category, Pet } from "@/lib/constants/definitions";
import { getStrapiURL } from "@/lib/utils";

const BASE_URL = getStrapiURL();

export async function getCategories(): Promise<Category[]> {
    const url =
        BASE_URL + "/api/categories?populate=image&sort[0]=createdAt:asc";

    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();

    return data.data;
}

export async function getPets(): Promise<Pet[]> {
    const url = BASE_URL + "/api/pets?populate=image&sort[0]=id";

    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();

    return data.data;
}

export async function getBrands(
    query = "/api/brands?populate=logo&sort[0]=id:desc",
): Promise<Brand[]> {
    const url = BASE_URL + query;

    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();

    return data.data;
}
