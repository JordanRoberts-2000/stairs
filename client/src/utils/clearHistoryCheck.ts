import { RESET_TIME } from "@/constants";
import { useActions, useSession } from "@/store";
import { toast } from "sonner";

export function useClearHistoryCheck() {
  const { operator } = useSession();
  const { clearUserHistory, getProfile } = useActions();

  return () => {
    if (!operator) return;

    const profile = getProfile(operator);
    if (!profile.autoClearHistory) return;

    const last = profile.history.at(-1);
    if (!last) return;

    const lastTime = new Date(last.timestamp).getTime();
    if (Date.now() - lastTime >= RESET_TIME) {
      clearUserHistory(operator);
      toast.info("History auto cleared");
    }
  };
}
