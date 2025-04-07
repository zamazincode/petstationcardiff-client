"use client";

import { getPets } from "@/data/services/get-categories";
import { Pet } from "@/lib/constants/definitions";
import { useEffect, useState } from "react";

import Image from "next/image";
import { getStrapiURL } from "@/lib/utils";
import Link from "next/link";

export default function Categories() {
    const [pets, setPets] = useState<Pet[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const pets = await getPets();
                setPets(pets);
                setError(false);
            } catch (error) {
                console.log("Pets fetch error -> ", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <div className="flex items-stretch gap-6 flex-wrap">
                {/* <Link
                    href={"/products"}
                    className="uppercase text-xl cursor-pointer rounded-full px-6 py-2 border bg-primary/10 transition-colors text-copy flex items-center justify-center gap-2.5 border-primary"
                >
                    All
                </Link> */}
                {pets?.map((pet) => (
                    <Link
                        key={pet.id}
                        href={"/products?pet=" + pet.slug}
                        className="uppercase text-xl cursor-pointer rounded-full px-6 py-2 border border-muted-foreground hover:bg-primary/10 transition-colors text-copy flex items-center justify-center gap-2.5 hover:border-primary"
                    >
                        <Image
                            src={getStrapiURL() + pet.image?.url || ""}
                            width={32}
                            height={32}
                            alt={pet.name}
                        />
                        {pet.name}
                    </Link>
                ))}
            </div>

            <div className="flex flex-wrap gap-6 mt-20">
                <div className="flex-[2] flex items-center justify-between gap-8 bg-[#FDFFD9] rounded-2xl p-8 pr-24 h-[220px]">
                    <Image
                        src="/raw.png"
                        alt="Raw Food"
                        className=""
                        width={300}
                        height={300}
                    />
                    <div>
                        <h5 className="text-xl font-bold mb-4">RAW FOOD</h5>
                        <Link
                            href={"/"}
                            className="uppercase text-xl cursor-pointer rounded-full px-6 py-3 border bg-[#ABB400] transition-colors text-white flex items-center justify-center gap-2.5"
                        >
                            Shop
                        </Link>
                    </div>
                </div>

                <div className="flex-[3] flex items-center justify-center gap-24 bg-[#E6FFEC] rounded-2xl p-24 pl-12 h-[220px]">
                    <div>
                        <h5 className="text-xl font-bold mb-4">DRY FOOD</h5>
                        <Link
                            href={"/"}
                            className="uppercase text-xl cursor-pointer rounded-full px-6 py-3 border bg-[#00B82C] transition-colors text-white flex items-center justify-center gap-2.5"
                        >
                            Shop
                        </Link>
                    </div>
                    <Image
                        src="/dry.png"
                        alt="Raw Food"
                        className="-translate-y-24"
                        width={220}
                        height={300}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-20">
                <div className="flex-[3] flex items-center justify-center gap-8 bg-[#FDFFD9] rounded-2xl p-8 h-[220px]">
                    <Image
                        src="/raw.png"
                        alt="Raw Food"
                        className=""
                        width={300}
                        height={300}
                    />
                    <div>
                        <h5 className="text-xl font-bold mb-4">RAW FOOD</h5>
                        <Link
                            href={"/"}
                            className="uppercase text-xl cursor-pointer rounded-full px-6 py-3 border bg-[#ABB400] transition-colors text-white flex items-center justify-center gap-2.5"
                        >
                            Shop
                        </Link>
                    </div>
                </div>

                <div className="flex-[2] flex items-center justify-center gap-8 bg-[#E6FFEC] rounded-2xl p-8 h-[220px]">
                    <div>
                        <h5 className="text-xl font-bold mb-4">DRY FOOD</h5>
                        <Link
                            href={"/"}
                            className="uppercase text-xl cursor-pointer rounded-full px-6 py-3 border bg-[#00B82C] transition-colors text-white flex items-center justify-center gap-2.5"
                        >
                            Shop
                        </Link>
                    </div>
                    <Image
                        src="/dry.png"
                        alt="Raw Food"
                        className="-translate-y-12"
                        width={150}
                        height={300}
                    />
                </div>

                <div className="flex-[2] flex flex-col items-center justify-center bg-[#EAEAFF] rounded-2xl h-[220px]">
                    <Image
                        src="/toy.png"
                        alt="Pet Toys"
                        className="-translate-y-12"
                        width={300}
                        height={300}
                    />
                    <div className="text-center -translate-y-12">
                        <h5 className="text-xl font-bold mb-4">TOYS</h5>
                        <Link
                            href={"/"}
                            className="uppercase text-xl cursor-pointer rounded-full px-6 py-3 border bg-[#5D5DFF] transition-colors text-white flex items-center justify-center gap-2.5"
                        >
                            Shop
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
