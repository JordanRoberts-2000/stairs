import { Field, FieldError, FieldLabel, Input } from "@/components/ui";
import { useFieldContext } from "@/features/form/hooks";

const FormInput = ({}) => {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid} className="relative">
      <FieldLabel
        htmlFor={field.name}
        className="absolute top-0 capitalize text-sm font-black text-black! -translate-y-1/2 bg-background w-fit! px-2 left-4"
      >
        {field.name}
      </FieldLabel>
      <Input
        className="border-2 border-cyan-800 text-lg shadow-md rounded-[8px] size-fit px-3 py-2"
        id={field.name}
        aria-invalid={isInvalid}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        name={field.name}
        onBlur={field.handleBlur}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {isInvalid && (
        <FieldError
          className="absolute text-xs -top-1 font-bold -translate-y-full text-right pr-2"
          errors={field.state.meta.errors}
        />
      )}
    </Field>
  );
};

export default FormInput;
