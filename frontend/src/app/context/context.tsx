import { create } from "zustand";

interface ThemeState {
  mode: "light" | "dark";
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: (typeof window !== "undefined" && localStorage.getItem("theme")) || "light",
  toggleMode: () => {
    set((state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return { mode: newMode };
    });
  },
}));
