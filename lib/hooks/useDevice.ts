"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export const useDevice = () => {
    const isClient = typeof window !== "undefined";

    const [ready, setReady] = useState(false);

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const isTablet = useMediaQuery({
        query: "(min-width: 768px) and (max-width: 1023px)",
    });
    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

    useEffect(() => {
        if (isClient) {
            setReady(true);
        }
    }, [isClient]);

    return {
        isMobile,
        isTablet,
        isDesktop,
        ready,
    };
};
