import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormSchema } from "./features/form/schema";

type Entry = FormSchema & {
  timestamp: string;
};

type OperatorProfile = {
  target: number;
  history: Entry[];
  autoClearHistory: boolean;
  darkMode: boolean;
};

type StoreContext = {
  session: { operator?: string; bench?: number };
  profiles: Record<string, OperatorProfile>;
};

type StoreActions = {
  addHistoryEntry: (entry: FormSchema) => void;
  setOperator: (operator: string) => void;
  setBench: (bench: number) => void;
  setTarget: (target: number) => void;
  clearHistory: () => void;
  clearUserHistory: () => void;
};

type Store = {
  context: StoreContext;
  actions: StoreActions;
};

const DEFAULT_USER_STATE: OperatorProfile = {
  target: 14,
  autoClearHistory: false,
  darkMode: false,
  history: [],
};

const useStore = create<Store>()(
  persist(
    (set) => ({
      context: {
        session: { operator: undefined, bench: undefined },
        profiles: {},
      },
      actions: {
        addHistoryEntry: (entry: FormSchema) =>
          set((state) => {
            const { operator } = state.context.session;
            if (!operator) return state;

            const newEntry = { ...entry, timestamp: new Date().toISOString() };
            const current = state.context.profiles[operator] ?? {
              ...DEFAULT_USER_STATE,
            };

            return {
              context: {
                ...state.context,
                profiles: {
                  ...state.context.profiles,
                  [operator]: {
                    ...current,
                    history: [...current.history, newEntry],
                  },
                },
              },
            };
          }),

        setOperator: (operator: string) =>
          set((state) => ({
            context: {
              ...state.context,
              session: { ...state.context.session, operator },
            },
          })),

        setBench: (bench: number) =>
          set((state) => ({
            context: {
              ...state.context,
              session: { ...state.context.session, bench },
            },
          })),

        setTarget: (target: number) =>
          set((state) => {
            const { operator } = state.context.session;
            if (!operator) return state;

            const current = state.context.profiles[operator] ?? {
              ...DEFAULT_USER_STATE,
            };
            return {
              context: {
                ...state.context,
                profiles: {
                  ...state.context.profiles,
                  [operator]: { ...current, target },
                },
              },
            };
          }),

        setDarkMode: (darkMode: boolean) =>
          set((state) => {
            const { operator } = state.context.session;
            if (!operator) return state;

            const current = state.context.profiles[operator] ?? {
              ...DEFAULT_USER_STATE,
            };
            return {
              context: {
                ...state.context,
                profiles: {
                  ...state.context.profiles,
                  [operator]: { ...current, darkMode },
                },
              },
            };
          }),

        setAutoClearHistory: (autoClearHistory: boolean) =>
          set((state) => {
            const { operator } = state.context.session;
            if (!operator) return state;

            const current = state.context.profiles[operator] ?? {
              ...DEFAULT_USER_STATE,
            };
            return {
              context: {
                ...state.context,
                profiles: {
                  ...state.context.profiles,
                  [operator]: { ...current, autoClearHistory },
                },
              },
            };
          }),

        clearHistory: () =>
          set((state) => ({
            context: { ...state.context, profiles: {} },
          })),

        clearUserHistory: () =>
          set((state) => {
            const { operator } = state.context.session;
            if (!operator) return state;

            const { [operator]: _omit, ...rest } = state.context.profiles;
            return { context: { ...state.context, profiles: rest } };
          }),
      },
    }),
    { name: "store", partialize: (s) => ({ context: s.context }) }
  )
);

export const useSession = () => useStore((state) => state.context.session);

export const useUserHistory = () => {
  const { operator } = useStore((state) => state.context.session);

  const history = useStore((state) => state.context.profiles);
  return operator ? history[operator]?.history : [];
};

export const useUserTarget = () => {
  const { operator } = useStore((state) => state.context.session);

  const history = useStore((state) => state.context.profiles);
  return operator ? history[operator]?.target : undefined;
};

export const useUserDarkMode = () => {
  const { operator } = useStore((state) => state.context.session);

  const history = useStore((state) => state.context.profiles);
  return operator ? history[operator]?.darkMode : undefined;
};

export const useUserAutoClearHistory = () => {
  const { operator } = useStore((state) => state.context.session);

  const history = useStore((state) => state.context.profiles);
  return operator ? history[operator]?.autoClearHistory : undefined;
};

export const useActions = () => useStore((state) => state.actions);
export { useStore };
