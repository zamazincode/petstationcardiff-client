import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getSiteURL } from "@/lib/utils";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const items = [
            ...data.items.map((item) => ({
                price_data: {
                    currency: "gbp",
                    product_data: {
                        name: item.name,
                        metadata: { slug: item.slug || "" },
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            {
                price_data: {
                    currency: "gbp",
                    product_data: {
                        name: "Shipping Cost",
                    },
                    unit_amount: Math.round((data.shipPrice as number) * 100),
                },
                quantity: 1,
            },
        ];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: data?.email,
            line_items: items,
            metadata: {
                orderId: data.orderId,
            },
            success_url: `${
                getSiteURL() || "http://localhost:3000"
            }/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${
                getSiteURL() || "http://localhost:3000"
            }/checkout/?canceled=true`,
        });

        // if (session.url) return NextResponse.redirect(session.url, 303);
        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 },
        );
    }
}
