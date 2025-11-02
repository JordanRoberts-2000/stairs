import {
  Field,
  FieldError,
  FieldLabel,
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
      <FieldLabel htmlFor={field.name}>Number of Treads</FieldLabel>
      <ToggleGroup
        className="*:flex-1 *:border-2 *:border-black *:py-6 gap-2"
        type="single"
        value={String(field.state.value)}
        onValueChange={(v) => {
          if (v) field.handleChange(v);
        }}
      >
        {TREADS_CONFIG[design].options.map((tread_num) => (
          <ToggleGroupItem key={tread_num} value={tread_num.toString()}>
            {tread_num}
          </ToggleGroupItem>
        ))}
        <ToggleGroupItem value="custom">Custom</ToggleGroupItem>
      </ToggleGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export default FormNumberOfTreads;
