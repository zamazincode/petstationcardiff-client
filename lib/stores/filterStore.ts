import { create } from "zustand";

interface FilterState {
    brand: string;
    category: string;
    pet: string;
    priceRange: {
        min: number | null;
        max: number | null;
    };
    search: string;
    setFilter: (
        key: "brand" | "category" | "pet" | "search",
        value: string,
    ) => void;
    setPriceRange: (min: number | null, max: number | null) => void;
    resetFilters: () => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
    brand: "",
    category: "",
    pet: "",
    search: "",
    priceRange: {
        min: null,
        max: null,
    },
    setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
    setPriceRange: (min, max) =>
        set((state) => ({
            ...state,
            priceRange: { ...state.priceRange, min, max },
        })),
    resetFilters: () =>
        set({
            brand: "",
            category: "",
            pet: "",
            search: "",
            priceRange: { min: null, max: null },
        }),
}));
