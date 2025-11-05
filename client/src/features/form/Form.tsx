import { Button } from "@/components/ui";
import { useAppForm } from "@/features/form/hooks";
import { DesignTreadsSection } from "./components/DesignTreadsSection";
import { FORM_DEFAULTS } from "./constants";
import { formSchema } from "./schema";
import { useActions } from "@/store";
import { toast } from "sonner";

const Form = ({}) => {
  const { addEntry } = useActions();

  const form = useAppForm({
    defaultValues: FORM_DEFAULTS,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value, formApi }) => {
      const entry = formSchema.parse(value);
      addEntry(entry);
      formApi.reset();
      toast.success(`submitted successfully`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  return (
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
        <form.AppField name="site">{(field) => <field.Input />}</form.AppField>
        <form.AppField name="plot">
          {(field) => <field.Input inputMode="numeric" maxLength={3} />}
        </form.AppField>
        <form.AppField name="wos">
          {(field) => <field.Input inputMode="numeric" maxLength={4} />}
        </form.AppField>
      </div>
      <DesignTreadsSection form={form} />
      <Button className="mt-8 mx-auto font-mono bg-neutral-800 size-fit text-2xl py-3 px-24 rounded-[8px]">
        Submit
      </Button>
    </form>
  );
};

export default Form;
