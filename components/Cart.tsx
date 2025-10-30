"use client";

import { ShoppingBag } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Cart() {
    // to force re-render on broadcast events
    const [, setForceUpdate] = useState({});

    const menuState = useCartStore((state) => state.menuState);
    const toggleMenu = useCartStore((state) => state.toggleMenu);
    const closeMenu = useCartStore((state) => state.closeMenu);
    const normalItems = useCartStore((state) => state.normalItems);
    const boxDeals = useCartStore((state) => state.boxDeals);
    const removeBoxDeal = useCartStore((state) => state.removeBoxDeal);

    useEffect(() => {
        let broadcastChannel: BroadcastChannel | null = null;

        try {
            broadcastChannel = new BroadcastChannel("cart-sync-channel");

            broadcastChannel.onmessage = () => {
                setForceUpdate({});
            };
        } catch (error) {
            console.warn("BroadcastChannel not supported in this browser");
        }

        return () => {
            if (broadcastChannel) {
                broadcastChannel.close();
            }
        };
    }, []);

    const totalItemCount =
        normalItems.reduce((acc, item) => acc + item.quantity, 0) +
        boxDeals.reduce((acc, deal) => acc + 1, 0);

    const subTotal =
        normalItems.reduce((acc, item) => acc + item.price * item.quantity, 0) +
        boxDeals.reduce((acc, deal) => acc + deal.price, 0);

    // const [open, setOpen] = useState(false);

    return (
        <div className="relative p-2 rounded-full border">
            <span className="bg-primary text-sm text-white w-5 h-5 flex items-center justify-center rounded-full !absolute -right-1 -top-1">
                {totalItemCount}
            </span>

            <Sheet open={menuState} onOpenChange={toggleMenu}>
                <SheetTrigger
                    className="cursor-pointer hover:text-primary"
                    asChild
                >
                    <ShoppingBag />
                </SheetTrigger>
                <SheetContent className="overflow-auto max-sm:w-[85%]">
                    <SheetHeader>
                        <SheetTitle className="mx-auto">My Cart</SheetTitle>
                        <SheetDescription asChild>
                            <div className="space-y-4 mt-4 relative">
                                {normalItems.length > 0 && (
                                    <div className="space-y-2.5">
                                        {normalItems.map((item) => (
                                            <Product
                                                item={item}
                                                key={item.id}
                                            />
                                        ))}
                                    </div>
                                )}

                                {boxDeals.length > 0 &&
                                    boxDeals.map((deal) => (
                                        <div
                                            key={deal.id}
                                            className="flex items-start gap-2 shadow p-2 rounded-lg "
                                        >
                                            <div className="bg-[#e1f2f9] w-[30%] p-1 h-full !aspect-square flex items-center justify-center overflow-hidden rounded-lg">
                                                <Image
                                                    src={deal.image}
                                                    alt={deal.name}
                                                    width={100}
                                                    height={100}
                                                    className="w-full h-full !object-contain"
                                                />
                                            </div>
                                            <div className="w-full flex flex-col justify-between h-full">
                                                <div className="flex items-center justify-between">
                                                    <div className="font-medium text-copy text-ellipsis line-clamp-2">
                                                        {deal.name}
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            removeBoxDeal(
                                                                deal.id,
                                                            )
                                                        }
                                                    >
                                                        <Trash className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </div>
                                                <div className="flex flex-col items-start justify-between">
                                                    <div className="space-y-1 text-sm">
                                                        {deal.selectedItems.map(
                                                            (item) => (
                                                                <div
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    className="text-muted-foreground"
                                                                >
                                                                    {item.name}{" "}
                                                                    (
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                    )
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                    <div className="text-sm font-semibold w-fit mt-2">
                                                        £{" "}
                                                        {deal.price.toFixed(2)}{" "}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                {normalItems.length === 0 &&
                                boxDeals.length === 0 ? (
                                    <p className="text-muted-foreground text-sm">
                                        There is no item in cart.
                                    </p>
                                ) : (
                                    <div className="bg-white sticky bottom-0 w-full py-4 px-2 scale-105">
                                        <div className="mb-4 border-b flex items-end justify-between">
                                            <span className="text-copy font-bold text-sm">
                                                Subtotal:{" "}
                                            </span>
                                            <span className="text-primary font-bold text-lg">
                                                £ {subTotal.toFixed(2)}
                                            </span>
                                        </div>
                                        <Link
                                            href="/checkout"
                                            onClick={() => closeMenu()}
                                            className="w-full py-2.5 rounded-lg bg-primary text-white flex items-center justify-center"
                                        >
                                            Check Out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}

const Product = ({ item }) => {
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeNormalItem = useCartStore((state) => state.removeNormalItem);

    return (
        <div className="flex items-center gap-2 shadow p-2 rounded-lg h-[90px]">
            <div className="bg-[#e1f2f9] w-[30%] p-1 h-full !aspect-square flex items-center justify-center overflow-hidden rounded-lg">
                <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-full h-full !object-contain"
                />
            </div>
            <div className="w-full flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                    <div className="font-medium text-copy text-ellipsis line-clamp-2">
                        {item.name}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeNormalItem(item.id)}
                    >
                        <Trash className="w-4 h-4 text-destructive" />
                    </Button>
                </div>
                <div className="flex items-end justify-between">
                    <div className="text-sm font-semibold">
                        £ {(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="p-1 rounded-full bg-copy text-white disabled:bg-transparent disabled:border disabled:text-copy-light cursor-pointer transition-all"
                            onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                            className="p-1 rounded-full bg-copy text-white disabled:bg-transparent disabled:border disabled:text-copy-light cursor-pointer transition-all"
                            onClick={() =>
                                updateQuantity(
                                    item.id,
                                    item.stock
                                        ? Math.min(
                                              item.quantity + 1,
                                              item.stock,
                                          )
                                        : item.quantity + 1,
                                )
                            }
                            disabled={
                                item.stock !== undefined &&
                                item.quantity >= item.stock
                            }
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
