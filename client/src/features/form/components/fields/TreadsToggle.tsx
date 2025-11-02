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
        value={String(field.state.value)}
        onValueChange={(v) => {
          if (v) field.handleChange(v);
        }}
      >
        {TREADS_CONFIG[design].options.map((tread_num) => (
          <ToggleGroupItem
            key={tread_num}
            value={tread_num.toString()}
            className="font-black flex-1 border-2 shadow-md! rounded-[4px]! border-primary py-6"
          >
            {tread_num}
          </ToggleGroupItem>
        ))}
        <Input
          placeholder="Custom"
          className="placeholder:text-center text-center font-black flex-2 border-2 shadow-md! rounded-[4px]! border-primary py-6"
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          maxLength={2}
        />
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
