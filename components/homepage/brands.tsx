"use client";

import { getBrands } from "@/data/services/get-categories";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getStrapiURL } from "@/lib/utils";
import Link from "next/link";
import { Brand } from "@/lib/constants/definitions";
import Marquee from "react-fast-marquee";
import { Skeleton } from "../ui/skeleton";

export default function Brands() {
    const [brands, setBrands] = useState<Brand[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchBrands = async () => {
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

        fetchBrands();
    }, []);

    return (
        <Marquee pauseOnHover autoFill>
            {loading ? (
                <div className="uppercase text-xl cursor-pointer rounded-full border hover:bg-primary/10 transition-colors text-copy flex items-center justify-center gap-2.5 border-primary overflow-hidden ml-4 h-[130px] w-[200px]">
                    <Skeleton className="w-full h-full" />
                </div>
            ) : (
                brands?.map((brand) => (
                    <Link
                        key={brand.id}
                        href={"/products?brand=" + brand.slug}
                        className="uppercase text-xl cursor-pointer rounded-full border hover:bg-primary/10 transition-colors text-copy flex items-center justify-center gap-2.5 border-primary overflow-hidden ml-4 h-[130px] w-[200px] px-4 !py-4"
                    >
                        <Image
                            src={getStrapiURL() + brand.logo?.url || ""}
                            width={120}
                            height={120}
                            alt={brand.name}
                            className="object-contain"
                        />
                    </Link>
                ))
            )}
        </Marquee>
    );
}
