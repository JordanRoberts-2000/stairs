import { Button } from "@/components/ui";
import { useAppForm } from "@/features/assemblyForm/hooks";
import { DesignTreadsSection } from "./components/DesignTreadsSection";
import { FORM_DEFAULTS } from "../../constants";
import { assemblySchema } from "./schema";
import { useActions } from "@/store";
import { toast } from "sonner";
import { DevTools } from "../devTools/DevToolsDialog";

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

      addHistoryEntry(assemblySchema.parse(value));
      formApi.reset();
      toast.success(`Submitted successfully`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onSubmitInvalid: () => {
      toast.error(`Submission failed`);
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
            {(field) => (
              <field.Input
                inputMode="url"
                onBlur={() => {
                  field.handleBlur();
                  const value = field.state.value;
                  if (value && value.includes("/")) {
                    const parts = value.split("/").map((part) => part.trim());

                    if (parts.length >= 1 && parts[0]) {
                      form.setFieldValue("customer", parts[0]);
                      form.validateField("customer", "submit");
                    }
                    if (parts.length >= 2 && parts[1]) {
                      form.setFieldValue("site", parts[1]);
                      form.validateField("site", "submit");
                    }
                    if (parts.length >= 3 && parts[2]) {
                      form.setFieldValue("plot", parts[2]);
                      form.validateField("plot", "submit");
                    }
                    if (parts.length >= 4 && parts[3]) {
                      form.setFieldValue("wos", parts[3]);
                      form.validateField("wos", "submit");
                    }
                  }
                }}
              />
            )}
          </form.AppField>
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
        <Button className="mt-8 mx-auto font-mono bg-neutral-800 size-fit text-2xl py-3 px-24 rounded-[8px]">
          Submit
        </Button>
      </form>
      {import.meta.env.DEV && <DevTools form={form} />}
    </>
  );
};

export default Form;
