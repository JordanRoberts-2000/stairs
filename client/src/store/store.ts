import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSessionSlice, type SessionSlice } from "./sessionSlice";
import { createOperatorSlice, type OperatorSlice } from "./operatorSlice";

export type Store = {
  context: OperatorSlice["context"] & SessionSlice["context"];
  actions: OperatorSlice["actions"] &
    SessionSlice["actions"] & {
      setIsPosting: (value: boolean) => void;
    };
  ui: {
    isPosting: boolean;
  };
};

const useStore = create<Store>()(
  persist(
    (set, get, api) => {
      const sessionSlice = createSessionSlice(set, get, api);
      const operatorSlice = createOperatorSlice(set, get, api);

      return {
        context: {
          ...sessionSlice.context,
          ...operatorSlice.context,
        },
        actions: {
          ...sessionSlice.actions,
          ...operatorSlice.actions,
          setIsPosting: (value: boolean) =>
            set((state) => ({
              ui: {
                ...state.ui,
                isPosting: value,
              },
            })),
        },
        ui: {
          isPosting: false,
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
