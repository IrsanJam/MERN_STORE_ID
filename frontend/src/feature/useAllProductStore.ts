import { create } from "zustand";

interface AllProductStore {
  category: string;
  search: string;
  page: number;
  limit: number;
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

const useAllProductStore = create<AllProductStore>((set) => ({
  category: "Semua",
  search: "",
  page: 1,
  limit: 10,
  setCategory: (category) => set({ category, page: 1 }), // Reset page saat kategori berubah
  setSearch: (search) => set({ search, page: 1 }), // Reset page saat search berubah
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
}));

export default useAllProductStore;
