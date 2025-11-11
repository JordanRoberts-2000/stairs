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
  setBench: (bench: number) => { error: null | string };
  setTarget: (target: number) => { error: null | string };
  setDarkMode: (darkMode: boolean) => { error: null | string };
  setAutoClearHistory: (autoClearHistory: boolean) => { error: null | string };
  clearHistory: () => void;
  clearUserHistory: () => void;
  validateSession: () => string | null;
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
    (set, get) => ({
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
          set((state) => {
            const hasProfile = !!state.context.profiles[operator];

            const profiles = hasProfile
              ? state.context.profiles
              : {
                  ...state.context.profiles,
                  [operator]: { ...DEFAULT_USER_STATE },
                };

            return {
              context: {
                ...state.context,
                session: { ...state.context.session, operator },
                profiles,
              },
            };
          }),

        setBench: (bench: number) => {
          const { operator } = get().context.session;
          if (!operator) return { error: "No operator selected" };

          const profile = get().context.profiles[operator];
          if (!profile) return { error: "Profile not found" };

          set((state) => ({
            context: {
              ...state.context,
              session: { ...state.context.session, bench },
            },
          }));
          return { error: null };
        },

        validateSession: () => {
          const session = get().context.session;

          if (!session.operator) return "No user selected";
          if (!session.bench) return "No bench number selected";
          return null;
        },

        setTarget: (target: number) => {
          const { operator } = get().context.session;
          if (!operator) return { error: "No operator selected" };

          const profile = get().context.profiles[operator];
          if (!profile) return { error: "Profile not found" };

          set((state) => ({
            context: {
              ...state.context,
              profiles: {
                ...state.context.profiles,
                [operator]: { ...profile, target },
              },
            },
          }));

          return { error: null };
        },

        setDarkMode: (darkMode: boolean) => {
          const { operator } = get().context.session;
          if (!operator) return { error: "No operator selected" };

          const profile = get().context.profiles[operator];
          if (!profile) return { error: "Profile not found" };

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
          });
          return { error: null };
        },

        setAutoClearHistory: (autoClearHistory: boolean) => {
          const { operator } = get().context.session;
          if (!operator) return { error: "No operator selected" };

          const profile = get().context.profiles[operator];
          if (!profile) return { error: "Profile not found" };

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
          });
          return { error: null };
        },

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
  const { setOperator } = useActions();

  if (!operator) {
    return 14;
  }

  const current = history[operator];
  if (!current) {
    setOperator(operator);
    return DEFAULT_USER_STATE.target;
  }

  return current.target;
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
