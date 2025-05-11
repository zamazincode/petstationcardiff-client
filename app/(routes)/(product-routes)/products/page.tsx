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
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useDevice } from "@/lib/hooks/useDevice";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/product/CategoryFilter";

type MixedItem = Product | BoxDeal;

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const { ready, isMobile, isTablet } = useDevice();

    const brand = useFilterStore((state) => state.brand);
    const category = useFilterStore((state) => state.category);
    const pet = useFilterStore((state) => state.pet);
    const search = useFilterStore((state) => state.search);
    const priceRange = useFilterStore((state) => state.priceRange);
    const resetFilters = useFilterStore((state) => state.resetFilters);
    const setFilter = useFilterStore((state) => state.setFilter);

    const [filteredItems, setFilteredItems] = useState<MixedItem[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initialBrand = searchParams.get("brand") || "";
        const initialCategory = searchParams.get("category") || "";
        const initialPet = searchParams.get("pet") || "";
        const initialSearchTerm = searchParams.get("search") || "";

        setFilter("brand", initialBrand);
        setFilter("category", initialCategory);
        setFilter("pet", initialPet);
        setFilter("search", initialSearchTerm);
    }, [pathname, searchParams]);

    // fetch filtered data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            params.append("populate", "*");
            params.append("sort[0]", "id:desc");

            if (search) {
                params.append("filters[$or][0][name][$containsi]", search);
                params.append(
                    "filters[$or][1][description][$containsi]",
                    search,
                );
                params.append(
                    "filters[$or][2][category][name][$containsi]",
                    search,
                );
            }
            if (category)
                params.append("filters[category][slug][$eq]", category);
            if (pet) params.append("filters[pets][slug][$eq]", pet);
            if (brand) params.append("filters[brand][slug][$eq]", brand);
            if (priceRange.min)
                params.append(
                    "filters[price][$gte]",
                    priceRange.min.toString(),
                );
            if (priceRange.max)
                params.append(
                    "filters[price][$lte]",
                    priceRange.max.toString(),
                );

            const boxquery = `?${params.toString()}`;
            params.append("filters[stockState][$eq]", "in stock");
            const query = `?${params.toString()}`;

            try {
                const [productsRes, boxDealsRes] = await Promise.all([
                    getProducts(query),
                    getBoxDeals(boxquery),
                ]);

                if (productsRes.error || boxDealsRes.error) {
                    setError(productsRes.error || boxDealsRes.error);
                    return;
                }

                const mixed: MixedItem[] = [
                    ...productsRes.data,
                    ...boxDealsRes.data,
                ];

                setFilteredItems(mixed);
            } catch (err) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // URL
        const params = new URLSearchParams(searchParams.toString());
        if (brand) params.set("brand", brand);
        else params.delete("brand");

        if (category) params.set("category", category);
        else params.delete("category");

        if (pet) params.set("pet", pet);
        else params.delete("pet");

        if (search) params.set("search", search);
        else params.delete("search");

        const newUrl = `${pathname}?${params.toString()}`;
        const currentUrl = `${pathname}?${searchParams.toString()}`;

        if (newUrl !== currentUrl) {
            router.replace(newUrl, { scroll: false });
        }
    }, [pet, category, brand, search, priceRange]);

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
            <div className="mb-8 md:block hidden">
                <h1 className="text-2xl font-semibold mb-2 container">Shop</h1>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-8 gap-4 container">
                {isMobile || isTablet ? (
                    <>
                        <Drawer>
                            <div className="flex justify-between gap-2">
                                <SearchBar />
                                <DrawerTrigger className="border border-primary rounded-full h-full aspect-square flex items-center justify-center p-2 hover:bg-primary transition-all group cursor-pointer">
                                    <Filter className="group-hover:text-white text-primary" />
                                </DrawerTrigger>
                            </div>
                            <DrawerContent className="px-4">
                                <DrawerHeader>
                                    <DrawerTitle></DrawerTitle>
                                </DrawerHeader>
                                <ScrollArea className="overflow-auto no-scrollbar">
                                    <FilterSidebar showBrand />
                                </ScrollArea>
                            </DrawerContent>
                        </Drawer>
                        <CategoryFilter />
                    </>
                ) : (
                    <div className="w-full md:w-72 shrink-0">
                        <FilterSidebar showBrand />
                    </div>
                )}
                <div className="flex-1">
                    {(category || pet || brand || search) && (
                        <div className="mb-4 flex flex-wrap gap-1 md:gap-2.5 items-center">
                            <span>Filters:</span>

                            {search && (
                                <Badge
                                    variant="secondary"
                                    className="text-base font-normal"
                                >
                                    {search}
                                    <button
                                        className="hover:bg-red-500 bg-zinc-300 flex items-center justify-center transition-colors cursor-pointer text-white w-5 h-5 rounded-full"
                                        onClick={() => {
                                            setFilter("search", "");
                                        }}
                                    >
                                        <X size={14} />
                                    </button>
                                </Badge>
                            )}

                            {category && (
                                <Badge
                                    variant="secondary"
                                    className="capitalize text-base font-normal"
                                >
                                    {category.split("-").join(" ")}
                                    <button
                                        className="hover:bg-red-500 bg-zinc-300 flex items-center justify-center transition-colors cursor-pointer text-white w-5 h-5 rounded-full"
                                        onClick={() => {
                                            setFilter("category", "");
                                        }}
                                    >
                                        <X size={14} />
                                    </button>
                                </Badge>
                            )}

                            {pet && (
                                <Badge
                                    variant="secondary"
                                    className="capitalize text-base font-normal"
                                >
                                    {pet.split("-").join(" ")}
                                    <button
                                        className="hover:bg-red-500 bg-zinc-300 flex items-center justify-center transition-colors cursor-pointer text-white w-5 h-5 rounded-full"
                                        onClick={() => {
                                            setFilter("pet", "");
                                        }}
                                    >
                                        <X size={14} />
                                    </button>
                                </Badge>
                            )}

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
