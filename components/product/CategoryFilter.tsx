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
    const { category, setFilter } = useFilterStore();

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

    return (
        <div className="mb-6">
            {variant === "wide" && (
                <h3 className="text-base font-medium mb-2">Categories</h3>
            )}
            <div
                className={cn("flex gap-2", {
                    "flex-col": variant === "wide",
                })}
            >
                <button
                    className={cn(
                        "cursor-pointer border-2 border-accent rounded-full px-5 py-1  hover:border-primary hover:bg-primary/10 transition-all text-xs h-8",
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
                            "cursor-pointer flex border-2 gap-6 border-accent text-xs rounded-full px-6 py-1 hover:border-primary hover:bg-primary/10 transition-all items-center justify-between h-8 text-nowrap",
                            {
                                "bg-primary/10 border-primary":
                                    category === cat.slug,
                                "gap-2 bg-primary/5": variant === "default",
                            },
                        )}
                        onClick={() => setFilter("category", cat.slug)}
                    >
                        {cat?.image && (
                            <Image
                                src={getStrapiURL() + cat.image.url}
                                alt={cat.name}
                                width={24}
                                height={24}
                                className="w-6 h-6 object-contain"
                            />
                        )}
                        <div className="text-left w-full">{cat.name}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}
