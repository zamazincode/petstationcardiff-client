import { getOrder } from "@/data/services/order-service";
import { format } from "date-fns";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function OrderDetailPage({
    params,
}: {
    params: { documentId: string };
}) {
    const { documentId } = await params;
    const order = await getOrder(documentId);

    const {
        id,
        orderId,
        createdAt,
        orderStatus,
        totalPrice,
        orderItems,
        shipType,
        shipCost,
        email,
        billingAddress,
        shippingAddress,
        paymentMethod,
    } = order;

    return (
        <section className="container sm:pb-50 pb-24">
            <div className="flex items-center mb-4 gap-4">
                <Button asChild variant="ghost">
                    <Link href={"/profile/my-orders"}>
                        <ArrowLeft />
                    </Link>
                </Button>
                <h2 className="text-2xl font-semibold">Order Summary</h2>
            </div>

            <div className="space-y-2.5 text-sm text-gray-800">
                <p>
                    <span className="font-medium">Order ID:</span> #{id}
                </p>

                <p>
                    <span className="font-medium">Date:</span>{" "}
                    {format(new Date(createdAt), "dd.MM.yyyy HH:mm")}
                </p>
                <p>
                    <span className="font-medium">Email:</span> {email}
                </p>
                <p>
                    <span className="font-medium">Payment Method:</span>{" "}
                    {paymentMethod}
                </p>
                <p className="flex items-center gap-2">
                    <span className="font-medium">Order Status:</span>
                    <Badge className="">
                        {orderStatus === "paid"
                            ? "prepearing"
                            : orderStatus.toUpperCase()}
                    </Badge>
                </p>
            </div>

            <div className="mt-6">
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
                                    Quantity: {item.quantity} × £
                                    {item.price.toFixed(2)}
                                </p>
                            </div>
                            <div className="font-semibold">
                                £{(item.quantity * item.price).toFixed(2)}
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
                                    <div className="mb-2 flex justify-between">
                                        <h4 className="font-medium">
                                            {box.name}
                                        </h4>
                                        <span className="font-semibold">
                                            £{box.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Selected Products:
                                    </p>
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
        </section>
    );
}
