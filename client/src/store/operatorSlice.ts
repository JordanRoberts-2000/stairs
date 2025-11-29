import type { AssemblySchema } from "@/features/assemblyForm/schema";
import type { Entry, OperatorProfile } from "@/types";
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
  profiles: Partial<Record<string, OperatorProfile>>;
};

type OperatorActions = {
  getProfile: (operator: string) => OperatorProfile;

  setTarget: (operator: string, target: number) => void;
  setTargetEnabled: (operator: string, enabled: boolean) => void;
  setDarkMode: (operator: string, enabled: boolean) => void;
  setAutoClearHistory: (operator: string, autoClearHistory: boolean) => void;
  setAutoComplete: (operator: string, autoComplete: boolean) => void;

  isDuplicateEntry: (operator: string, entry: AssemblySchema) => boolean;
  addHistoryEntry: (
    operator: string,
    entry: AssemblySchema,
  ) => Result<void, string>;
  clearUserHistory: (operator: string) => void;
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

    setTarget: (operator: string, target: number) => {
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

    setTargetEnabled: (operator: string, enabled: boolean) => {
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

    setDarkMode: (operator: string, enabled: boolean) => {
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

    setAutoClearHistory: (operator: string, autoClearHistory: boolean) => {
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

    isDuplicateEntry(operator: string, entry: AssemblySchema): boolean {
      const profile = get().actions.getProfile(operator);

      return profile.history.some((historyEntry) => {
        const { timestamp: _ignored, ...rest } = historyEntry;
        return JSON.stringify(rest) === JSON.stringify(entry);
      });
    },

    addHistoryEntry: (operator: string, entry: AssemblySchema) => {
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

    clearUserHistory: (operator: string) => {
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
