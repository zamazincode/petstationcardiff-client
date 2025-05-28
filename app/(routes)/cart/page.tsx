"use client";

import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/stores/cartStore";
import { Button } from "@/components/ui/button";

export default function CartPage() {
    // Force re-render on broadcast events
    const [, setForceUpdate] = useState({});

    const normalItems = useCartStore((state) => state.normalItems);
    const boxDeals = useCartStore((state) => state.boxDeals);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeNormalItem = useCartStore((state) => state.removeNormalItem);
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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="w-6 h-6 text-primary" />
                            <h1 className="text-xl font-semibold">My Cart</h1>
                            {totalItemCount > 0 && (
                                <span className="bg-primary text-white text-sm px-2 py-1 rounded-full">
                                    {totalItemCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Cart Items Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-medium mb-4">
                                Cart Items
                            </h2>

                            {normalItems.length === 0 &&
                            boxDeals.length === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-muted-foreground text-lg">
                                        Your cart is empty
                                    </p>
                                    <p className="text-muted-foreground text-sm mb-6">
                                        Add some items to get started
                                    </p>
                                    <Link
                                        href="/"
                                        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Normal Items */}
                                    {normalItems.length > 0 && (
                                        <div className="space-y-4">
                                            {normalItems.map((item) => (
                                                <ProductItem
                                                    key={item.id}
                                                    item={item}
                                                    updateQuantity={
                                                        updateQuantity
                                                    }
                                                    removeNormalItem={
                                                        removeNormalItem
                                                    }
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Box Deals */}
                                    {boxDeals.length > 0 && (
                                        <div className="space-y-4">
                                            {normalItems.length > 0 && (
                                                <div className="border-t pt-4">
                                                    <h3 className="font-medium text-primary mb-4">
                                                        Special Deals
                                                    </h3>
                                                </div>
                                            )}
                                            {boxDeals.map((deal) => (
                                                <BoxDealItem
                                                    key={deal.id}
                                                    deal={deal}
                                                    removeBoxDeal={
                                                        removeBoxDeal
                                                    }
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    {(normalItems.length > 0 || boxDeals.length > 0) && (
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                                <h2 className="text-lg font-medium mb-4">
                                    Order Summary
                                </h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span>Products ({totalItemCount})</span>
                                        <span>£{subTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between font-semibold text-lg">
                                            <span>Subtotal</span>
                                            <span className="text-primary">
                                                £{subTotal.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="w-full py-3 px-4 bg-primary text-white rounded-lg text-center font-medium hover:bg-primary/90 transition-colors block"
                                >
                                    Proceed to Checkout
                                </Link>

                                <Link
                                    href="/"
                                    className="w-full py-2 px-4 text-primary text-center text-sm hover:text-primary/80 transition-colors block mt-3"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const ProductItem = ({ item, updateQuantity, removeNormalItem }) => {
    return (
        <div className="flex gap-4 p-4 border rounded-lg hover:shadow-sm transition-shadow">
            <div className="bg-[#e1f2f9] w-24 h-24 sm:w-28 sm:h-28 p-2 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-medium text-copy line-clamp-2 text-sm sm:text-base">
                        {item.name}
                    </h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeNormalItem(item.id)}
                        className="flex-shrink-0 h-8 w-8"
                    >
                        <Trash className="w-4 h-4 text-destructive" />
                    </Button>
                </div>

                <div className="flex justify-between items-end gap-2">
                    <div className="text-sm sm:text-base font-semibold">
                        £{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="p-1 rounded-full bg-copy text-white disabled:bg-transparent disabled:border disabled:text-copy-light transition-all"
                            onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                            className="p-1 rounded-full bg-copy text-white disabled:bg-transparent disabled:border disabled:text-copy-light transition-all"
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

const BoxDealItem = ({ deal, removeBoxDeal }) => {
    return (
        <div className="flex gap-4 p-4 border rounded-lg bg-gradient-to-r from-primary/5 to-transparent hover:shadow-sm transition-shadow">
            <div className="bg-[#e1f2f9] w-24 h-24 sm:w-28 sm:h-28 p-2 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                <Image
                    src={deal.image}
                    alt={deal.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-medium text-copy line-clamp-2 text-sm sm:text-base">
                        {deal.name}
                    </h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeBoxDeal(deal.id)}
                        className="flex-shrink-0 h-8 w-8"
                    >
                        <Trash className="w-4 h-4 text-destructive" />
                    </Button>
                </div>

                <div className="space-y-1 text-xs sm:text-sm mb-3">
                    {deal.selectedItems.map((item) => (
                        <div key={item.id} className="text-muted-foreground">
                            {item.name} ({item.quantity})
                        </div>
                    ))}
                </div>

                <div className="text-sm sm:text-base font-semibold text-primary">
                    £{deal.price.toFixed(2)}
                </div>
            </div>
        </div>
    );
};
