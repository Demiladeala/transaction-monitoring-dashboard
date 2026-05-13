import { create } from "zustand";

interface FiltersState {
  description: string;
  paymentMethod: string;
  status: string;
  searchQuery: string;
  setDescription: (value: string) => void;
  setPaymentMethod: (value: string) => void;
  setStatus: (value: string) => void;
  setSearchQuery: (value: string) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  description: "All",
  paymentMethod: "All",
  status: "All",
  searchQuery: "",
  setDescription: (value: string) => set({ description: value }),
  setPaymentMethod: (value: string) => set({ paymentMethod: value }),
  setStatus: (value: string) => set({ status: value }),
  setSearchQuery: (value: string) => set({ searchQuery: value }),
  resetFilters: () =>
    set({
      description: "All",
      paymentMethod: "All",
      status: "All",
      searchQuery: "",
    }),
}));
