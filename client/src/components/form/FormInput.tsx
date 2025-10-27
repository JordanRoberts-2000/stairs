import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useFieldContext } from "./hooks";

const FormInput = ({}) => {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{field.name}</FieldLabel>
      <Input
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
