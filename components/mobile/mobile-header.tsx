"use client";

import { useState } from "react";
import Cart from "../Cart";
import Logo from "../Logo";
import { cn } from "@/lib/utils";

export default function MobileHeader() {
    // const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="container lg:hidden flex justify-between items-center my-4">
            {/* <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="rounded-full border border-primary"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6h10M4 12h16M7 12h13M4 18h10"
                    ></path>
                </svg>
            </button> */}

            <Logo className="text-lg" />

            <Cart />

            {/* <aside className={cn("absolute")}></aside> */}
        </header>
    );
}
