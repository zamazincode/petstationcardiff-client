"use client";

import { Product } from "@/lib/constants/definitions";
import { Skeleton } from "../ui/skeleton";
import ProductBox from "./ProductBox";

type ProductListProps = {
    loading: boolean;
    products: Product[] | null;
};

export default function ProductList({ loading, products }: ProductListProps) {
    return (
        <div className="grid grid-cols-2 max-xs:grid-cols-1 max-sm:place-content-center md:grid-cols-3 lg:grid-cols-4 gap-6  justify-between items-stretch">
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
