"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useCartStore } from "@/lib/stores/cartStore";
import { useEffect } from "react";
import { format } from "date-fns";
import LinkButton from "@/components/ui/LinkButton";

interface SuccessClientProps {
    order: any;
    paymentMethod: string;
}

export default function SuccessClient({
    order,
    paymentMethod,
}: SuccessClientProps) {
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        clearCart();
    }, []);

    const {
        orderId,
        id,
        createdAt,
        totalPrice,
        orderItems,
        shipCost,
        shipType,
        billingAddress,
        shippingAddress,
    } = order;

    return (
        <section className="container sm:pb-50 pb-24">
            <Card className="bg-green-50">
                <CardContent className=" text-center">
                    <h2 className="text-2xl font-semibold text-green-700">
                        Thank you!
                    </h2>
                    <p className="text-gray-700 mt-2">
                        Your order has been received.
                    </p>
                </CardContent>
            </Card>

            <div className="mt-6">
                <h1 className="text-xl font-semibold mb-2">Order Details</h1>
                <div className="space-y-2 text-sm text-gray-800">
                    <p>
                        <span className="font-medium">Order ID:</span> #{id}
                    </p>
                    <p>
                        <span className="font-medium">Date:</span>{" "}
                        {format(new Date(createdAt), "dd.MM.yyyy HH:mm")}
                    </p>
                    <p>
                        <span className="font-medium">Payment Method:</span>{" "}
                        {paymentMethod}
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <h2 className="text-md font-semibold mb-2">Products</h2>
                <ul className="space-y-4">
                    {orderItems.normalItems.map((item: any) => (
                        <li
                            key={item.id}
                            className="flex items-center gap-4 border rounded-lg p-4"
                        >
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="rounded"
                            />
                            <div className="flex-1">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-gray-600">
                                    Quantity: {item.quantity} × £{" "}
                                    {item.price.toFixed(2)}
                                </p>
                            </div>
                            <div className="font-semibold">
                                £ {(item.quantity * item.price).toFixed(2)}
                            </div>
                        </li>
                    ))}

                    {orderItems.boxDeals.length > 0 && (
                        <>
                            {orderItems.boxDeals.map((box: any) => (
                                <li
                                    key={box.id}
                                    className="border rounded-lg p-4"
                                >
                                    <div className="mb-2">
                                        <div className="flex justify-between">
                                            <h4 className="font-medium">
                                                {box.name}
                                            </h4>
                                            <span className="font-semibold">
                                                £ {box.price.toFixed(2)}{" "}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Selected Products:
                                        </p>
                                    </div>
                                    <ul className="ml-4 list-disc text-sm text-gray-700">
                                        {box.selectedItems.map(
                                            (product: any) => (
                                                <li key={product.id}>
                                                    {product.name} ×{" "}
                                                    {product.quantity}
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            </div>

            <div className="flex items-center gap-4 rounded-lg p-4">
                <div className="flex-1">
                    <h3 className="font-medium">Shipping:</h3>
                </div>
                <div className="font-semibold">
                    {shipType === "local" ? "Local Pickup" : "£ " + shipCost}
                </div>
            </div>

            <div className="mt-6 text-right text-lg font-bold">
                TOTAL: £ {totalPrice.toFixed(2)}
            </div>

            <div className="flex items-center justify-between mt-6">
                {billingAddress && (
                    <div className="flex-1">
                        <h2 className="text-md font-semibold mb-2">
                            Shipping Address
                        </h2>
                        <div className="text-sm text-gray-800 space-y-1">
                            <p>
                                {billingAddress.firstName +
                                    " " +
                                    billingAddress.lastName}
                            </p>
                            <p>{billingAddress.street}</p>
                            <p>{billingAddress.city}</p>
                            <p>{billingAddress.postCode}</p>
                            <p>{billingAddress.phone}</p>
                        </div>
                    </div>
                )}
                {shippingAddress && (
                    <div className="flex-1">
                        <h2 className="text-md font-semibold mb-2">
                            Shipping Address
                        </h2>
                        <div className="text-sm text-gray-800 space-y-1">
                            <p>
                                {shippingAddress.firstName +
                                    " " +
                                    shippingAddress.lastName}
                            </p>
                            <p>{shippingAddress.street}</p>
                            <p>{shippingAddress.city}</p>
                            <p>{shippingAddress.postCode}</p>
                            <p>{shippingAddress.phone}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6 text-center">
                <LinkButton href="/" className="mx-auto">
                    Continue Shopping
                </LinkButton>
            </div>
        </section>
    );
}
