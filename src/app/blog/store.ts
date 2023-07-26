import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface BlogCategoryProps {
  name: string;
  path: string;
}

interface BlogMenuState {
  currentCategory: BlogCategoryProps;
  setCurrentCategory: (category: BlogCategoryProps) => void;
}

const useBlogMenuStore = create<BlogMenuState>()(
  devtools(
    persist(
      (set) => ({
        currentCategory: {
          name: "All",
          path: "/",
          category: "all",
          tag: [],
        },
        setCurrentCategory: (category) => set({ currentCategory: category }),
      }),
      { name: "blog-menu" }
    )
  )
);

export { useBlogMenuStore };
