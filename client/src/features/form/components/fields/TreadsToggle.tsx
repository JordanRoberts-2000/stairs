import {
  Field,
  FieldError,
  FieldLabel,
  Input,
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui";
import { useFieldContext } from "@/features/form/hooks";
import { TREADS_CONFIG } from "@/features/form/constants";
import type { FormSchemaInput } from "@/features/form/schema";

type Props = {
  design: FormSchemaInput["design"];
};

const FormNumberOfTreads = ({ design }: Props) => {
  const field = useFieldContext<FormSchemaInput["treads"]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name} className="font-black text-md">
        Number of Treads
      </FieldLabel>
      <ToggleGroup
        className="gap-2 relative"
        type="single"
        value={
          field.state.value.kind === "preset" ? field.state.value.value : ""
        }
        onValueChange={(value) => {
          if (value) field.handleChange({ kind: "preset", value });
        }}
      >
        {TREADS_CONFIG[design].options.map((tread_num, i) => (
          <ToggleGroupItem
            key={tread_num}
            value={tread_num.toString()}
            style={{ viewTransitionName: `tread-${i}` }}
            className="font-black flex-1 border-2 shadow-md! rounded-[4px]! border-cyan-800 py-6"
          >
            <div style={{ viewTransitionName: `tread-${i}-num` }}>
              {tread_num}
            </div>
          </ToggleGroupItem>
        ))}
        <div
          className="relative  text-center h-12 font-black flex-2 border-2 shadow-md! rounded-[4px]! border-primary py-6"
          style={{ viewTransitionName: "treads" }}
        >
          <Input
            inputMode="numeric"
            className="peer border-none shadow-none"
            placeholder=" "
            onBlur={field.handleBlur}
            onChange={(e) =>
              field.handleChange({ kind: "custom", value: e.target.value })
            }
            value={
              field.state.value.kind === "custom" ? field.state.value.value : ""
            }
            maxLength={2}
          />
          <span
            aria-hidden
            style={{ viewTransitionName: "treads-ph" }}
            className="pointer-events-none absolute inset-0 grid place-items-center peer-not-placeholder-shown:opacity-0"
          >
            Custom
          </span>
        </div>

        {isInvalid && (
          <FieldError
            errors={field.state.meta.errors}
            className="absolute font-bold text-xs right-0 -top-2 -translate-y-full pr-2"
          />
        )}
      </ToggleGroup>
    </Field>
  );
};

export default FormNumberOfTreads;
