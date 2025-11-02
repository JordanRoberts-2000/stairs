import { create } from "zustand";
import type { FormSchema } from "./features/form/schema";

type Store = {
  entries: FormSchema[];
  actions: StoreActions;
};

type StoreActions = {
  addData: (entry: FormSchema) => void;
  clearData: () => void;
};

const useStore = create<Store>((set) => ({
  entries: [],
  actions: {
    addData: (entry: FormSchema) =>
      set((state) => ({ entries: [...state.entries, entry] })),
    clearData: () => set({ entries: [] }),
  },
}));

export const useEntries = () => useStore((state) => state.entries);

export const useActions = () => useStore((state) => state.actions);
