"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProducts, getBoxDeals } from "@/data/services/get-products";
import { Product, BoxDeal } from "@/lib/constants/definitions";
import ProductList from "@/components/product/ProductsList";
import LinkButton from "@/components/ui/LinkButton";
import BrandFilter from "@/components/product/BrandsFilter";
import { RefreshCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BoxDealsPage() {
    const searchParams = useSearchParams();

    const [queries, setQueries] = useState({
        search: searchParams.get("search") || "",
        category: searchParams.get("category") || "",
        brand: searchParams.get("brand") || "",
        pet: searchParams.get("pet") || "",
    });

    const [items, setItems] = useState<Product[] | BoxDeal[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            let query = "?populate=*&sort[0]=id:desc";

            try {
                const boxdealsRes = await getBoxDeals(query);

                if (boxdealsRes.error) {
                    setError(boxdealsRes.error);
                    return;
                }

                setItems(boxdealsRes.data);
            } catch (err) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [queries]);

    if (error) {
        return (
            <section className="container pt-8 flex flex-col gap-4 items-center justify-center">
                <div className="text-red-500">An error occurred</div>
                <LinkButton href="/products">
                    Retry <RefreshCcw />
                </LinkButton>
            </section>
        );
    }

    return (
        <section className="container pt-8 sm:pb-72 pb-40">
            <div>
                <BrandFilter />
            </div>

            {/* Loading skeleton */}
            {loading && (
                <div className="grid grid-cols-2 max-xs:grid-cols-1 max-sm:place-content-center md:grid-cols-3 lg:grid-cols-4 gap-6 justify-between items-stretch">
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

            {!loading && items && items.length > 0 ? (
                <ProductList loading={false} products={items} />
            ) : (
                !loading && (
                    <div className="flex flex-col gap-4 items-center justify-center">
                        <div className="text-red-500 flex items-center justify-center h-full">
                            No items found.
                        </div>
                        <LinkButton href="/products">Clear Filters</LinkButton>
                    </div>
                )
            )}
        </section>
    );
}
