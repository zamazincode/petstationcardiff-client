"use client";

import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function MoveTop() {
    const handleClick = () => {
        if (document) {
            document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <button
            onClick={handleClick}
            className={cn(
                "group cursor-pointer fixed md:bottom-4 bottom-16 right-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary text-white z-50 opacity-100 transition-all",
                { "opacity-0": !show },
            )}
        >
            <ArrowUp className="group-hover:-translate-y-1 transition-all" />
        </button>
    );
}
