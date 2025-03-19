import { create } from "zustand";
import { registerType } from "../utils/auth/type";

interface RegisterState {
  registerData: registerType;
  setRegisterData: (field: keyof registerType, value: string | boolean) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  registerData: {
    full_name: "",
    username: "",
    password: "",
    showPassword: false,
    gender: "",
    email: "",
    no_handphone: "",
  },
  setRegisterData: (field, value) =>
    set((state) => ({
      registerData: { ...state.registerData, [field]: value },
    })),
}));
