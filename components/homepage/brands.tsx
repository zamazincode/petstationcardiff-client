"use client";

import { getBrands } from "@/data/services/get-categories";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getStrapiURL } from "@/lib/utils";
import Link from "next/link";
import { Brand } from "@/lib/constants/definitions";
import Marquee from "react-fast-marquee";

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
        <div>
            <Marquee pauseOnHover autoFill>
                {brands?.map((brand) => (
                    <Link
                        key={brand.id}
                        href={"/products?brand=" + brand.slug}
                        className="uppercase text-xl cursor-pointer rounded-full px-6 border hover:bg-primary/10 transition-colors text-copy flex items-center justify-center gap-2.5 border-primary overflow-hidden ml-4 h-[120px]"
                    >
                        <Image
                            src={getStrapiURL() + brand.logo?.url || ""}
                            width={150}
                            height={150}
                            alt={brand.name}
                        />
                    </Link>
                ))}
            </Marquee>
        </div>
    );
}
