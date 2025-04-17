import { create } from "zustand";

const themeStore = (set, get) => ({
  theme: localStorage?.theme || "light",
  setTheme: (data) => set({ theme: data }),
});

const useThemeStore = create(themeStore);

export default useThemeStore;
