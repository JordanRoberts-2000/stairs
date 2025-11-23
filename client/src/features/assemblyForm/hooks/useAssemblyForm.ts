import { FORM_DEFAULTS } from "@/constants";
import { useAppForm } from "./useAppForm";
import { assemblySchema } from "../schema";
import { toast } from "sonner";
import { useActions } from "@/store";
import { useSubmitMutation } from "./useSubmitMutation";

export function useAssemblyForm() {
  const { validateSession } = useActions();
  const { mutateAsync } = useSubmitMutation();

  return useAppForm({
    defaultValues: FORM_DEFAULTS,
    validators: {
      onSubmit: assemblySchema,
      onBlur: assemblySchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const result = validateSession();
      if (result.isErr()) {
        toast.error(result.error);
        return;
      }

      const { operator, bench } = result.value;
      const entry = assemblySchema.parse(value);

      // error hand;ing?
      await mutateAsync({ operator, bench, entry, formApi });
    },
    onSubmitInvalid: () => {
      toast.error(`Submission failed`);
    },
  });
}
