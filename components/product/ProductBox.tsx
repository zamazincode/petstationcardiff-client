"use client";

import { Product } from "@/lib/constants/definitions";
import { getStrapiURL } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ProductBox({ data }: { data: Product }) {
    const imgUrl = getStrapiURL();

    return (
        <div className="relative !max-w-[300px] h-full !min-w-[180px] flex flex-col">
            {data.salePrice && (
                <div className="bg-green-600 px-2.5 py-0.5 text-white rounded-md text-base absolute top-2 left-2 z-10">
                    SALE
                </div>
            )}

            <Link
                href={"/product/" + data.slug}
                className="bg-white rounded-md aspect-square max-h-[280px] relative flex items-center justify-center"
            >
                <Image
                    src={imgUrl + data?.images[0]?.url}
                    alt={data.name}
                    fill
                    className="p-3 !object-contain"
                />
            </Link>

            <div className="mt-2 space-y-2 flex flex-col justify-between h-full">
                <div>
                    <Link
                        href={data.category.slug}
                        className="text-sm text-gray-600 font-light hover:text-gray-900 transition-colors"
                    >
                        {data.category.name}
                    </Link>
                    <Link
                        href={"/product/" + data.slug}
                        className="text-copy font-semibold max-w-full text-wrap line-clamp-2"
                    >
                        {data.name}
                    </Link>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-lg font-bold">
                            £{data.salePrice || data.price}
                        </span>
                        {data.salePrice && (
                            <span className="ml-1 line-through">
                                £{data.price}
                            </span>
                        )}
                    </div>
                    <button className="text-xs bg-primary text-white px-2 py-1.5 rounded-md cursor-pointer hover:bg-primary/90">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
