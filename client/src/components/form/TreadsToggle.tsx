import { TREADS_CONFIG } from "../../constants";
import type { FormSchema } from "../../schema";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useFieldContext, useFormContext } from "./hooks";

const FormNumberOfTreads = () => {
  const field = useFieldContext<number | null>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  // Get current stair type;
  const config = TREADS_CONFIG["winder"];

  // Check if current value is a custom value (not in the preset options)
  const isCustom =
    field.state.value !== null && !config.options.includes(field.state.value);
  const displayValue = isCustom ? "custom" : field.state.value?.toString();

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Number of Treads</FieldLabel>
      <ToggleGroup
        type="single"
        value={displayValue}
        onValueChange={(value) => {
          if (!value) return;

          if (value === "custom") {
            // When switching to custom, keep current value or clear it
            field.handleChange(isCustom ? field.state.value : null);
          } else {
            // Parse and set the preset number
            field.handleChange(parseInt(value, 10));
          }
        }}
      >
        {config.options.map((num) => (
          <ToggleGroupItem key={num} value={num.toString()}>
            {num}
          </ToggleGroupItem>
        ))}
        <ToggleGroupItem value="custom">Custom</ToggleGroupItem>
      </ToggleGroup>

      {/* Show input field when custom is selected */}
      {(displayValue === "custom" || isCustom) && (
        <Input
          type="number"
          placeholder="Enter custom number"
          value={field.state.value ?? ""}
          onChange={(e) => {
            const value = e.target.value === "" ? null : e.target.valueAsNumber;
            field.handleChange(value);
          }}
          onBlur={field.handleBlur}
        />
      )}

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export default FormNumberOfTreads;
