import { create } from "zustand";
import { authRepository } from "../../core/auth/infrastructure/auth.repository";

import { loginUseCase, registerUseCase } from "../../core/auth/application";
import { ILoginReq, ILoginRes } from "../../core/auth/domain/login";
import { IRegisterReq } from "../../core/auth/domain/register";

type State = {
  user: ILoginRes | null;
  token: string | null;
  loginError: string | null;
  registerError: string | null;
};

type Actions = {
  login: (data: ILoginReq) => Promise<void>;
  register: (data: IRegisterReq) => Promise<void>;
  logout: () => void;
};

type Store = State & Actions;

export const useAuthStore = create<Store>((set) => ({
  user: null,
  token: null,
  registerError: null,
  loginError: null,

  login: async (data: ILoginReq) => {
    try {
      const response = await loginUseCase(authRepository)(data);
      sessionStorage.setItem("token", response.token);
      set({ user: response, token: response.token, loginError: null });
    } catch (error) {
      if (error instanceof Error && (error as any).response?.data?.message) {
        set({ loginError: (error as any).response.data.message });
      } else {
        set({ loginError: "An unknown error occurred" });
      }
    }
  },
  register: async (data: IRegisterReq) => {
    try {
      await registerUseCase(authRepository)(data);
      set({ registerError: null });
    } catch (error) {
      if (error instanceof Error) {
        set({ registerError: error.message });
      } else {
        set({ registerError: "An unknown error occurred" });
      }
    }
  },
  logout: () => {
    sessionStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));
