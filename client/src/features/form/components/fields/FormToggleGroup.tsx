import type { FormSchema } from "../../schema";
import { Field, FieldError, FieldLabel } from "../../../../components/ui/field";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";
import { useFieldContext, withForm } from "../../hooks";
import StraightIcon from "@/assets/straight.svg?react";
import { FORM_DEFAULTS } from "../../constants";
// import { useStore } from "@tanstack/react-form";

const FormToggleGroup = () => {
  const field = useFieldContext<FormSchema["design"]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name} className="capitalize">
        {field.name}
      </FieldLabel>
      <ToggleGroup
        type="single"
        className="w-full *:flex-1 *:border-2 *:border-black *:h-fit *:flex-col gap-3 *:py-4"
        value={field.state.value}
        onValueChange={(value) => {
          if (value) field.handleChange(value as FormSchema["design"]);
        }}
      >
        <ToggleGroupItem value="straight">
          <StraightIcon />
          Straight
        </ToggleGroupItem>
        <ToggleGroupItem value="winder">
          <StraightIcon />
          Winder
        </ToggleGroupItem>
        <ToggleGroupItem value="doubleWinder">
          <StraightIcon />
          Double winder
        </ToggleGroupItem>
      </ToggleGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export { FormToggleGroup };
