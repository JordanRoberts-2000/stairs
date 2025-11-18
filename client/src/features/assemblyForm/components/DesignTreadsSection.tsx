import { FORM_DEFAULTS, TREADS_CONFIG } from "../../../constants";
import { withForm } from "../hooks/useAppForm";

const DesignTreadsSection = withForm({
  defaultValues: FORM_DEFAULTS,
  render: ({ form }) => {
    return (
      <div className="space-y-8 border-y-2 border-neutral-800 bg-linear-to-t from-yellow-50/60 to-white px-1 py-4">
        <form.AppField
          name="design"
          listeners={{
            onChange: ({ value }) => {
              form.setFieldValue("treads", {
                kind: "preset",
                value: TREADS_CONFIG[value].default.toString(),
              });

              form.setFieldMeta("treads", (prev) => ({
                ...prev,
                errors: [],
                errorMap: {},
              }));
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
