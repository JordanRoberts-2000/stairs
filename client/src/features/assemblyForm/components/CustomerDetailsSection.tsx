import { FORM_DEFAULTS } from "@/constants";
import { withForm } from "../hooks/useAppForm";
import { CustomerInput } from "./fields/CustomerInput";

const CustomerDetailsSection = withForm({
  defaultValues: FORM_DEFAULTS,
  render: ({ form }) => {
    return (
      <div className="mb-8 space-y-10 rounded-2xl bg-yellow-50/40 px-2 py-4">
        <CustomerInput form={form} />
        <form.AppField name="site">{(field) => <field.Input />}</form.AppField>
        <div className="flex gap-4 md:flex-col md:gap-10">
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
    );
  },
});

export { CustomerDetailsSection };
