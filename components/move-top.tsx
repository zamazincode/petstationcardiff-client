"use client";

import { ArrowUp } from "lucide-react";

export default function MoveTop() {
    const handleClick = () => {
        if (document) {
            document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <button
            onClick={handleClick}
            className="group cursor-pointer fixed bottom-4 right-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary text-white z-50"
        >
            <ArrowUp className="group-hover:-translate-y-1 transition-all" />
        </button>
    );
}
