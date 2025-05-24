"use client";

import { cn } from "@/lib/utils";
import { House, PackageOpen, ShoppingBag, Tag, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
    const path = usePathname();

    return (
        <nav className="lg:hidden !fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] min-h-[50px] bg-primary gradient-purple z-[50] px-4 py-1 flex justify-between">
            <Link
                href="/products"
                className={cn(
                    "rounded-xl p-1 flex flex-col items-center text-xs text-white font-medium gap-0.5 px-2",
                    { "bg-white/40": path === "/products" },
                )}
            >
                <House />
                Home
            </Link>

            <Link
                href="/products/all-brands"
                className={cn(
                    "rounded-xl p-1 flex flex-col items-center text-xs text-white font-medium gap-0.5 px-2",
                    { "bg-white/40": path === "/products/all-brands" },
                )}
            >
                <Tag />
                Brands
            </Link>

            <Link
                href="/cart"
                className={cn(
                    "rounded-xl p-1 flex flex-col items-center text-xs text-white font-medium gap-0.5 px-2",
                    { "bg-white/40": path === "/cart" },
                )}
            >
                <ShoppingBag />
                Cart
            </Link>

            <Link
                href="/box-deals"
                className={cn(
                    "rounded-xl p-1 flex flex-col items-center text-xs text-white font-medium gap-0.5 px-2",
                    { "bg-white/40": path === "/box-deals" },
                )}
            >
                <PackageOpen />
                Campaigns
            </Link>

            <Link
                href="/profile/my-orders"
                className={cn(
                    "rounded-xl p-1 flex flex-col items-center text-xs text-white font-medium gap-0.5 px-2",
                    { "bg-white/40": path === "/profile/my-orders" },
                )}
            >
                <User2 />
                Profile
            </Link>
        </nav>
    );
}
