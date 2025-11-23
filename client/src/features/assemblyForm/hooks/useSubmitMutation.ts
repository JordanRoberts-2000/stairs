import { DEMO_MODE } from "@/AppConfig";
import { GOOGLE_DESIGN_VALUES } from "@/constants";
import { useDemoStore } from "@/store/demoStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AssemblySchema } from "../schema";
import type { AnyFormApi } from "@tanstack/react-form";
import { toast } from "sonner";
import { useActions } from "@/store";
import type { Operator } from "@/types";
import { scrollToTop, viewTransition } from "@/utils";

type SubmitPayload = {
  operator: Operator;
  bench: number;
  entry: AssemblySchema;
  formApi: AnyFormApi;
};

export function useSubmitMutation() {
  const redirectOnSubmit = DEMO_MODE
    ? useDemoStore((s) => s.redirectOnSubmit)
    : false;

  const { addHistoryEntry, setIsPosting } = useActions();

  const mutation = useMutation<void, Error, SubmitPayload>({
    mutationKey: ["assembly", "submit"],
    mutationFn: async ({ operator, bench, entry }) => {
      if (DEMO_MODE && redirectOnSubmit) {
        const base =
          "https://docs.google.com/forms/d/1jE8X_JFzFmmjoTZjvxdDyJUi4A3o-063D9sOR1dTGz0/viewform";

        const params = new URLSearchParams({
          "entry.691366618": "17/11",
          "entry.1725229977": operator,
          "entry.557826237": String(bench),
          "entry.1416759496": entry.customer,
          "entry.1701527705": entry.site,
          "entry.2141275577": entry.plot,
          "entry.1294180363": GOOGLE_DESIGN_VALUES[entry.design],
          "entry.1028831130": String(entry.treads),
          "entry.1835744144": String(entry.wos),
        });

        const prefillUrl = `${base}?${params.toString()}`;
        window.open(prefillUrl, "_blank", "noopener,noreferrer");
      }

      await viewTransition({
        start: () => setIsPosting(true),
        finished: async () => {
          if (DEMO_MODE) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          } else {
            // TODO: real server call
            // await api.post("/assembly", { operator, bench, ...entry });
          }
        },
      });
    },
    onSuccess: async (_data, { operator, entry, formApi }: SubmitPayload) => {
      const historyResult = addHistoryEntry(operator, entry);
      if (historyResult.isErr()) {
        toast.error(`Adding entry failed: ${historyResult.error}`);
        return;
      }

      await viewTransition({
        start: () => {
          setIsPosting(false);
          formApi.reset();
        },
        finished: async () => {
          toast.info("Entry submitted");
          await scrollToTop();
        },
      });
    },
    onError: (error) => {
      console.error("failed to post assembly form: ", error);
      viewTransition({
        start: () => {
          setIsPosting(false);
        },
        finished: () => {
          toast.error("Entry failed to submit, please try again");
        },
      });
    },
  });

  return mutation;
}
