"use client";

import { useEffect, useState } from "react";
import { useFilterStore } from "@/lib/stores/filterStore";
import { Category } from "@/lib/constants/definitions";
import { getCategories } from "@/data/services/get-categories";
import Image from "next/image";
import { cn, getStrapiURL } from "@/lib/utils";

export default function CategoryFilter({
    variant = "default",
}: {
    variant?: "default" | "wide";
}) {
    const [categories, setCategories] = useState<Category[]>([]);

    const category = useFilterStore((state) => state.category);
    const setFilter = useFilterStore((state) => state.setFilter);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const _cat = await getCategories();
                setCategories(_cat);
                setError(false);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="">
            {variant === "wide" && (
                <h3 className="text-base font-medium mb-2">Categories</h3>
            )}
            <div
                className={cn("flex gap-2 overflow-auto no-scrollbar", {
                    "flex-col": variant === "wide",
                })}
            >
                <button
                    className={cn(
                        "cursor-pointer border-2 border-accent rounded-full px-6 py-1  hover:border-primary hover:bg-primary/10 transition-all text-xs h-12",
                        {
                            "bg-primary/10 border-primary": category === "",
                            "bg-primary/5": variant === "default",
                        },
                    )}
                    onClick={() => setFilter("category", "")}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className={cn(
                            "cursor-pointer flex border-2 gap-6 border-accent text-xs rounded-full px-6 py-1 hover:border-primary hover:bg-primary/10 transition-all items-center justify-between h-12",
                            {
                                "bg-primary/10 border-primary":
                                    category === cat.slug,
                                "gap-2 justify-center bg-primary/5":
                                    variant === "default",
                            },
                        )}
                        onClick={() => setFilter("category", cat.slug)}
                    >
                        {cat?.image && (
                            <Image
                                src={getStrapiURL() + cat.image.url}
                                alt={cat.name}
                                width={28}
                                height={28}
                                className={cn("w-8 h-8 object-contain", {
                                    "w-6 h-6": variant === "wide",
                                })}
                            />
                        )}
                        <div className="text-left w-full text-nowrap">
                            {cat.name}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
