"use client";

import { useCartStore } from "@/lib/stores/cartStore";
import { cn } from "@/lib/utils";
import { House, PackageOpen, ShoppingBag, Tag, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
    const path = usePathname();

    const normalItems = useCartStore((state) => state.normalItems);
    const boxDeals = useCartStore((state) => state.boxDeals);

    const totalItemCount =
        normalItems.reduce((acc, item) => acc + item.quantity, 0) +
        boxDeals.reduce((acc, deal) => acc + 1, 0);

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
                    "rounded-xl p-1 flex flex-col items-center text-xs text-white font-medium gap-0.5 px-2 relative",
                    { "bg-white/40": path === "/cart" },
                )}
            >
                <span className="bg-primary text-sm text-white w-5 h-5 flex items-center justify-center rounded-full !absolute -right-1 -top-1">
                    {totalItemCount}
                </span>
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
