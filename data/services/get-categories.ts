import { Brand, Pet } from "@/lib/constants/definitions";
import { getStrapiURL } from "@/lib/utils";

const BASE_URL = getStrapiURL();

export async function getPets(): Promise<Pet[]> {
    const url = BASE_URL + "/api/pets?populate=image&sort[0]=id";

    const response = await fetch(url);
    const data = await response.json();

    return data.data;
}

export async function getBrands(): Promise<Brand[]> {
    const url = BASE_URL + "/api/brands?populate=logo&sort[0]=id:desc";

    const response = await fetch(url);
    const data = await response.json();

    return data.data;
}
