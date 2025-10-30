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
    menuState: boolean;

    normalItems: Product[];
    boxDeals: BoxDeal[];

    addNormalItem: (item: Product) => void;
    removeNormalItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;

    addBoxDeal: (deal: BoxDeal) => void;
    updateBoxDealItems: (dealId: number, items: Product[]) => void;
    removeBoxDeal: (dealId: number) => void;

    clearCart: () => void;

    openMenu: () => void;
    toggleMenu: () => void;
    closeMenu: () => void;

    syncFromBroadcast: (
        newState: Pick<CartState, "normalItems" | "boxDeals">,
    ) => void;
}

let broadcastChannel: BroadcastChannel | null = null;

if (typeof window !== "undefined") {
    try {
        broadcastChannel = new BroadcastChannel("cart-sync-channel");
    } catch (error) {
        console.warn(
            "BroadcastChannel not supported in this browser, fallback to localStorage only",
        );
    }
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => {
            const broadcastChanges = () => {
                if (broadcastChannel) {
                    const { normalItems, boxDeals } = get();
                    broadcastChannel.postMessage({ normalItems, boxDeals });
                }
            };

            return {
                menuState: false,
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

                    setTimeout(broadcastChanges, 0);

                    set({ menuState: true });
                },

                removeNormalItem: (id: number) => {
                    set({
                        normalItems: get().normalItems.filter(
                            (i) => i.id !== id,
                        ),
                    });
                    setTimeout(broadcastChanges, 0);
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
                    setTimeout(broadcastChanges, 0);

                    set({ menuState: true });
                },

                addBoxDeal: (deal: BoxDeal) => {
                    const deals = get().boxDeals;
                    set({ boxDeals: [...deals, deal] });
                    setTimeout(broadcastChanges, 0);
                },

                updateBoxDealItems: (dealId: number, items: Product[]) => {
                    set({
                        boxDeals: get().boxDeals.map((deal) =>
                            deal.id === dealId
                                ? { ...deal, selectedItems: items }
                                : deal,
                        ),
                    });
                    setTimeout(broadcastChanges, 0);
                },

                removeBoxDeal: (dealId: number) => {
                    set({
                        boxDeals: get().boxDeals.filter((d) => d.id !== dealId),
                    });
                    setTimeout(broadcastChanges, 0);
                },

                clearCart: () => {
                    set({ normalItems: [], boxDeals: [] });
                    setTimeout(broadcastChanges, 0);
                },

                openMenu: () => {
                    set({ menuState: true });
                },

                closeMenu: () => {
                    set({ menuState: false });
                },

                toggleMenu: () => {
                    set((state) => ({ menuState: !state.menuState }));
                },

                syncFromBroadcast: (newState) => {
                    set({
                        normalItems: newState.normalItems,
                        boxDeals: newState.boxDeals,
                    });
                },
            };
        },
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

if (broadcastChannel) {
    broadcastChannel.onmessage = (event) => {
        if (event.data && event.data.normalItems !== undefined) {
            setTimeout(() => {
                useCartStore.getState().syncFromBroadcast(event.data);
            }, 50);
        }
    };
}
