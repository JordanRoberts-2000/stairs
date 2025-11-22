import { FORM_DEFAULTS, GOOGLE_DESIGN_VALUES } from "@/constants";
import { useAppForm } from "./useAppForm";
import { assemblySchema } from "../schema";
import { toast } from "sonner";
import { useActions } from "@/store";

export function useAssemblyForm() {
  const { addHistoryEntry, validateSession } = useActions();

  return useAppForm({
    defaultValues: FORM_DEFAULTS,
    validators: {
      onSubmit: assemblySchema,
      onBlur: assemblySchema,
    },
    onSubmit: ({ value, formApi }) => {
      const result = validateSession();
      if (result.isErr()) {
        toast.error(result.error);
        return;
      }

      const { operator, bench } = result.value;
      const entry = assemblySchema.parse(value);

      const historyResult = addHistoryEntry(operator, entry);
      if (historyResult.isErr()) {
        toast.error(`Adding entry failed: ${historyResult.error}`);
        return;
      }

      formApi.reset();
      toast.success(`Submitted successfully`);
      window.scrollTo({ top: 0, behavior: "smooth" });

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
    },
    onSubmitInvalid: () => {
      toast.error(`Submission failed`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });
}
