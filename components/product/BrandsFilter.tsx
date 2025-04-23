"use client";

import { getBrands } from "@/data/services/get-categories";
import { Brand } from "@/lib/constants/definitions";
import { getStrapiURL } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BrandFilter() {
    const [brands, setBrands] = useState<Brand[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const _brands = await getBrands();
                setBrands(_brands);
                setError(false);
            } catch (error) {
                console.log("Brands fetch error -> ", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="mb-6">
            <h4 className="text-lg font-semibold text-zinc-700">
                Filter by Brands
            </h4>

            <div className="flex flex-wrap gap-2.5 mt-4">
                {brands?.map((brand) => (
                    <button
                        key={brand.id}
                        className="flex items-center justify-center px-4 py-1.5 bg-primary/10 rounded-full cursor-pointer hover:bg-primary/20 transition-all gap-2"
                        onClick={() => console.log(brand.slug)}
                    >
                        <Image
                            src={getStrapiURL() + brand?.logo?.url || ""}
                            alt={brand?.name}
                            width={60}
                            height={60}
                            className="object-contain"
                        />
                        {/* {brand?.name} */}
                    </button>
                ))}
            </div>
        </div>
    );
}
