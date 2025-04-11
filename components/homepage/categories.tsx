"use client";

import { getPets } from "@/data/services/get-categories";
import { Pet } from "@/lib/constants/definitions";
import { useEffect, useState } from "react";

import Image from "next/image";
import { cn, getStrapiURL } from "@/lib/utils";
import Link from "next/link";
import LinkButton from "../ui/LinkButton";

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
            {/* Pets */}
            <div className="flex items-stretch gap-6 flex-wrap">
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

            {/* Categories */}
            <div className="grid grid-flow-dense grid-cols-12 gap-6 mt-8">
                <CategoryBlock className="md:col-span-7">
                    <div className="">
                        <Image
                            src="/raw.png"
                            alt="Raw Foods"
                            width={320}
                            height={320}
                            className="h-auto"
                        />
                    </div>
                    <div className="flex flex-col gap-2.5 items-center justify-center">
                        <h3 className="md:text-2xl text-lg font-semibold">
                            Raw Food
                        </h3>
                        <LinkButton
                            href="/products?category=raw-food"
                            className="bg-[#FF5075] gap-1 hover:bg-[#FF5075]/90 group uppercase"
                        >
                            Explore
                            <svg
                                className="group-hover:translate-x-1 transition-all"
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    opacity="0.4"
                                    d="M13.73 8.52002L8.67999 12.31V17.92C8.67999 18.88 9.83999 19.36 10.52 18.68L15.7 13.5C16.53 12.67 16.53 11.32 15.7 10.49L13.73 8.52002Z"
                                    fill="white"
                                />
                                <path
                                    d="M8.67999 6.08005V12.31L13.73 8.52005L10.52 5.31005C9.83999 4.64005 8.67999 5.12005 8.67999 6.08005Z"
                                    fill="white"
                                />
                            </svg>
                        </LinkButton>
                    </div>
                </CategoryBlock>

                <CategoryBlock className="md:col-span-5 bg-[#FDFFD9]">
                    <div className="flex flex-col gap-2.5 items-center justify-center">
                        <h3 className="md:text-2xl text-lg font-semibold">
                            Dry Food
                        </h3>
                        <LinkButton
                            href="/products?category=dry-food"
                            className="bg-[#ABB400] gap-1 hover:bg-[#ABB400]/90 group uppercase"
                        >
                            Explore
                            <svg
                                className="group-hover:translate-x-1 transition-all"
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    opacity="0.4"
                                    d="M13.73 8.52002L8.67999 12.31V17.92C8.67999 18.88 9.83999 19.36 10.52 18.68L15.7 13.5C16.53 12.67 16.53 11.32 15.7 10.49L13.73 8.52002Z"
                                    fill="white"
                                />
                                <path
                                    d="M8.67999 6.08005V12.31L13.73 8.52005L10.52 5.31005C9.83999 4.64005 8.67999 5.12005 8.67999 6.08005Z"
                                    fill="white"
                                />
                            </svg>
                        </LinkButton>
                    </div>

                    <div className="md:-translate-y-12">
                        <Image
                            src="/dry.png"
                            alt="Dry Foods"
                            width={150}
                            height={150}
                            className="h-auto"
                        />
                    </div>
                </CategoryBlock>

                <CategoryBlock className="md:col-span-5 bg-[#EEFDFF]">
                    <div className="">
                        <Image
                            src="/raw-treats.png"
                            alt="Raw Foods"
                            width={250}
                            height={250}
                            className="h-auto"
                        />
                    </div>
                    <div className="flex flex-col gap-2.5 items-center justify-center">
                        <h3 className="md:text-2xl text-lg font-semibold">
                            Raw Treats
                        </h3>
                        <LinkButton
                            href="/products?category=raw-treats"
                            className="bg-[#00BDD6] gap-1 hover:bg-[#00BDD6]/90 group uppercase"
                        >
                            Explore
                            <svg
                                className="group-hover:translate-x-1 transition-all"
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    opacity="0.4"
                                    d="M13.73 8.52002L8.67999 12.31V17.92C8.67999 18.88 9.83999 19.36 10.52 18.68L15.7 13.5C16.53 12.67 16.53 11.32 15.7 10.49L13.73 8.52002Z"
                                    fill="white"
                                />
                                <path
                                    d="M8.67999 6.08005V12.31L13.73 8.52005L10.52 5.31005C9.83999 4.64005 8.67999 5.12005 8.67999 6.08005Z"
                                    fill="white"
                                />
                            </svg>
                        </LinkButton>
                    </div>
                </CategoryBlock>

                <CategoryBlock className="md:col-span-4 bg-[#E6FFEC]">
                    <div className="flex flex-col gap-2.5 items-center justify-center md:translate-y-8">
                        <h3 className="md:text-2xl text-lg font-semibold">
                            Dry Treats
                        </h3>
                        <LinkButton
                            href="/products?category=dry-treats"
                            className="bg-[#00B82C] gap-1 hover:bg-[#00B82C]/90 group uppercase"
                        >
                            Explore
                            <svg
                                className="group-hover:translate-x-1 transition-all"
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    opacity="0.4"
                                    d="M13.73 8.52002L8.67999 12.31V17.92C8.67999 18.88 9.83999 19.36 10.52 18.68L15.7 13.5C16.53 12.67 16.53 11.32 15.7 10.49L13.73 8.52002Z"
                                    fill="white"
                                />
                                <path
                                    d="M8.67999 6.08005V12.31L13.73 8.52005L10.52 5.31005C9.83999 4.64005 8.67999 5.12005 8.67999 6.08005Z"
                                    fill="white"
                                />
                            </svg>
                        </LinkButton>
                    </div>

                    <div className="md:-translate-y-12 -scale-x-100">
                        <Image
                            src="/dry-treats.png"
                            alt="Dry Treats"
                            width={457}
                            height={218}
                            className="h-auto md:scale-140"
                        />
                    </div>
                </CategoryBlock>

                <CategoryBlock className="md:col-span-3 bg-[#EAEAFF] md:gap-0 md:flex-col">
                    <div className="md:-translate-y-12">
                        <Image
                            src="/toy.png"
                            alt="Toys"
                            width={350}
                            height={300}
                            className="w-[350px] h-auto"
                        />
                    </div>
                    <div className="flex flex-col gap-2.5 items-center justify-center md:-translate-y-8">
                        <h3 className="md:text-2xl text-lg font-semibold">
                            Toys
                        </h3>
                        <LinkButton
                            href="/products?category=toys"
                            className="bg-[#5D5DFF] gap-1 hover:bg-[#5D5DFF]/90 group uppercase"
                        >
                            Explore
                            <svg
                                className="group-hover:translate-x-1 transition-all"
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    opacity="0.4"
                                    d="M13.73 8.52002L8.67999 12.31V17.92C8.67999 18.88 9.83999 19.36 10.52 18.68L15.7 13.5C16.53 12.67 16.53 11.32 15.7 10.49L13.73 8.52002Z"
                                    fill="white"
                                />
                                <path
                                    d="M8.67999 6.08005V12.31L13.73 8.52005L10.52 5.31005C9.83999 4.64005 8.67999 5.12005 8.67999 6.08005Z"
                                    fill="white"
                                />
                            </svg>
                        </LinkButton>
                    </div>
                </CategoryBlock>
            </div>
        </div>
    );
}

type BlockProps = {
    children?: React.ReactNode;
    className?: string;
};

const CategoryBlock = ({ children, className }: BlockProps) => {
    return (
        <div
            className={cn(
                "col-span-full bg-[#FFF1F4] md:p-6 p-4 gap-2.5 rounded-2xl flex justify-evenly items-center max-h-[240px]",
                className,
            )}
        >
            {children}
        </div>
    );
};
