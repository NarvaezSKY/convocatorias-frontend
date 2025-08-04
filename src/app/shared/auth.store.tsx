import { create } from "zustand";
import { authRepository } from "../../core/auth/infrastructure/auth.repository";
import { loginUseCase, registerUseCase, verifyUseCase, recoverPasswordUseCase, activateUserUseCase, changePasswordUseCase } from "../../core/auth/application";
import { ILoginReq, ILoginRes } from "../../core/auth/domain/login";
import { IForgotPasswordRequest } from "@/core/auth/domain/forgot-password";
import { IRegisterReq } from "../../core/auth/domain/register";
import { IVerifyRes } from "@/core/auth/domain/verify";

type State = {
  user: ILoginRes | null;
  token: string | null;
  loginError: string | null;
  registerError: string | null;
  role: string | null;
  verifyError: string | null;
};

type Actions = {
  login: (data: ILoginReq) => Promise<void>;
  register: (data: IRegisterReq) => Promise<void>;
  verify: () => Promise<IVerifyRes | null>;
  logout: () => void;
  activateUser: (token: string) => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;
  changePassword: (data: IForgotPasswordRequest) => Promise<void>;
};

type Store = State & Actions;

export const useAuthStore = create<Store>((set) => ({
  user: null,
  token: null,
  registerError: null,
  loginError: null,
  role: null,
  globalUser: null,
  verifyError: null,

  verify: async () => {
    try {
      const response = await verifyUseCase(authRepository)();
      set({ user: response, role: response.role });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        set({ verifyError: error.message });
        throw error;
      }
    }
    return null;
  },

  recoverPassword: async (email: string) => {
    try {
      await recoverPasswordUseCase(authRepository)(email);
      set({ registerError: null });
    } catch (error) {
      if (error instanceof Error) {
        set({ registerError: error.message });

        throw error; // <-- This is crucial to propagate the error
      } else {
        set({ registerError: "An unknown error occurred" });
      }
    }
  },

  changePassword: async (data: IForgotPasswordRequest) => {
    try {
      await changePasswordUseCase(authRepository)(data);
      set({ registerError: null });
    } catch (error) {
      if (error instanceof Error) {
        set({ registerError: error.message });
      } else {
        set({ registerError: "An unknown error occurred" });
      }
    }
  },

  activateUser: async (token: string) => {
    try {
      await activateUserUseCase(authRepository)(token);
      set({ registerError: null });
    } catch (error) {
      if (error instanceof Error) {
        set({ registerError: error.message });
      } else {
        set({ registerError: "An unknown error occurred" });
      }
    }
  },

  login: async (data: ILoginReq) => {
    try {
      const response = await loginUseCase(authRepository)(data);
      localStorage.setItem("token", response.token);
      set({ user: response, token: response.token, loginError: null, role: response.role, registerError: null, verifyError: null });
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
    localStorage.removeItem("token");
    set({
      token: null,
      user: null,
      loginError: null,
      registerError: null,
      role: null,
      verifyError: null,
    });
  },
}));
