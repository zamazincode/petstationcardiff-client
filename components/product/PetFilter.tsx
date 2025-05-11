"use client";

import { useEffect, useState } from "react";
import { useFilterStore } from "@/lib/stores/filterStore";
import { Pet } from "@/lib/constants/definitions";
import { getPets } from "@/data/services/get-categories";
import Image from "next/image";
import { cn, getStrapiURL } from "@/lib/utils";

export default function PetFilter() {
    const [pets, setPets] = useState<Pet[]>([]);
    const pet = useFilterStore((state) => state.pet);
    const setFilter = useFilterStore((state) => state.setFilter);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const _pet = await getPets();
                setPets(_pet);
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
            <h3 className="text-base font-medium mb-2">Pets</h3>
            <div className="flex flex-wrap gap-2">
                <button
                    className={cn(
                        "cursor-pointer border-2 border-accent rounded-full px-5 py-1  hover:border-primary hover:bg-primary/10 transition-all text-xs ",
                        {
                            "bg-primary/10 border-primary": pet === "",
                        },
                    )}
                    onClick={() => setFilter("category", "")}
                >
                    All
                </button>
                {pets.map((p) => (
                    <button
                        key={p.id}
                        className={cn(
                            "cursor-pointer flex gap-2.5 border-2 border-accent  rounded-full px-2.5 py-1 hover:border-primary hover:bg-primary/10 transition-all uppercase text-xs items-center justify-center",
                            {
                                "bg-primary/10 border-primary": pet === p.slug,
                            },
                        )}
                        onClick={() => setFilter("pet", p.slug)}
                    >
                        {p?.image && (
                            <Image
                                src={getStrapiURL() + p.image.url}
                                alt={p.name}
                                width={24}
                                height={24}
                                className="w-6 h-6 object-contain"
                            />
                        )}
                        {p.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
