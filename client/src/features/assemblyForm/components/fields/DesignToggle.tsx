import type { AssemblySchemaInput } from "../../schema";
import { Field, FieldLabel } from "../../../../components/ui/field";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";
import { useFieldContext } from "../../hooks/useAppForm";
import { DESIGNS, GOOGLE_DESIGN_VALUES } from "../../../../constants";
import { flushSync } from "react-dom";
import DesignIcon from "@/components/DesignIcon";
import { startViewTransition } from "@/utils";

const DesignToggle = () => {
  const field = useFieldContext<AssemblySchemaInput["design"]>();
  const isInvalid = !field.state.meta.isValid;

  const isDesign = (v: string): v is AssemblySchemaInput["design"] =>
    (DESIGNS as readonly string[]).includes(v);

  return (
    <Field data-invalid={isInvalid} className="relative">
      <FieldLabel
        htmlFor={field.name}
        className="text-md font-black text-black! capitalize"
      >
        {field.name}
      </FieldLabel>
      <ToggleGroup
        type="single"
        className="w-full gap-3 *:h-fit *:flex-1 *:flex-col *:rounded-[8px]! *:border-2 *:py-4 *:shadow-md!"
        value={field.state.value}
        onValueChange={(val) => {
          if (val !== field.state.value && isDesign(val))
            startViewTransition(() => {
              flushSync(() => {
                field.handleChange(val);
              });
            });
        }}
      >
        {DESIGNS.map((design) => {
          const isSelected = field.state.value === design;
          return (
            <ToggleGroupItem
              key={design}
              value={design}
              className="border-neutral-400! bg-white text-xs! font-black! data-[state=on]:border-neutral-800! data-[state=on]:bg-yellow-50!"
            >
              <DesignIcon
                design={design}
                variant={isSelected ? "default" : "outline"}
                blurBackground={!isSelected}
                className="size-9 data-[state=on]:fill-black"
              />
              {GOOGLE_DESIGN_VALUES[design]}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </Field>
  );
};

export { DesignToggle };
