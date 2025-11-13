import { Button } from "@/components/ui";
import { useAppForm } from "@/features/form/hooks";
import { DesignTreadsSection } from "./components/DesignTreadsSection";
import { FORM_DEFAULTS } from "../../constants";
import { formSchema } from "./schema";
import { useActions } from "@/store";
import { toast } from "sonner";
import { DevTools } from "../devTools/DevToolsDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import OneTwoCheckbox from "./components/fields/OneTwoCheckbox";

const Form = ({}) => {
  const { addHistoryEntry, validateSession } = useActions();

  const form = useAppForm({
    defaultValues: FORM_DEFAULTS,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value, formApi }) => {
      const error = validateSession();
      if (error) {
        toast.error(error);
        return;
      }

      addHistoryEntry(formSchema.parse(value));
      formApi.reset();
      toast.success(`Submitted successfully`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  return (
    <>
      <form
        className="flex flex-col px-4 pt-4 mt-2 mx-2 pb-20 bg-background"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="space-y-10 mb-8">
          <form.AppField name="customer">
            {(field) => <field.Input />}
          </form.AppField>
          <form.AppField name="site">
            {(field) => <field.Input />}
          </form.AppField>
          <div className="flex gap-4">
            <div className="relative flex-2">
              <OneTwoCheckbox />
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
        <Button className="mt-8 mx-auto font-mono bg-neutral-800 size-fit text-2xl py-3 px-24 rounded-[8px]">
          Submit
        </Button>
      </form>
      {import.meta.env.DEV && <DevTools form={form} />}
    </>
  );
};

export default Form;
