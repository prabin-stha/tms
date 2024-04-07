import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

import { User } from "@/lib/schema/user";
import {
  RegisterWithError,
  SecretWithError,
  authService,
} from "@/lib/services/auth";
import { navigate } from "@/lib/config/route";
import { LoginForm } from "@/routes/login";
import { RegisterForm } from "@/routes/register";

export interface AuthState {
  user?: User | null;
  token?: string | null;
  refresh?: string | null;
}

export interface AuthActions {
  login: (data: LoginForm) => Promise<SecretWithError>;
  register: (data: RegisterForm) => Promise<RegisterWithError>;
  logout: () => void;
  setUser: (user: User) => void;
  promoteUser: () => Promise<boolean>;
}

export const useAuth = create<AuthState & AuthActions>()(
  persist(
    immer((set, get) => ({
      user: null,
      token: null,
      login: async (data) => {
        const { data: secret, error } = await authService.login(data);

        if (error) return { error };

        set((state) => {
          state.token = secret?.access;
          state.refresh = secret?.refresh;
        });

        let user: User | null = null;
        user = await authService.getUser();

        if (secret && user) {
          navigate({ to: "/" });
        } else {
          set((state) => {
            state.token = null;
            state.refresh = null;
          });
        }

        return false;
      },
      register: async (data) => {
        const { data: user, error } = await authService.register(data);
        if (error) return { error };
        if (user) {
          set((state) => {
            state.token = user.access;
            state.user = user;
          });
          navigate({ to: "/" });
        }
        return false;
      },
      logout: () => {
        set((state) => {
          state.token = null;
          state.user = null;
          useAuth.persist.clearStorage();
        });
        navigate({ to: "/login" });
      },
      setUser: (user) => {
        set((state) => {
          state.user = user;
        });
      },
      promoteUser: async () => {
        const userId = get().user?.id;
        if (userId) {
          const promoted = await authService.promoteToProvider();
          if (promoted) {
            set((state) => {
              if (state.user?.role_type) {
                state.user.role_type = "provider";
              }
            });
            return true;
          } else {
            return false;
          }
        }
        return false;
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
