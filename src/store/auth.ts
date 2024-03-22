import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

import { User } from "@/lib/schema/user";
import { authService } from "@/lib/services/auth";
import { navigate } from "@/lib/config/route";
import { LoginForm } from "@/routes/login";
import { RegisterForm } from "@/routes/register";

export interface AuthState {
  user?: User | null;
  token?: string | null;
}

export interface AuthActions {
  login: (data: LoginForm) => Promise<void>;
  register: (data: RegisterForm) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState & AuthActions>()(
  persist(
    immer((set) => ({
      user: null,
      token: null,
      login: async (data) => {
        const user = await authService.login(data);
        if (user) {
          set((state) => {
            state.token = crypto.randomUUID();
            state.user = user;
          });
          navigate({ to: "/" });
        }
      },
      register: async (data) => {
        const user = await authService.register(data);
        if (user) {
          set((state) => {
            state.token = crypto.randomUUID();
            state.user = user;
          });
          navigate({ to: "/" });
        }
      },
      logout: () => {
        set((state) => {
          state.token = null;
          state.user = null;
          useAuth.persist.clearStorage();
        });
        navigate({ to: "/login" });
      },
    })),
    {
      name: "tms-auth",
      storage: createJSONStorage(() => localStorage),
      partialize(state) {
        return Object.fromEntries(
          Object.entries(state).filter(([key]) => ["token"].includes(key))
        );
      },
    }
  )
);
