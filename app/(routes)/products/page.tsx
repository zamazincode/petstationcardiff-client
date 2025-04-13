"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProducts } from "@/data/services/get-products";
import { Product } from "@/lib/constants/definitions";
import ProductBox from "@/components/product/ProductBox";
import { Skeleton } from "@/components/ui/skeleton";
import ProductList from "@/components/product/ProductsList";
import LinkButton from "@/components/ui/LinkButton";
import BrandFilter from "@/components/product/BrandsFilter";

export default function ProductsPage() {
    const searchParams = useSearchParams();

    const [queries, setQueries] = useState({
        search: searchParams.get("search") || "",
        category: searchParams.get("category") || "",
        brand: searchParams.get("brand") || "",
        pet: searchParams.get("pet") || "",
    });

    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            let query = "?populate=*&sort[0]=id:desc";
            //&filters[name][$containsi]=test

            try {
                const { data, error } = await getProducts(query);
                if (error) {
                    setError(error);
                    setLoading(false);
                    return;
                }
                setProducts(data);
            } catch (err) {
                setError("Failed to fetch products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [queries]);

    if (error) {
        return (
            <div className="text-red-500 flex items-center justify-center h-full">
                {error}
            </div>
        );
    }

    return (
        <section className="container pt-8 sm:pb-72 pb-40">
            {/* Filters */}
            <div>
                <BrandFilter />
            </div>

            {/* Products List */}
            {loading && (
                <div className=" conteiner grid grid-cols-2 max-xs:grid-cols-1 max-sm:place-content-center md:grid-cols-3 lg:grid-cols-4 gap-6  justify-between items-stretch">
                    {[...Array(10).keys()].map((i) => (
                        <div
                            key={i}
                            className="p-2 rounded-2xl border border-primary/80 mx-auto w-full h-full max-w-[300px] flex flex-col"
                        >
                            <Skeleton className="rounded-md aspect-square max-h-[280px] relative flex items-center justify-center" />
                            <Skeleton className="w-full h-12 my-2" />
                        </div>
                    ))}
                </div>
            )}

            {!products?.length ? (
                <div className="flex flex-col gap-4 items-center justify-center">
                    <div className="text-red-500 flex items-center justify-center h-full">
                        No products found.
                    </div>
                    <LinkButton href="/products">Clear Filters</LinkButton>
                </div>
            ) : (
                <ProductList loading={loading} products={products} />
            )}
        </section>
    );
}
