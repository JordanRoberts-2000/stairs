import { formSchema, type FormSchemaInput } from "../../schema";
import { Button } from "../ui/button";
import { useAppForm } from "./hooks";

const Form = ({}) => {
  const form = useAppForm({
    defaultValues: {
      customer: "",
      site: "",
      plot: null,
      stairType: "straight",
      treads: null,
      width: null,
    } satisfies FormSchemaInput as FormSchemaInput,
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
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField name="customer">
        {(field) => <field.Input />}
      </form.AppField>
      <form.AppField name="site">{(field) => <field.Input />}</form.AppField>
      <form.AppField name="plot">{(field) => <field.Input />}</form.AppField>
      <form.AppField name="stairType">
        {(field) => <field.ToggleGroup />}
      </form.AppField>
      <form.AppField name="treads">
        {(field) => <field.TreadNumber />}
      </form.AppField>
      <form.AppField name="width">{(field) => <field.Input />}</form.AppField>
      <Button>Submit</Button>
    </form>
  );
};

export default Form;
