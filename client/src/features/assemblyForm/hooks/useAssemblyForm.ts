import { FORM_DEFAULTS, GOOGLE_DESIGN_VALUES } from "@/constants";
import { useAppForm } from "./useAppForm";
import { assemblySchema } from "../schema";
import { toast } from "sonner";
import { useActions } from "@/store";
import { useSubmit } from "./useSubmit";

export function useAssemblyForm() {
  const { validateSession, isDuplicateEntry } = useActions();
  const { mutateAsync } = useSubmit();

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

      if (isDuplicateEntry(operator, entry)) {
        toast.error("This entry has already been submitted");
        return;
      }

      await mutateAsync({ operator, bench, entry, formApi });
    },
    onSubmitInvalid: () => {
      toast.error(`Submission failed`);
    },
  });
}
