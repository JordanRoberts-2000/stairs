import { Field, FieldError, FieldLabel, Input } from "@/components/ui";
import { useFieldContext } from "@/features/assemblyForm/hooks";
import { cn } from "@/lib/utils";

const FormInput = ({
  className,
  ...attr
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid} className={cn("relative", className)}>
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
        name={field.name}
        onBlur={field.handleBlur}
        value={field.state.value}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        onChange={(e) => field.handleChange(e.target.value)}
        {...attr}
      />
      {isInvalid && (
        <FieldError
          className="absolute text-xs bottom-0 pt-1 translate-y-full font-bold pr-2"
          errors={field.state.meta.errors}
        />
      )}
    </Field>
  );
};

export default FormInput;
