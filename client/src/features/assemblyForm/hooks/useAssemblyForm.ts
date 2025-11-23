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

      // todo: temporary - remove this
      // ==========================
      const base =
        "https://docs.google.com/forms/d/1jE8X_JFzFmmjoTZjvxdDyJUi4A3o-063D9sOR1dTGz0/viewform";
      const params = new URLSearchParams({
        "entry.691366618": "24/11",
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
      // ==========================

      await mutateAsync({ operator, bench, entry, formApi });
    },
    onSubmitInvalid: () => {
      toast.error(`Submission failed`);
    },
  });
}
