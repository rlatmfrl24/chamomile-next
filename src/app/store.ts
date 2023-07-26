import { MenuItemType } from "@/lib/typeDef";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppBarState {
  appBarState: MenuItemType;
  setAppBarState: (appBarState: MenuItemType) => void;
}

const useAppBarStore = create<AppBarState>()(
  devtools(
    persist(
      (set) => ({
        appBarState: {
          id: 0,
          name: "Home",
          path: "/",
        },
        setAppBarState: (appBarState) => set({ appBarState }),
      }),
      { name: "app-bar" }
    )
  )
);

export { useAppBarStore };
