import { BoxDeal, Product } from "@/lib/constants/definitions";
import { cn, getStrapiURL } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ProductBox({
    data,
    className,
    isColored = false,
}: {
    data: Product | BoxDeal;
    className?: string;
    isColored?: boolean;
}) {
    const url =
        data?.category?.slug === "raw-box-deals"
            ? "/box-deals/" + data.slug
            : "/products/" + data.slug;

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
                            href={data.category?.slug || "#"}
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 14 14"
                            >
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M3.505.078a.75.75 0 0 1 .746.675l.285 2.833h7.549a1.43 1.43 0 0 1 1.217.6a1.43 1.43 0 0 1 .199 1.286l-1.239 3.725V9.2a1.43 1.43 0 0 1-1.417.973H4.994a1.43 1.43 0 0 1-1.431-1.24L3.08 4.135l-.002-.052l-.252-2.506H1.177a.75.75 0 0 1 0-1.5zm7.15 11.566a1.178 1.178 0 1 1 0 2.356a1.178 1.178 0 0 1 0-2.356m-3.969 1.178a1.178 1.178 0 1 0-2.355 0a1.178 1.178 0 0 0 2.355 0m1.626-7.759a.625.625 0 0 0-.625.625v.687H7a.625.625 0 1 0 0 1.25h.687v.687a.625.625 0 0 0 1.25 0v-.687h.687a.625.625 0 1 0 0-1.25h-.687v-.687a.625.625 0 0 0-.625-.625"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </Link>
                    ) : (
                        <button
                            onClick={() => {
                                // add cart action
                            }}
                            className="text-primary border border-primary p-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 14 14"
                            >
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M3.505.078a.75.75 0 0 1 .746.675l.285 2.833h7.549a1.43 1.43 0 0 1 1.217.6a1.43 1.43 0 0 1 .199 1.286l-1.239 3.725V9.2a1.43 1.43 0 0 1-1.417.973H4.994a1.43 1.43 0 0 1-1.431-1.24L3.08 4.135l-.002-.052l-.252-2.506H1.177a.75.75 0 0 1 0-1.5zm7.15 11.566a1.178 1.178 0 1 1 0 2.356a1.178 1.178 0 0 1 0-2.356m-3.969 1.178a1.178 1.178 0 1 0-2.355 0a1.178 1.178 0 0 0 2.355 0m1.626-7.759a.625.625 0 0 0-.625.625v.687H7a.625.625 0 1 0 0 1.25h.687v.687a.625.625 0 0 0 1.25 0v-.687h.687a.625.625 0 1 0 0-1.25h-.687v-.687a.625.625 0 0 0-.625-.625"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
