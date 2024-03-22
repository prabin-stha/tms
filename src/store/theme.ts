import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Theme = "dark" | "light" | "system";

interface ThemeState {
  theme: Theme;
}

interface ThemeActions {
  setTheme: (theme: Theme) => void;
}

export const useTheme = create<ThemeState & ThemeActions>()(
  persist(
    immer((set) => ({
      theme: "system",
      setTheme: (theme) => {
        set((state) => {
          state.theme = theme;
        });
      },
    })),
    {
      name: "tms-theme",
    }
  )
);
