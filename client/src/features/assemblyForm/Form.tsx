import { Button } from "@/components/ui";
import { DesignTreadsSection } from "./components/DesignTreadsSection";
import { DevTools } from "../devTools/DevToolsDialog";
import { CustomerInput } from "./components/fields/CustomerInput";
import { useAssemblyForm } from "./hooks/useAssemblyForm";
import { DEMO_MODE } from "@/AppConfig";

const Form = ({}) => {
  const form = useAssemblyForm();

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
      {DEMO_MODE && <DevTools form={form} />}
    </>
  );
};

export default Form;
