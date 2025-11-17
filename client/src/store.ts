import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AssemblySchema } from "./features/assemblyForm/schema";
import type { OperatorProfile, Operator } from "./types";
import { Result, ok, err } from "neverthrow";

type StoreContext = {
  session: { operator?: Operator; bench?: number };
  profiles: Partial<Record<Operator, OperatorProfile>>;
};

type StoreActions = {
  addHistoryEntry: (entry: AssemblySchema) => Result<void, string>;
  ensureProfile: (operator: Operator) => OperatorProfile;
  setOperator: (operator: Operator) => void;
  setBench: (bench: number) => Result<void, string>;
  setTarget: (target: number) => Result<void, string>;
  setTargetEnabled: (enabled: boolean) => Result<void, string>;
  setDarkMode: (darkMode: boolean) => Result<void, string>;
  setAutoClearHistory: (autoClearHistory: boolean) => Result<void, string>;
  clearUserHistory: () => Result<void, string>;
  validateSession: () => Result<{ operator: Operator; bench: number }, string>;
};

type Store = {
  context: StoreContext;
  actions: StoreActions;
};

const DEFAULT_PROFILE: OperatorProfile = {
  target: 14,
  autoClearHistory: true,
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
        addHistoryEntry: (entry: AssemblySchema) => {
          const { operator } = get().context.session;
          if (!operator) return err("No operator selected");

          const newEntry = { ...entry, timestamp: new Date().toISOString() };
          const current = get().context.profiles[operator] ?? DEFAULT_PROFILE;

          if (current.history.length >= 100)
            return err("History limit exceeded");

          set((state) => ({
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
          }));

          return ok(undefined);
        },

        ensureProfile: (operator) => {
          const existing = get().context.profiles[operator];
          if (existing) return existing;

          set((state) => ({
            context: {
              ...state.context,
              profiles: {
                ...state.context.profiles,
                [operator]: DEFAULT_PROFILE,
              },
            },
          }));

          return DEFAULT_PROFILE;
        },

        setOperator: (operator: Operator) => {
          get().actions.ensureProfile(operator);

          set((state) => ({
            context: {
              ...state.context,
              session: { ...state.context.session, operator },
            },
          }));
        },

        setBench: (bench: number) => {
          const { operator } = get().context.session;
          if (!operator) return err("No operator selected");

          const profile = get().context.profiles[operator];
          if (!profile) return err("Profile not found");

          set((state) => ({
            context: {
              ...state.context,
              session: { ...state.context.session, bench },
            },
          }));

          return ok(undefined);
        },

        validateSession: () => {
          const session = get().context.session;

          if (!session.operator) return err("No operator selected");
          if (!session.bench) return err("No bench number selected");

          return ok({ operator: session.operator, bench: session.bench });
        },

        setTarget: (target: number) => {
          const { operator } = get().context.session;
          if (!operator) return err("No operator selected");

          const profile = get().context.profiles[operator];
          if (!profile) return err("Profile not found");

          set((state) => ({
            context: {
              ...state.context,
              profiles: {
                ...state.context.profiles,
                [operator]: { ...profile, target },
              },
            },
          }));

          return ok(undefined);
        },

        setTargetEnabled: (enabled: boolean) => {
          const { operator } = get().context.session;
          if (!operator) return err("No operator selected");

          const profile = get().context.profiles[operator];
          if (!profile) return err("Profile not found");

          set((state) => ({
            context: {
              ...state.context,
              profiles: {
                ...state.context.profiles,
                [operator]: {
                  ...profile,
                  target: enabled ? (profile.target ?? 14) : undefined,
                },
              },
            },
          }));

          return ok(undefined);
        },

        setDarkMode: (darkMode: boolean) => {
          const { operator } = get().context.session;
          if (!operator) return err("No operator selected");

          const profile = get().context.profiles[operator];
          if (!profile) return err("Profile not found");

          set((state) => ({
            context: {
              ...state.context,
              profiles: {
                ...state.context.profiles,
                [operator]: { ...profile, darkMode },
              },
            },
          }));

          return ok(undefined);
        },

        setAutoClearHistory: (autoClearHistory: boolean) => {
          const { operator } = get().context.session;
          if (!operator) return err("No operator selected");

          const profile = get().context.profiles[operator];
          if (!profile) return err("Profile not found");

          set((state) => ({
            context: {
              ...state.context,
              profiles: {
                ...state.context.profiles,
                [operator]: { ...profile, autoClearHistory },
              },
            },
          }));

          return ok(undefined);
        },

        clearUserHistory: () => {
          const { operator } = get().context.session;
          if (!operator) return err("No operator selected");

          const profile = get().context.profiles[operator];
          if (!profile) return err("Profile not found");

          set((state) => ({
            context: {
              ...state.context,
              profiles: {
                ...state.context.profiles,
                [operator]: { ...profile, history: [] },
              },
            },
          }));

          return ok(undefined);
        },
      },
    }),
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

export const useSession = () => useStore((state) => state.context.session);

export const useOperatorProfile = () => {
  const { operator } = useSession();
  const profiles = useStore((state) => state.context.profiles);

  if (!operator) {
    return null;
  }

  const profile = profiles[operator];

  if (!profile) {
    return null;
  }

  return profile;
};

export const useActions = () => useStore((state) => state.actions);

export { useStore };
