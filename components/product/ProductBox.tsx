"use client";

import { BoxDeal, Product } from "@/lib/constants/definitions";
import { useCartStore } from "@/lib/stores/cartStore";
import { cn, getStrapiURL } from "@/lib/utils";
import { Check, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductBox({
    data,
    className,
    isColored = false,
}: {
    data: Product | BoxDeal;
    className?: string;
    isColored?: boolean;
}) {
    const addNormalItem = useCartStore((state) => state.addNormalItem);
    const [addingToCart, setAddingToCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const isProduct = data?.category?.slug !== "raw-box-deals";

    const url = !isProduct
        ? "/box-deals/" + data.slug
        : "/products/" + data.slug;

    const handleAddToCart = () => {
        if (data && isProduct) {
            setAddingToCart(true);
            setTimeout(() => {
                const item = {
                    id: data.id,
                    slug: data.slug,
                    name: data.name,
                    price: data.salePrice || data.price,
                    quantity: 1,
                    stock: (data as Product)?.trackStock
                        ? (data as Product)?.quantity
                        : undefined,
                    image:
                        data?.images?.length > 0
                            ? getStrapiURL() + data?.images[0].url
                            : "/placeholder-image.png",
                };

                addNormalItem(item);

                setAddingToCart(false);
                setAddedToCart(true);

                setTimeout(() => {
                    setAddedToCart(false);
                }, 2000);
            }, 300);
        } else {
            return;
        }
    };

    return (
        <div
            className={cn(
                "relative !max-w-[300px] h-full sm:!min-w-[180px] flex flex-col",
                className,
            )}
        >
            {data.salePrice && (
                <div className="bg-green-600 px-2.5 py-0.5 text-white rounded-md text-base absolute top-2 left-2 z-[3]">
                    SALE
                </div>
            )}

            <Link
                href={url}
                className="rounded-md aspect-square max-h-[280px] relative flex items-center justify-center"
                style={
                    isColored
                        ? {
                              backgroundColor: "#e1f2f9",
                          }
                        : {
                              backgroundColor: "#fff",
                          }
                }
            >
                <Image
                    src={
                        data.images
                            ? getStrapiURL() + data?.images[0]?.url
                            : "/placeholder-image.png"
                    }
                    alt={data.name}
                    fill
                    className="sm:p-3 p-1 !object-contain"
                />
            </Link>

            <div className="px-2.5 pb-4 mt-2 space-y-2 flex flex-col justify-between h-full">
                <div>
                    {data?.category && (
                        <Link
                            href={`/products?category=${data?.category?.slug}`}
                            className="text-xs sm:text-sm text-gray-600 font-light hover:text-gray-900 transition-colors"
                        >
                            {data.category?.name}
                        </Link>
                    )}
                    <Link
                        href={url}
                        className="text-copy font-semibold max-w-full text-wrap line-clamp-2"
                    >
                        {data.name}
                    </Link>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-base sm:text-lg font-bold">
                            £{data.salePrice || data.price}
                        </span>
                        {data.salePrice && (
                            <span className="ml-1 line-through text-sm sm:text-base">
                                £{data.price}
                            </span>
                        )}
                    </div>
                    {data?.category?.slug === "raw-box-deals" ? (
                        <Link
                            href={url}
                            className="text-primary border border-primary p-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-colors"
                        >
                            <ShoppingCart size={24} fill="#612cc9" />
                        </Link>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            disabled={
                                addingToCart ||
                                ((data as Product)?.trackStock &&
                                    (data as Product)?.stockState ===
                                        "out of stock")
                            }
                            className="text-primary border border-primary p-2 h-11 w-11 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-colors"
                        >
                            {addingToCart ? (
                                <span className="inline-flex items-center gap-2">
                                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-primary"></span>
                                </span>
                            ) : addedToCart ? (
                                <span className="inline-flex items-center gap-2">
                                    <Check size={24} />
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-2">
                                    <ShoppingCart size={24} fill="#612cc9" />
                                </span>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
