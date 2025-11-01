import { Button } from "@/components/ui";
import { useAppForm } from "@/features/form/hooks";
import { ChildForm } from "./components/Egg";
import { FORM_DEFAULTS } from "./constants";
import { formSchema } from "./schema";

const Form = ({}) => {
  const form = useAppForm({
    defaultValues: FORM_DEFAULTS,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      alert(`successful: ${JSON.stringify(value, null, 2)}`);
    },
    onSubmitInvalid: ({ value }) => {
      alert(`failed: ${JSON.stringify(value, null, 2)}`);
    },
  });

  return (
    <form
      className="p-4 flex flex-col border-t border-black mt-2 mx-2 pb-20"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <div className="space-y-8 mb-8">
          <form.AppField name="customer">
            {(field) => <field.Input />}
          </form.AppField>
          <form.AppField name="site">
            {(field) => <field.Input />}
          </form.AppField>
          <form.AppField name="plot">
            {(field) => <field.Input />}
          </form.AppField>
          <form.AppField name="wos">{(field) => <field.Input />}</form.AppField>
        </div>
        <ChildForm form={form} />

        <Button className="mt-8 mx-auto bg-orange-700">Submit</Button>
      </form.AppForm>
    </form>
  );
};

export default Form;
