"use client";

import { cn } from "@/lib/utils";
import { House, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
    const path = usePathname();

    return (
        <nav className="lg:hidden !fixed bottom-2 left-1/2 -translate-x-1/2 rounded-2xl w-[90%] max-w-[360px] min-h-[50px] bg-primary gradient-purple z-[50] px-4 py-1 flex justify-between">
            <Link
                href="/products"
                className={cn(
                    "rounded-xl p-1 flex flex-col items-center text-xs text-white font-medium gap-0.5",
                    { "bg-white/40": path === "/products" },
                )}
            >
                <House />
                Home
            </Link>

            <Link
                href="/all-brands"
                className={cn(
                    "rounded-xl p-1 flex flex-col items-center text-xs text-white font-medium gap-0.5",
                    { "bg-white/40": path === "/all-brands" },
                )}
            >
                <Search />
                Products
            </Link>

            <Link
                href="/cart"
                className={cn(
                    "rounded-xl p-1 flex flex-col items-center text-xs text-white font-medium gap-0.5",
                    { "bg-white/40": path === "/cart" },
                )}
            >
                <ShoppingBag />
                Cart
            </Link>

            <Link
                href="/products"
                className={cn(
                    "rounded-xl p-1 flex flex-col items-center text-xs text-white font-medium gap-0.5",
                    { "bg-white/40": path === "/products" },
                )}
            >
                <House />
                Home
            </Link>

            <Link
                href="/products"
                className={cn(
                    "rounded-xl p-1 flex flex-col items-center text-xs text-white font-medium gap-0.5",
                    { "bg-white/40": path === "/products" },
                )}
            >
                <House />
                Home
            </Link>
        </nav>
    );
}
