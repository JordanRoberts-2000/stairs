import { Button } from "@/components/ui";
import { useAppForm } from "@/features/assemblyForm/hooks";
import { DesignTreadsSection } from "./components/DesignTreadsSection";
import { FORM_DEFAULTS, GOOGLE_DESIGN_VALUES } from "../../constants";
import { assemblySchema } from "./schema";
import { useActions } from "@/store";
import { toast } from "sonner";
import { DevTools } from "../devTools/DevToolsDialog";
import { CustomerInput } from "./components/fields/CustomerInput";

const Form = ({}) => {
  const { addHistoryEntry, validateSession } = useActions();

  const form = useAppForm({
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

      const entry = assemblySchema.parse(value);
      addHistoryEntry(entry);
      formApi.reset();
      toast.success(`Submitted successfully`);
      window.scrollTo({ top: 0, behavior: "smooth" });

      const base =
        "https://docs.google.com/forms/d/1jE8X_JFzFmmjoTZjvxdDyJUi4A3o-063D9sOR1dTGz0/viewform";
      const params = new URLSearchParams({
        "entry.691366618": "17/11",
        "entry.1725229977": result.value.operator,
        "entry.557826237": String(result.value.bench),
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

  return (
    <>
      <form
        className="mx-2 mt-2 flex flex-col bg-background px-4 pt-4 pb-20"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="mb-8 space-y-10 rounded-2xl bg-yellow-50/40 px-2 py-4">
          <CustomerInput form={form} />
          <form.AppField name="site">
            {(field) => <field.Input />}
          </form.AppField>
          <div className="flex gap-4">
            <div className="relative flex-2">
              <form.AppField name="isOneTwo">
                {(field) => <field.CheckBox />}
              </form.AppField>
              <form.AppField name="plot">
                {(field) => (
                  <field.Input
                    inputMode="numeric"
                    className="w-full"
                    maxLength={3}
                  />
                )}
              </form.AppField>
            </div>
            <form.AppField name="wos">
              {(field) => (
                <field.Input
                  inputMode="numeric"
                  className="flex-1"
                  maxLength={4}
                />
              )}
            </form.AppField>
          </div>
        </div>
        <DesignTreadsSection form={form} />
        <Button className="mx-auto mt-8 size-fit rounded-[8px] bg-neutral-800 px-24 py-3 font-mono text-2xl">
          Submit
        </Button>
      </form>
      {import.meta.env.DEV && <DevTools form={form} />}
    </>
  );
};

export default Form;
