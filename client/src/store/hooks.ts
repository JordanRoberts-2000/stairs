import type { Operator, OperatorProfile } from "@/types";
import { useStore } from "./store";

export const useSession = () => useStore((store) => store.context.session);

export const useActions = () => useStore((store) => store.actions);

export const useOperatorProfile = (
  operator?: Operator,
): OperatorProfile | null => {
  return useStore((store) =>
    operator ? (store.context.profiles[operator] ?? null) : null,
  );
};

export const useIsPosting = () => useStore((store) => store.ui.isPosting);
