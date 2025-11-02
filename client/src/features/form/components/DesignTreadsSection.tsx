import { FORM_DEFAULTS, TREADS_CONFIG } from "../constants";
import { withForm } from "../hooks";

const DesignTreadsSection = withForm({
  defaultValues: FORM_DEFAULTS,
  render: ({ form }) => {
    return (
      <div className="space-y-8 border-t border-black pt-4">
        <form.AppField
          name="design"
          listeners={{
            onChange: ({ value }) => {
              form.setFieldValue(
                "treads",
                TREADS_CONFIG[value].default.toString()
              );
            },
          }}
        >
          {(field) => <field.ToggleGroup />}
        </form.AppField>
        <form.Subscribe
          selector={(state) => state.values.design}
          children={(design) => (
            <form.AppField name="treads">
              {(field) => <field.TreadNumber design={design} />}
            </form.AppField>
          )}
        />
      </div>
    );
  },
});

export { DesignTreadsSection };
