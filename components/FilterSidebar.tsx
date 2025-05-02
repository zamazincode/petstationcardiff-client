"use client";

import { Button } from "@/components/ui/button";
import { useFilterStore } from "@/lib/stores/filterStore";
import { FilterX } from "lucide-react";
import CategoryFilter from "./product/CategoryFilter";
import PetFilter from "./product/PetFilter";
import PriceRangeFilter from "./product/PriceRangeFilter";
import { Separator } from "./ui/separator";
import BrandFilter from "./product/BrandsFilter";

export default function FilterSidebar({
    showBrand = false,
    showCategory = true,
}: {
    showBrand?: boolean;
    showCategory?: boolean;
}) {
    const resetFilters = useFilterStore((state) => state.resetFilters);

    return (
        <div className="space-y-4 md:border-r md:pr-8 ">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="h-8 px-2"
                >
                    <FilterX className="mr-1 h-4 w-4" />
                    Clear
                </Button>
            </div>
            <div className="border-t pt-4">
                {showCategory && <CategoryFilter variant="wide" />}
                <Separator className="my-4" />
                {showBrand && <BrandFilter isInside />}
                <Separator className="my-4" />
                <PetFilter />
                <Separator className="my-4" />
                <PriceRangeFilter />
            </div>
        </div>
    );
}
