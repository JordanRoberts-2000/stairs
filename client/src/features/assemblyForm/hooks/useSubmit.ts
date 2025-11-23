import { useMutation } from "@tanstack/react-query";
import type { AssemblySchema } from "../schema";
import type { AnyFormApi } from "@tanstack/react-form";
import { toast } from "sonner";
import { useActions } from "@/store";
import type { Operator } from "@/types";
import { scrollToTop, viewTransition } from "@/utils";
import { client } from "@/lib/client";

type SubmitPayload = {
  operator: Operator;
  bench: number;
  entry: AssemblySchema;
  formApi: AnyFormApi;
};

export function useSubmit() {
  const { addHistoryEntry, setIsPosting } = useActions();

  const mutation = useMutation<void, Error, SubmitPayload>({
    mutationKey: ["assembly", "submit"],
    mutationFn: async ({ operator, bench, entry }) => {
      const transitionPromise = viewTransition(() => setIsPosting(true));
      const fetchPromise = client.assembly.submit({ operator, bench, entry });

      await transitionPromise;

      const minLoadingPromise = new Promise((resolve) =>
        setTimeout(resolve, 300),
      );
      await Promise.all([fetchPromise, minLoadingPromise]);
    },
    onSuccess: async (_data, { operator, entry, formApi }: SubmitPayload) => {
      const historyResult = addHistoryEntry(operator, entry);
      if (historyResult.isErr()) {
        toast.error(`Adding entry failed: ${historyResult.error}`);
      }

      await viewTransition(() => {
        setIsPosting(false);
        formApi.reset();
      });

      await scrollToTop();
      toast.info("Submitted successfully");
    },
    onError: async (error) => {
      await viewTransition(() => setIsPosting(false));
      toast.info("Submission failed, please try again");
      console.error("Submission failed: ", error);
    },
  });

  return mutation;
}
