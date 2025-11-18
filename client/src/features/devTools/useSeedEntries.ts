import { useActions, useSession } from "@/store";
import { DESIGNS } from "../../constants";
import { useCallback } from "react";

const SEED_AMOUNT = 4;

export function useSeedEntries() {
  const pick = <T>(a: readonly T[]) => a[Math.floor(Math.random() * a.length)]!;
  const { addHistoryEntry } = useActions();
  const { operator } = useSession();

  const seedEntries = useCallback(() => {
    if (!operator) return;

    const entries = Array.from({ length: SEED_AMOUNT }, (_, i) => ({
      customer: ["Acme", "Birch", "Cedar", "Delta"][i % 4]!,
      site: ["North Yard", "South Yard", "Lot 3"][i % 3]!,
      plot: `${10 + i}`,
      wos: 800 + (i % 6) * 25,
      design: pick(DESIGNS),
      treads: 11 + (i % 5),
    }));

    for (const entry of entries) {
      addHistoryEntry(operator, entry);
    }
  }, [addHistoryEntry]);

  return { seedEntries };
}
