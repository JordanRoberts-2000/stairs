import { useClearHistoryCheck } from "@/utils/clearHistoryCheck";
import { useEffect } from "react";

export function useVisibilityClearHistoryCheck() {
  const clearHistoryCheck = useClearHistoryCheck();

  useEffect(() => {
    const onVisibility = () => {
      clearHistoryCheck();
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [clearHistoryCheck]);
}
