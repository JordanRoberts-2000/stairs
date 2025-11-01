import { Field, FieldError, FieldLabel, Input } from "@/components/ui";
import { useFieldContext } from "@/features/form/hooks";

const FormInput = ({}) => {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid} className="relative">
      <FieldLabel
        htmlFor={field.name}
        className="absolute capitalize top-0 -translate-y-1/2 bg-background w-fit! text-sm font-semibold px-2 left-4"
      >
        {field.name}
      </FieldLabel>
      <Input
        className="border-2 border-black text-lg size-fit px-3 py-2"
        id={field.name}
        aria-invalid={isInvalid}
        name={field.name}
        onBlur={field.handleBlur}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export default FormInput;
