import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormSchema } from "./features/form/schema";

type StoredEntry = FormSchema & {
  timestamp: string;
};

type Store = {
  entries: StoredEntry[];
  actions: StoreActions;
};

type StoreActions = {
  addEntry: (entry: FormSchema) => void;
  clearEntries: () => void;
};

const useStore = create<Store>()(
  persist(
    (set) => ({
      entries: [],
      actions: {
        addEntry: (entry: FormSchema) =>
          set((state) => ({
            entries: [
              ...state.entries,
              { ...entry, timestamp: new Date().toISOString() },
            ],
          })),
        clearEntries: () => {
          set({ entries: [] });
        },
      },
    }),
    { name: "store", partialize: (s) => ({ entries: s.entries }) }
  )
);

export const useEntries = () => useStore((state) => state.entries);

export const useActions = () => useStore((state) => state.actions);
