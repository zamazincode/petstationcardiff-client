"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AutoScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        if (window) window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
