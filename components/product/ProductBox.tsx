import { Product } from "@/lib/constants/definitions";
import { cn, getStrapiURL } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const COLORS = [
    "#eef0ff",
    "#e1f2f9",
    "#fff1f4",
    "#e6ffec",
    "#fdffd9",
    "#eaeaff",
];

export default function ProductBox({
    data,
    className,
    isColored = false,
}: {
    data: Product;
    className?: string;
    isColored?: boolean;
}) {
    return (
        <div
            className={cn(
                "relative !max-w-[300px] h-full sm:!min-w-[180px] flex flex-col",
                className,
            )}
        >
            {data.salePrice && (
                <div className="bg-green-600 px-2.5 py-0.5 text-white rounded-md text-base absolute top-2 left-2 z-10">
                    SALE
                </div>
            )}

            <Link
                href={"/products/" + data.slug}
                className="rounded-md aspect-square max-h-[120px] sm:max-h-[280px] relative flex items-center justify-center"
                style={
                    isColored
                        ? {
                              backgroundColor:
                                  COLORS[
                                      Math.floor(Math.random() * COLORS.length)
                                  ],
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

            <div className="mt-2 space-y-2 flex flex-col justify-between h-full">
                <div>
                    {data.category && (
                        <Link
                            href={data.category?.slug || "#"}
                            className="text-xs sm:text-sm text-gray-600 font-light hover:text-gray-900 transition-colors"
                        >
                            {data.category?.name}
                        </Link>
                    )}
                    <Link
                        href={"/products/" + data.slug}
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
                            <span className="ml-1 line-through">
                                £{data.price}
                            </span>
                        )}
                    </div>
                    <button className=" bg-primary text-white px-2 py-1.5 rounded-md cursor-pointer hover:bg-primary/90">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
