import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSessionSlice, type SessionSlice } from "./sessionSlice";
import { createOperatorSlice, type OperatorSlice } from "./operatorSlice";

export type Store = {
  context: OperatorSlice["context"] & SessionSlice["context"];
  actions: OperatorSlice["actions"] & SessionSlice["actions"];
};

const useStore = create<Store>()(
  persist(
    (...args) => {
      const sessionSlice = createSessionSlice(...args);
      const operatorSlice = createOperatorSlice(...args);

      return {
        context: {
          ...sessionSlice.context,
          ...operatorSlice.context,
        },
        actions: {
          ...sessionSlice.actions,
          ...operatorSlice.actions,
        },
      };
    },
    {
      name: "store",
      partialize: (s) => ({ context: s.context }),
      onRehydrateStorage: () => {
        return (_, error) => {
          if (error) {
            console.warn(
              "Store rehydration failed, clearing and using defaults",
            );
            localStorage.removeItem("store");
          }
        };
      },
    },
  ),
);

export { useStore };
