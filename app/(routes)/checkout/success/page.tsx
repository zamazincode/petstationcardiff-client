"use server";

import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import SuccessClient from "./SuccessClient";
import { getOrder, putOrder } from "@/data/services/order-service";
import Stripe from "stripe";
import Link from "next/link";

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) {
        return (
            <section className="container">
                <div className="text-red-600 bg-red-200">
                    An error occured! Please contact us
                    info@petstationcardiff.com
                </div>
            </section>
        );
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent.payment_method"],
    });

    const { status, metadata } = session;

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
    const paymentMethod = paymentIntent.payment_method as Stripe.PaymentMethod;

    const cardInfo = paymentMethod.card;
    const formattedPaymentMethod = `${cardInfo?.brand.toUpperCase()} **** ${
        cardInfo?.last4
    }`;

    if (status === "open") {
        return redirect(session.url ?? "/checkout?canceled=true");
    }

    if (status === "complete") {
        // update order status
        const orderId = metadata?.orderId;
        if (orderId) {
            const res = await putOrder(orderId, formattedPaymentMethod);

            if (res.error && res.error.status === 500) {
                return (
                    <div className="container text-xl text-red-500">
                        We got your order but if you didn't receive an email
                        please contact us{" "}
                        <Link
                            className="underline"
                            href="mailto:info@petstation.com"
                        >
                            info@petstation.com
                        </Link>
                    </div>
                );
            }

            const orderData = await getOrder(orderId);
            if (orderData && !orderData.error) {
                return (
                    <>
                        <SuccessClient
                            order={orderData}
                            paymentMethod={formattedPaymentMethod}
                        />
                    </>
                );
            }
        }
    }

    return (
        <div className="container text-xl text-red-500">
            Transaction is invalid or expired
        </div>
    );
}
