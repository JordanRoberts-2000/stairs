import { DEMO_MODE } from "@/AppConfig";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type DemoStore = {
  redirectOnSubmit: boolean;
  setRedirectOnSubmit: (value: boolean) => void;
  toggleRedirectOnSubmit: () => void;
};

const createDemoStore = () =>
  create<DemoStore>()(
    persist(
      (set) => ({
        redirectOnSubmit: false,
        setRedirectOnSubmit: (value) => set({ redirectOnSubmit: value }),
        toggleRedirectOnSubmit: () =>
          set((state) => ({
            redirectOnSubmit: !state.redirectOnSubmit,
          })),
      }),
      {
        name: "demo-store",
      },
    ),
  );

const demoStoreImpl = createDemoStore();

export const useDemoStore: typeof demoStoreImpl = DEMO_MODE
  ? demoStoreImpl
  : ((() => {
      throw new Error("useDemoStore was used outside demo mode");
    }) as any);
