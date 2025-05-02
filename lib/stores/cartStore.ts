import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

type BoxDeal = {
    id: string;
    title: string;
    maxSelection: number;
    price: number; // total price
    selectedItems: Product[];
};

type CartState = {
    normalItems: Product[];
    boxDeals: BoxDeal[];

    // Normal ürünler
    addNormalItem: (item: Product) => void;
    removeNormalItem: (id: string) => void;

    // Box Deal işlemleri
    addBoxDeal: (deal: BoxDeal) => void;
    updateBoxDealItems: (dealId: string, items: Product[]) => void;
    removeBoxDeal: (dealId: string) => void;

    clearCart: () => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            normalItems: [],
            boxDeals: [],

            addNormalItem: (item) => {
                const items = get().normalItems;
                const existing = items.find((i) => i.id === item.id);
                if (existing) {
                    set({
                        normalItems: items.map((i) =>
                            i.id === item.id
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i,
                        ),
                    });
                } else {
                    set({ normalItems: [...items, item] });
                }
            },

            removeNormalItem: (id) => {
                set({
                    normalItems: get().normalItems.filter((i) => i.id !== id),
                });
            },

            addBoxDeal: (deal) => {
                const deals = get().boxDeals;
                const existing = deals.find((d) => d.id === deal.id);
                if (!existing) {
                    set({ boxDeals: [...deals, deal] });
                }
            },

            updateBoxDealItems: (dealId, items) => {
                set({
                    boxDeals: get().boxDeals.map((deal) =>
                        deal.id === dealId
                            ? { ...deal, selectedItems: items }
                            : deal,
                    ),
                });
            },

            removeBoxDeal: (dealId) => {
                set({
                    boxDeals: get().boxDeals.filter((d) => d.id !== dealId),
                });
            },

            clearCart: () => set({ normalItems: [], boxDeals: [] }),
        }),
        {
            name: "cart-storage",
        },
    ),
);
