import type { AssemblySchema } from "@/features/assemblyForm/schema";
import type { Entry, Operator, OperatorProfile } from "@/types";
import { err, ok, type Result } from "neverthrow";
import type { StateCreator } from "zustand";

const DEFAULT_PROFILE: OperatorProfile = {
  target: 14,
  autoClearHistory: true,
  autoComplete: true,
  darkMode: false,
  history: [],
};

type OperatorContext = {
  profiles: Partial<Record<Operator, OperatorProfile>>;
};

type OperatorActions = {
  getProfile: (operator: Operator) => OperatorProfile;

  setTarget: (operator: Operator, target: number) => void;
  setTargetEnabled: (operator: Operator, enabled: boolean) => void;
  setDarkMode: (operator: Operator, enabled: boolean) => void;
  setAutoClearHistory: (operator: Operator, autoClearHistory: boolean) => void;
  setAutoComplete: (operator: Operator, autoComplete: boolean) => void;

  isDuplicateEntry: (operator: Operator, entry: AssemblySchema) => boolean;
  addHistoryEntry: (
    operator: Operator,
    entry: AssemblySchema,
  ) => Result<void, string>;
  clearUserHistory: (operator: Operator) => void;
};

export type OperatorSlice = {
  context: OperatorContext;
  actions: OperatorActions;
};

export const createOperatorSlice: StateCreator<
  OperatorSlice,
  [],
  [],
  OperatorSlice
> = (set, get) => ({
  context: {
    profiles: {},
  },
  actions: {
    getProfile: (operator) => {
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

    setTarget: (operator: Operator, target: number) => {
      const profile = get().actions.getProfile(operator);

      set((state) => ({
        context: {
          ...state.context,
          profiles: {
            ...state.context.profiles,
            [operator]: { ...profile, target },
          },
        },
      }));
    },

    setTargetEnabled: (operator: Operator, enabled: boolean) => {
      const profile = get().actions.getProfile(operator);

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
    },

    setDarkMode: (operator: Operator, enabled: boolean) => {
      const profile = get().actions.getProfile(operator);

      set((state) => ({
        context: {
          ...state.context,
          profiles: {
            ...state.context.profiles,
            [operator]: { ...profile, darkMode: enabled },
          },
        },
      }));
    },

    setAutoClearHistory: (operator: Operator, autoClearHistory: boolean) => {
      const profile = get().actions.getProfile(operator);

      set((state) => ({
        context: {
          ...state.context,
          profiles: {
            ...state.context.profiles,
            [operator]: { ...profile, autoClearHistory },
          },
        },
      }));
    },

    setAutoComplete: (operator, autoComplete) => {
      const profile = get().actions.getProfile(operator);

      set((state) => ({
        context: {
          ...state.context,
          profiles: {
            ...state.context.profiles,
            [operator]: { ...profile, autoComplete },
          },
        },
      }));
    },

    isDuplicateEntry(operator: Operator, entry: AssemblySchema): boolean {
      const profile = get().actions.getProfile(operator);

      return profile.history.some((historyEntry) => {
        const { timestamp: _ignored, ...rest } = historyEntry;
        return JSON.stringify(rest) === JSON.stringify(entry);
      });
    },

    addHistoryEntry: (operator: Operator, entry: AssemblySchema) => {
      const profile = get().actions.getProfile(operator);
      if (profile.history.length >= 100) return err("History limit exceeded");

      if (get().actions.isDuplicateEntry(operator, entry)) {
        return err("Entry already entered");
      }

      const newEntry: Entry = { ...entry, timestamp: new Date().toISOString() };

      set((state) => ({
        context: {
          ...state.context,
          profiles: {
            ...state.context.profiles,
            [operator]: {
              ...profile,
              history: [...profile.history, newEntry],
            },
          },
        },
      }));

      return ok(undefined);
    },

    clearUserHistory: (operator: Operator) => {
      const profile = get().actions.getProfile(operator);

      set((state) => ({
        context: {
          ...state.context,
          profiles: {
            ...state.context.profiles,
            [operator]: { ...profile, history: [] },
          },
        },
      }));
    },
  },
});
