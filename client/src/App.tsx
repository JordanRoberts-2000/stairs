import { formSchema } from "./schema";
import { useAppForm } from "./components/form/hooks";
import { Button } from "./components/ui/button";

function App() {
  const form = useAppForm({
    defaultValues: {
      customer: "",
      site: "",
    },
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
    <div className="m-20">
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
        <Button>Submit</Button>
      </form>
    </div>
  );
}

export default App;
