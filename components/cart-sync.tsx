// components/CartSync.tsx
"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/stores/cartStore";

export default function CartSync() {
    const normalItems = useCartStore((state) => state.normalItems);
    const boxDeals = useCartStore((state) => state.boxDeals);

    useEffect(() => {
        const channel = new BroadcastChannel("cart_channel");

        channel.onmessage = (event) => {
            // const { normalItems, boxDeals } = event.data || {};
            // if (normalItems || boxDeals) {
            //     setCart({ normalItems, boxDeals });
            // }
            console.log(event);
        };

        return () => {
            channel.close();
        };
    }, []);

    useEffect(() => {
        const channel = new BroadcastChannel("cart_channel");
        channel.postMessage({ normalItems, boxDeals });
        channel.close();
    }, [normalItems, boxDeals]);

    return null;
}
