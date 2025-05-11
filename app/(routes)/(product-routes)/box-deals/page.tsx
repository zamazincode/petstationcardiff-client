"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getProducts, getBoxDeals } from "@/data/services/get-products";
import { Product, BoxDeal } from "@/lib/constants/definitions";
import ProductList from "@/components/product/ProductsList";
import LinkButton from "@/components/ui/LinkButton";
import { Filter, FilterX, RefreshCcw, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilterStore } from "@/lib/stores/filterStore";
import FilterSidebar from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDevice } from "@/lib/hooks/useDevice";
import SearchBar from "@/components/SearchBar";
import BrandFilter from "@/components/product/BrandsFilter";

type MixedItem = Product | BoxDeal;

export default function BoxDealsPage() {
    const router = useRouter();
    const pathname = usePathname();

    const { ready, isMobile, isTablet } = useDevice();

    const brand = useFilterStore((state) => state.brand);
    const resetFilters = useFilterStore((state) => state.resetFilters);
    const setFilter = useFilterStore((state) => state.setFilter);

    const [filteredItems, setFilteredItems] = useState<MixedItem[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // fetch filtered data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            params.append("populate", "*");
            params.append("sort[0]", "id:desc");

            if (brand) params.append("filters[brand][slug][$eq]", brand);

            const boxquery = `?${params.toString()}`;

            try {
                const boxDealsRes = await getBoxDeals(boxquery);

                if (boxDealsRes.error) {
                    setError(boxDealsRes.error);
                    return;
                }

                const mixed: MixedItem[] = [...boxDealsRes.data];

                setFilteredItems(mixed);
            } catch (err) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [brand]);

    if (!ready) return;

    if (error) {
        return (
            <section className="container pt-8 flex flex-col gap-4 items-center justify-center">
                <div className="text-red-500">An error occurred</div>
                <LinkButton href={pathname}>
                    Retry <RefreshCcw />
                </LinkButton>
            </section>
        );
    }

    return (
        <section className="sm:pb-50 pb-24">
            <div className="mb-8 lg:block hidden">
                <h1 className="text-2xl font-semibold mb-2 container">
                    Raw Box Deals
                </h1>
                <BrandFilter forBox />
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-8 gap-4 container">
                {isMobile || isTablet ? (
                    <>
                        <h1 className="text-2xl font-semibold container">
                            Raw Box Deals
                        </h1>

                        <SearchBar />

                        <BrandFilter forBox />
                    </>
                ) : (
                    <></>
                )}
                <div className="flex-1">
                    {brand && (
                        <div className="mb-4 flex flex-wrap gap-1 md:gap-2.5 items-center">
                            <span>Filters:</span>

                            {brand && (
                                <Badge
                                    variant="secondary"
                                    className="capitalize text-base font-normal"
                                >
                                    {brand.split("-").join(" ")}
                                    <button
                                        className="hover:bg-red-500 bg-zinc-300 flex items-center justify-center transition-colors cursor-pointer text-white w-5 h-5 rounded-full"
                                        onClick={() => {
                                            setFilter("brand", "");
                                        }}
                                    >
                                        <X size={14} />
                                    </button>
                                </Badge>
                            )}

                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={resetFilters}
                                className="h-8 px-2 ml-auto"
                            >
                                <FilterX className="mr-1 h-4 w-4" />
                                Clear
                            </Button>
                        </div>
                    )}
                    {filteredItems && filteredItems?.length > 0 && (
                        <div className="mb-2 text-copy-light font-light">
                            <span className="text-copy font-semibold">
                                {filteredItems?.length}
                            </span>{" "}
                            results found
                        </div>
                    )}

                    {/* Loading skeleton */}
                    {loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-between items-stretch">
                            {[...Array(9).keys()].map((i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl border mx-auto w-full h-full max-w-[300px] flex flex-col"
                                >
                                    <Skeleton className="rounded-md aspect-square max-h-[230px] relative flex items-center justify-center" />
                                    <Skeleton className="w-full h-12 my-2" />
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredItems && filteredItems.length > 0 ? (
                        <ProductList products={filteredItems} />
                    ) : (
                        !loading && (
                            <div className="flex flex-col gap-4 items-center justify-center py-12">
                                <div className="text-gray-500 text-center">
                                    <p className="text-xl mb-2">
                                        Product not found!
                                    </p>
                                    <p>Please change filters</p>
                                </div>
                                <Button
                                    onClick={() =>
                                        useFilterStore.getState().resetFilters()
                                    }
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
