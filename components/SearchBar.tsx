"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchBar() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSearch = () => {
        if (value.trim() !== "") {
            router.push(`/products?search=${encodeURIComponent(value)}`);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                handleSearch();
            }
        };

        const input = inputRef.current;
        input?.addEventListener("keydown", handleKeyDown);

        return () => {
            input?.removeEventListener("keydown", handleKeyDown);
        };
    }, [value]);

    return (
        <div className="flex items-center px-4 py-2 rounded-full bg-accent min-w-44">
            <input
                ref={inputRef}
                placeholder="Search Products"
                value={value}
                onChange={handleChange}
                className="bg-transparent outline-0 text-sm w-full"
            />
            <button onClick={handleSearch} className="ml-2">
                <Search />
            </button>
        </div>
    );
}
