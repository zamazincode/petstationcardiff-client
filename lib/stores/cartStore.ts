import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Product {
    id: number;
    slug: string;
    name: string;
    price: number;
    quantity: number;
    stock?: number;
    image: string;
}

export interface BoxDeal {
    id: number;
    slug: string;
    name: string;
    maxSelection: number;
    price: number;
    selectedItems: Product[];
    image: string;
}

export interface CartState {
    normalItems: Product[];
    boxDeals: BoxDeal[];

    addNormalItem: (item: Product) => void;
    removeNormalItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;

    addBoxDeal: (deal: BoxDeal) => void;
    updateBoxDealItems: (dealId: number, items: Product[]) => void;
    removeBoxDeal: (dealId: number) => void;

    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            normalItems: [],
            boxDeals: [],

            addNormalItem: (item: Product) => {
                const items = get().normalItems;
                const existing = items.find((i) => i.id === item.id);

                if (existing) {
                    const newQuantity = existing.quantity + item.quantity;

                    // stock check
                    const finalQuantity =
                        existing.stock && newQuantity > existing.stock
                            ? existing.stock
                            : newQuantity;

                    set({
                        normalItems: items.map((i) =>
                            i.id === item.id
                                ? { ...i, quantity: finalQuantity }
                                : i,
                        ),
                    });
                } else {
                    set({ normalItems: [...items, item] });
                }
            },

            removeNormalItem: (id: number) => {
                set({
                    normalItems: get().normalItems.filter((i) => i.id !== id),
                });
            },

            updateQuantity: (id: number, quantity: number) => {
                if (quantity < 1) return;

                const items = get().normalItems;
                const existing = items.find((item) => item.id === id);

                if (!existing) return;

                const maxQuantity =
                    existing.stock && quantity > existing.stock
                        ? existing.stock
                        : quantity;

                set({
                    normalItems: items.map((item) =>
                        item.id === id
                            ? { ...item, quantity: maxQuantity }
                            : item,
                    ),
                });
            },

            addBoxDeal: (deal: BoxDeal) => {
                const deals = get().boxDeals;
                set({ boxDeals: [...deals, deal] });
            },

            updateBoxDealItems: (dealId: number, items: Product[]) => {
                set({
                    boxDeals: get().boxDeals.map((deal) =>
                        deal.id === dealId
                            ? { ...deal, selectedItems: items }
                            : deal,
                    ),
                });
            },

            removeBoxDeal: (dealId: number) => {
                set({
                    boxDeals: get().boxDeals.filter((d) => d.id !== dealId),
                });
            },

            clearCart: () => set({ normalItems: [], boxDeals: [] }),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
