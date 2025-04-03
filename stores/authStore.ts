import { create } from "zustand";

interface AuthState {
    user: any | null;
    token: string | null;
    setUser: (userData: any) => void;
    setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    setUser: (userData) => set({ user: userData }),
    setToken: (token) => set({ token }),
}));
