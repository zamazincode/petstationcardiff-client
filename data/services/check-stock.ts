import { getProducts } from "./get-products";

export async function checkStock(
    slug: string,
    quantity: number,
): Promise<number> {
    const query = `?filters[slug][$eq]=${slug}`;

    const { data, error } = await getProducts(query);

    if (error) return 0;

    const product = data[0];

    if (product.trackStock) {
        return product.quantity;
    }

    return quantity;
}
