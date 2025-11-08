import type { FormSchemaInput } from "../../schema";
import { Field, FieldLabel } from "../../../../components/ui/field";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";
import { useFieldContext } from "../../hooks";
import StraightIcon from "@/assets/design/straight.svg?react";
import WinderIcon from "@/assets/design/winder.svg?react";
import DoubleWinderIcon from "@/assets/design/doubleWinder.svg?react";
import { DESIGNS } from "../../constants";
import { flushSync } from "react-dom";

const DesignToggle = () => {
  const field = useFieldContext<FormSchemaInput["design"]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const isDesign = (v: string): v is FormSchemaInput["design"] =>
    (DESIGNS as readonly string[]).includes(v);

  return (
    <Field data-invalid={isInvalid} className="relative">
      <FieldLabel
        htmlFor={field.name}
        className="capitalize font-black text-md text-black!"
      >
        {field.name}
      </FieldLabel>
      <ToggleGroup
        type="single"
        className="w-full *:flex-1 *:border-2 *:border-cyan-800 *:shadow-md! *:rounded-[8px]! *:h-fit *:flex-col gap-3 *:py-4"
        value={field.state.value}
        onValueChange={(val) => {
          document.startViewTransition(() => {
            flushSync(() => {
              if (isDesign(val)) field.handleChange(val);
            });
          });
        }}
      >
        <ToggleGroupItem value="straight" className="font-black! text-xs!">
          <StraightIcon className="size-8" />
          Straight
        </ToggleGroupItem>
        <ToggleGroupItem value="winder" className="font-black text-xs!">
          <WinderIcon className="size-8" />
          Winder
        </ToggleGroupItem>
        <ToggleGroupItem value="doubleWinder" className="font-black text-xs!">
          <DoubleWinderIcon className="size-8" />
          Double Winder
        </ToggleGroupItem>
      </ToggleGroup>
    </Field>
  );
};

export { DesignToggle };
