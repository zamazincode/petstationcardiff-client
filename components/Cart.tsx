import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Cart() {
    // cart store a göre span ı sergile

    return (
        <div className="relative p-2 rounded-full border">
            <span className="bg-primary text-sm text-white w-5 h-5 flex items-center justify-center rounded-full !absolute -right-1 -top-1">
                1
            </span>
            <Link href="/cart">
                <ShoppingBag />
            </Link>
        </div>
    );
}
