"use server";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LinkButton from "@/components/ui/LinkButton";
import { getAuthToken } from "@/data/services/get-token";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { getUserOrders } from "@/data/services/order-service";
import { format } from "date-fns";

export default async function MyOrders() {
    let orders;
    const user = await getUserMeLoader();
    if (user.ok) {
        const jwt = await getAuthToken();
        orders = await getUserOrders(user.data.id, jwt as string);
    }

    return (
        <section className="container sm:pb-50 pb-24">
            <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
            <div>
                {orders.length > 0 &&
                    orders.map((order) => (
                        <ul key={order?.id} className="space-y-4">
                            <li className="border flex items-center justify-between gap-4 rounded-lg p-4">
                                <div className="space-y-1">
                                    <p className="font-medium">Order ID</p>
                                    <p>{order.id}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-medium">Order Date</p>
                                    <p>
                                        {format(
                                            new Date(order.createdAt),
                                            "dd.MM.yyyy HH:mm",
                                        )}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-medium">Order Status</p>
                                    <Badge className="uppercase ">
                                        {order.orderStatus === "paid"
                                            ? "Prepearing"
                                            : order.orderStatus}
                                    </Badge>
                                </div>

                                <div className="space-y-1">
                                    <p className="font-medium">Total</p>
                                    <p>£ {order.totalPrice}</p>
                                </div>

                                <LinkButton
                                    href={
                                        "/profile/my-orders/" + order.documentId
                                    }
                                    className="rounded-lg"
                                >
                                    Order Details
                                </LinkButton>
                            </li>
                        </ul>
                    ))}
                {orders.length === 0 && (
                    <>
                        <p className="text-lg mb-2">You have not order yet!</p>
                        <LinkButton href="/products">Shop Now</LinkButton>
                    </>
                )}
            </div>
        </section>
    );
}
