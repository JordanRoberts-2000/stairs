import type { FormSchemaInput } from "../../schema";
import { Field, FieldError, FieldLabel } from "../../../../components/ui/field";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";
import { useFieldContext } from "../../hooks";
import StraightIcon from "@/assets/straight.svg?react";
import { DESIGNS } from "../../constants";

const DesignToggle = () => {
  const field = useFieldContext<FormSchemaInput["design"]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const isDesign = (v: string): v is FormSchemaInput["design"] =>
    (DESIGNS as readonly string[]).includes(v);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name} className="capitalize">
        {field.name}
      </FieldLabel>
      <ToggleGroup
        type="single"
        className="w-full *:flex-1 *:border-2 *:border-black *:h-fit *:flex-col gap-3 *:py-4"
        value={field.state.value}
        onValueChange={(val) => {
          if (isDesign(val)) field.handleChange(val);
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

export { DesignToggle };
