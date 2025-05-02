"use client";

import { BoxDeal, Product } from "@/lib/constants/definitions";
import ProductBox from "./ProductBox";

type MixedItem = Product | BoxDeal;
type ProductListProps = {
    products: MixedItem[] | null;
};

export default function ProductList({ products }: ProductListProps) {
    return (
        <div className="grid grid-cols-2 max-sm:place-content-center md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-6 justify-between items-stretch">
            {products?.map((product) => (
                <ProductBox
                    className="bg-white border rounded-2xl  mx-auto w-full"
                    data={product}
                    key={product.id}
                    isColored
                />
            ))}
        </div>
    );
}
