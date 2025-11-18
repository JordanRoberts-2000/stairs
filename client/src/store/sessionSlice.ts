import type { Operator } from "@/types";
import { err, ok, type Result } from "neverthrow";
import type { StateCreator } from "zustand";

type SessionContext = {
  session: { operator?: Operator; bench?: number };
};

type SessionActions = {
  setOperator: (operator: Operator) => void;
  setBench: (bench: number) => Result<void, string>;
  validateSession: () => Result<{ operator: Operator; bench: number }, string>;
};

export type SessionSlice = {
  context: SessionContext;
  actions: SessionActions;
};

export const createSessionSlice: StateCreator<
  SessionSlice,
  [],
  [],
  SessionSlice
> = (set, get) => ({
  context: {
    session: { operator: undefined, bench: undefined },
  },
  actions: {
    setOperator: (operator) => {
      set((state) => ({
        context: {
          ...state.context,
          session: { ...state.context.session, operator },
        },
      }));
    },

    setBench: (bench) => {
      const { operator } = get().context.session;
      if (!operator) return err("No operator selected");

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
  },
});
