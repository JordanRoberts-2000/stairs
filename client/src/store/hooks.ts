import type { Operator, OperatorProfile } from "@/types";
import { useStore } from "./store";

export const useSession = () => useStore((state) => state.context.session);

export const useActions = () => useStore((state) => state.actions);

export const useOperatorProfile = (
  operator?: Operator,
): OperatorProfile | null => {
  return useStore((state) =>
    operator ? (state.context.profiles[operator] ?? null) : null,
  );
};
