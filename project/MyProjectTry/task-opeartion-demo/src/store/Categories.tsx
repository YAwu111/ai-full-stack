import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category } from '../types/category'

export interface CategoriesState {
    categories: Category[];
    newCategoryId: number | null;
    categoryAdd: (name: string) => void;
    removeCategory: (id: number) => void;
    clearNewCategory: () => void;
}

const useCategoriesStore = create<CategoriesState>()(
    persist(
        (set) => ({
            categories: [],
            newCategoryId: null,
            categoryAdd: (name: string) => {
                const newId = Date.now();
                set((state) => ({
                    categories: [...state.categories, {
                        id: newId,
                        name
                    } as Category],
                    newCategoryId: newId
                }));
                setTimeout(() => set({ newCategoryId: null }), 500);
            },
            removeCategory: (id: number) =>
                set((state) => ({
                    categories: state.categories.filter(category => category.id !== id)
                })),
            clearNewCategory: () => set({ newCategoryId: null })
        }), {
        name: 'categories'
    })
)
export default useCategoriesStore;