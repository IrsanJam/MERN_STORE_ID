import { create } from "zustand";

interface LoginStore {
  email: string;
  password: string;
  passwordVisible: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  togglePasswordVisible: () => void;
  reset: () => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
  email: "",
  password: "",
  passwordVisible: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  togglePasswordVisible: () => set((state) => ({ passwordVisible: !state.passwordVisible })),
  reset: () => set({ email: "", password: "", passwordVisible: false }),
}));
