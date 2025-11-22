import { useActions, useSession } from "@/store";
import { DESIGNS } from "../../constants";
import { useCallback } from "react";
import { toast } from "sonner";

const SEED_AMOUNT = 4;

export function useSeedEntries() {
  const pick = <T>(a: readonly T[]) => a[Math.floor(Math.random() * a.length)]!;

  const { addHistoryEntry } = useActions();
  const { operator } = useSession();

  const seedEntries = useCallback(() => {
    if (!operator) {
      toast.error(`Need to set an operator`);
      return;
    }

    const customers = ["Acme", "Birch", "Cedar", "Delta", "Echo", "Foxtrot"];
    const sites = [
      "North Yard",
      "South Yard",
      "Lot 3",
      "East Wing",
      "West Block",
    ];

    const entries = Array.from({ length: SEED_AMOUNT }, () => ({
      customer: pick(customers),
      site: pick(sites),
      plot: `${10 + Math.floor(Math.random() * 90)}`,
      wos: 800 + Math.floor(Math.random() * 200),
      design: pick(DESIGNS),
      treads: 11 + Math.floor(Math.random() * 10),
    }));

    for (const entry of entries) {
      const historyResult = addHistoryEntry(operator, entry);
      if (historyResult.isErr()) {
        toast.error(`Adding entry failed: ${historyResult.error}`);
      }
    }
  }, [addHistoryEntry, operator]);

  return { seedEntries };
}
