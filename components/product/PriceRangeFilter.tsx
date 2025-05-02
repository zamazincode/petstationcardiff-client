"use client";

import { useState, useEffect, useRef } from "react";
import { useFilterStore } from "@/lib/stores/filterStore";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { getBoxDeals, getProducts } from "@/data/services/get-products";
import { Button } from "@/components/ui/button";

export default function PriceRangeFilter() {
    const { priceRange, setPriceRange } = useFilterStore();
    const [maxPriceLimit, setMaxPriceLimit] = useState(10000);
    const [isLoading, setIsLoading] = useState(true);
    const initialLoad = useRef(true);

    const [sliderValues, setSliderValues] = useState<number[]>([
        priceRange.min ?? 0,
        priceRange.max ?? maxPriceLimit,
    ]);

    const [minPrice, setMinPrice] = useState<string>(
        priceRange.min?.toString() || "",
    );
    const [maxPrice, setMaxPrice] = useState<string>(
        priceRange.max?.toString() || "",
    );

    useEffect(() => {
        async function fetchMaxPrice() {
            setIsLoading(true);
            try {
                const query = "?sort[0]=price:desc&pagination[pageSize]=1";
                const [productsRes, boxRes] = await Promise.all([
                    getProducts(query),
                    getBoxDeals(query),
                ]);

                const productPrice = productsRes?.data?.[0]?.price ?? 0;
                const boxPrice = boxRes?.data?.[0]?.price ?? 0;

                const maxPrice = Math.ceil(Math.max(productPrice, boxPrice));
                setMaxPriceLimit(maxPrice || 100);
            } catch (error) {
                console.error("Failed to fetch max price:", error);
                setMaxPriceLimit(100);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMaxPrice();
    }, []);

    useEffect(() => {
        setMinPrice(priceRange.min?.toString() || "");
        setMaxPrice(priceRange.max?.toString() || "");
        setSliderValues([priceRange.min ?? 0, priceRange.max ?? maxPriceLimit]);
    }, [priceRange.min, priceRange.max, maxPriceLimit]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value);

        if (value === "") {
            setSliderValues([0, sliderValues[1]]);
        } else {
            const numValue = Number(value);
            if (!isNaN(numValue) && numValue <= sliderValues[1]) {
                setSliderValues([numValue, sliderValues[1]]);
                if (!initialLoad.current) {
                    setPriceRange(numValue, sliderValues[1] || null);
                }
            }
        }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxPrice(value);

        if (value === "") {
            setSliderValues([sliderValues[0], maxPriceLimit]);
        } else {
            const numValue = Number(value);
            if (!isNaN(numValue) && numValue >= sliderValues[0]) {
                setSliderValues([sliderValues[0], numValue]);
                if (!initialLoad.current) {
                    setPriceRange(sliderValues[0] || null, numValue);
                }
            }
        }
    };

    const handleSliderChange = (values: number[]) => {
        setSliderValues(values);
        setMinPrice(values[0].toString());
        setMaxPrice(values[1].toString());

        if (!initialLoad.current) {
            setPriceRange(values[0], values[1]);
        }
    };

    const handleClear = () => {
        setMinPrice("");
        setMaxPrice("");
        setSliderValues([0, maxPriceLimit]);
        setPriceRange(null, null);
    };

    const handleApply = () => {
        const min = Number(minPrice) || 0;
        const max = Number(maxPrice) || maxPriceLimit;
        setPriceRange(min, max);
    };

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-medium">Price</h3>
                <Button
                    variant="link"
                    size="sm"
                    onClick={handleClear}
                    className="h-6 px-0 text-xs underline"
                >
                    Clear
                </Button>
            </div>

            <div className="mt-2 mb-4 relative">
                <div className="flex justify-between mb-1 px-2">
                    <div
                        className="bg-primary text-primary-foreground text-xs font-medium rounded-sm px-2 py-1"
                        style={{ transform: "translateX(-25%)" }}
                    >
                        {sliderValues[0]}£
                    </div>
                    <div
                        className="bg-primary text-primary-foreground text-xs font-medium rounded-sm px-2 py-1"
                        style={{ transform: "translateX(25%)" }}
                    >
                        {sliderValues[1]}£
                    </div>
                </div>

                <Slider
                    value={sliderValues}
                    min={0}
                    max={maxPriceLimit}
                    step={1}
                    onValueChange={handleSliderChange}
                    className="my-4"
                    disabled={isLoading}
                />
            </div>

            <div className="flex items-center">
                <div className="flex-1">
                    <Input
                        value={minPrice}
                        onChange={handleMinChange}
                        type="number"
                        className="w-full rounded-md text-center"
                        disabled={isLoading}
                        placeholder="0"
                        min={0}
                        max={sliderValues[1]}
                    />
                </div>
                <div className="px-2 text-muted-foreground">-</div>
                <div className="flex-1">
                    <Input
                        value={maxPrice}
                        onChange={handleMaxChange}
                        type="number"
                        className="w-full rounded-md text-center"
                        disabled={isLoading}
                        placeholder={maxPriceLimit.toString()}
                        min={sliderValues[0]}
                        max={maxPriceLimit}
                    />
                </div>
            </div>

            <Button className="mt-4 w-full" onClick={handleApply}>
                Apply
            </Button>
        </div>
    );
}
