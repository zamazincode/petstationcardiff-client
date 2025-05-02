"use client";

import { getProducts } from "@/data/services/get-products";
import { Product } from "@/lib/constants/definitions";
import { useEffect, useState } from "react";
import ProductBox from "./ProductBox";
import { Skeleton } from "../ui/skeleton";

export default function RelatedProducts({ rel }: { rel: string }) {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            const query =
                rel && rel !== "raw-box-deals"
                    ? `?populate=*&filters[category][slug][$eq]=${rel}&pagination[start]=0&pagination[limit]=4`
                    : "?populate=*&pagination[start]=0&pagination[limit]=4";
            const { data, error } = await getProducts(query);
            if (error) {
                setError(error);
                setLoading(false);
                return;
            }
            setProducts(data);
            setLoading(false);
        };

        fetchProducts();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (loading) {
        return (
            <div className="grid grid-cols-2 max-xs:grid-cols-1 max-sm:place-content-center md:grid-cols-3 lg:grid-cols-4 gap-6  justify-between items-stretch">
                {[...Array(4).keys()].map((i) => (
                    <div
                        key={i}
                        className="relative h-full max-w-[300px] flex flex-col"
                    >
                        <Skeleton className="rounded-md aspect-square max-h-[280px] relative flex items-center justify-center" />
                        <Skeleton className="w-full h-12 my-2" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 max-sm:place-content-center md:grid-cols-3 lg:grid-cols-4 gap-6  justify-between items-stretch">
            {products?.map((product) => (
                <ProductBox key={product.id} isColored data={product} />
            ))}
        </div>
    );
}
