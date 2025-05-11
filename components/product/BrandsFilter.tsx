"use client";

import { useEffect, useState } from "react";
import { useFilterStore } from "@/lib/stores/filterStore";
import { getBrands } from "@/data/services/get-categories";
import { Brand } from "@/lib/constants/definitions";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { cn, getStrapiURL } from "@/lib/utils";
import { useDevice } from "@/lib/hooks/useDevice";
import { stat } from "fs";

export default function BrandFilter({
    isInside = false,
    forBox = false,
}: {
    isInside?: boolean;
    forBox?: boolean;
}) {
    const [brands, setBrands] = useState<Brand[]>([]);
    const brand = useFilterStore((state) => state.brand);
    const setFilter = useFilterStore((state) => state.setFilter);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const { isTablet, isMobile, ready } = useDevice();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (forBox) {
                    const query = `/api/brands?populate=*&sort[0]=id:desc&filters[box_deals][id][$null]=false`;
                    const _brands = await getBrands(query);
                    setBrands(_brands);
                    setError(false);
                } else {
                    const _brands = await getBrands();
                    setBrands(_brands);
                    setError(false);
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error || !ready) {
        return;
    }

    if ((isMobile || isTablet) && !isInside) {
        return (
            <div className=" md:mx-auto md:w-full md:max-w-7xl">
                <Swiper
                    className="!h-full !pr-2"
                    slidesPerView={"auto"}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                >
                    <SwiperSlide className="!h-auto flex !w-fit">
                        <button
                            className={cn(
                                "cursor-pointer hover:bg-primary/10 transition-colors px-4 py-0.5 border-primary h-full border rounded-xl w-24",
                                {
                                    "bg-primary/10": brand === "",
                                },
                            )}
                            onClick={() => setFilter("brand", "")}
                        >
                            All
                        </button>
                    </SwiperSlide>
                    {brands.map((b) => (
                        <SwiperSlide
                            key={b.id}
                            className="!h-auto !shrink-0 !w-fit"
                        >
                            <button
                                className={cn(
                                    "cursor-pointer hover:bg-primary/10 transition-colors px-4 py-0.5 border-primary h-full border rounded-xl",
                                    {
                                        "bg-primary/10": brand === b.slug,
                                    },
                                )}
                                onClick={() => setFilter("brand", b.slug)}
                            >
                                {b.logo?.url && (
                                    <Image
                                        src={getStrapiURL() + b.logo?.url}
                                        alt={b.name}
                                        width={50}
                                        height={50}
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );
    }

    return (
        <div className="mb-6 md:mx-auto md:w-full md:max-w-7xl ">
            {isInside && <h3 className="text-base font-medium mb-2">Brands</h3>}
            <div
                className={cn(
                    "grid grid-cols-12 grid-flow-dense gap-2 max-h-[320px] pr-2 overflow-auto",
                    {
                        "grid-cols-2": isInside,
                    },
                )}
            >
                <button
                    className={cn(
                        "cursor-pointer hover:bg-primary/10 transition-colors px-4 py-0.5 border-primary border rounded-xl h-auto col-span-1",
                        {
                            "bg-primary/10": brand === "",
                        },
                    )}
                    onClick={() => setFilter("brand", "")}
                >
                    All
                </button>
                {brands.map((b) => (
                    <button
                        key={b.id}
                        className={cn(
                            "cursor-pointer hover:bg-primary/10 transition-colors px-4 py-0.5 border-primary border rounded-xl h-12 col-span-1",
                            {
                                "bg-primary/10": brand === b.slug,
                            },
                        )}
                        onClick={() => setFilter("brand", b.slug)}
                    >
                        {b.logo?.url && (
                            <Image
                                src={getStrapiURL() + b.logo?.url}
                                alt={b.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-contain"
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
