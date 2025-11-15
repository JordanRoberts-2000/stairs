import { RESET_TIME } from "@/constants";
import { useActions, useOperatorProfile } from "@/store";
import { toast } from "sonner";

export function useClearHistoryCheck() {
  const profile = useOperatorProfile();
  const { clearUserHistory } = useActions();

  return () => {
    if (!profile) return;
    if (!profile.autoClearHistory) return;

    const last = profile.history.at(-1);
    if (!last) return;

    const lastTime = new Date(last.timestamp).getTime();
    if (Date.now() - lastTime >= RESET_TIME) {
      clearUserHistory();
      toast.info("History auto cleared");
    }
  };
}
