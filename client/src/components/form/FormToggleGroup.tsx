import type { FormSchema } from "../../schema";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useFieldContext } from "./hooks";

const FormToggleGroup = () => {
  const field = useFieldContext<FormSchema["stairType"]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{field.name}</FieldLabel>
      <ToggleGroup
        type="single"
        value={field.state.value}
        onValueChange={(value) => {
          if (value) field.handleChange(value as FormSchema["stairType"]);
        }}
      >
        <ToggleGroupItem value="straight">Straights</ToggleGroupItem>
        <ToggleGroupItem value="winder">Winders</ToggleGroupItem>
        <ToggleGroupItem value="doubleWinder">Double winders</ToggleGroupItem>
      </ToggleGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export default FormToggleGroup;
