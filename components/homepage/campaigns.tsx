"use client";

import Image from "next/image";
import Link from "next/link";

export default function Campaigns() {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 md:grid-rows-2 grid-flow-dense  lg:max-h-[600px] gap-6">
            <Link
                href="/box-deals/pet-station-raw-box-20"
                className="md:col-span-1 md:row-span-2 block relative overflow-hidden"
            >
                <div className="absolute bottom-2 w-full text-center flex items-center justify-center flex-col gap-6">
                    <h5 className="text-2xl lg:text-4xl font-bold text-neutral-50">
                        Petstation Mix Box <br />
                        <span className="text-primary">Deal x20</span>
                    </h5>
                    <button className="md:py-3 md:px-5 px-2.5 py-1.5 flex md:gap-4 bg-primary rounded-full text-white w-fit hover:bg-primary/90 transition-all  gap-1 group uppercase cursor-pointer">
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
                    </button>
                </div>
                <div className="w-full h-full overflow-hidden">
                    <Image
                        src="/campaigns/campaign-1.webp"
                        alt="Campaign Image"
                        width={537}
                        height={735}
                        className="w-full h-full object-cover object-bottom rounded-2xl"
                    />
                </div>
            </Link>

            <Link
                href="/box-deals/southcliffe-mince-mix-box-deal-x30"
                className="md:col-span-1 md:row-span-1 block relative overflow-hidden"
            >
                <div className="absolute bottom-2 w-full text-center flex items-center justify-center flex-col gap-6">
                    <h5 className="text-2xl lg:text-4xl font-bold text-neutral-50">
                        Petstation Mix Box <br />
                        <span className="text-primary">Deal x20</span>
                    </h5>
                    <button className="md:py-3 md:px-5 px-2.5 py-1.5 flex md:gap-4 bg-primary rounded-full text-white w-fit hover:bg-primary/90 transition-all  gap-1 group uppercase cursor-pointer">
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
                    </button>
                </div>
                <div className="w-full h-full overflow-hidden">
                    <Image
                        src="/campaigns/campaign-1.webp"
                        alt="Campaign Image"
                        width={537}
                        height={735}
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>
            </Link>

            <Link
                href="/box-deals/just-natural-mix-box-20"
                className="md:col-span-1 md:row-span-1 block relative overflow-hidden"
            >
                <div className="absolute bottom-2 w-full text-center flex items-center justify-center flex-col gap-6">
                    <h5 className="text-2xl lg:text-4xl font-bold text-neutral-50">
                        Petstation Mix Box <br />
                        <span className="text-primary">Deal x20</span>
                    </h5>
                    <button className="md:py-3 md:px-5 px-2.5 py-1.5 flex md:gap-4 bg-primary rounded-full text-white w-fit hover:bg-primary/90 transition-all  gap-1 group uppercase cursor-pointer">
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
                    </button>
                </div>
                <div className="w-full h-full overflow-hidden">
                    <Image
                        src="/campaigns/campaign-1.webp"
                        alt="Campaign Image"
                        width={537}
                        height={735}
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>
            </Link>
        </div>
    );
}
