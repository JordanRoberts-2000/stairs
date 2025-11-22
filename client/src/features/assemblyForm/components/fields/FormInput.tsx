import { Field, FieldError, FieldLabel, Input } from "@/components/ui";
import { useFieldContext } from "@/features/assemblyForm/hooks/useAppForm";
import { cn } from "@/lib/utils";

const FormInput = ({
  className,
  ...attr
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const field = useFieldContext<string>();

  const isInvalid = !field.state.meta.isValid && field.state.meta.isTouched;
  return (
    <Field
      data-invalid={isInvalid}
      className={cn(
        "relative transition duration-300 focus-within:scale-[0.96]",
        className,
      )}
    >
      <FieldLabel
        htmlFor={field.name}
        className="absolute top-0 left-4 w-fit! -translate-y-1/2 bg-background px-2 text-sm font-black text-black! capitalize"
      >
        {field.name}
      </FieldLabel>
      <Input
        className="size-fit rounded-[8px] border-2 border-neutral-500 px-3 py-2 text-lg shadow-md"
        id={field.name}
        aria-invalid={isInvalid}
        name={field.name}
        onBlur={field.handleBlur}
        value={field.state.value}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        onChange={(e) => {
          field.setMeta((m) => ({
            ...m,
            errors: [],
            errorMap: {},
          }));
          field.handleChange(e.target.value);
        }}
        {...attr}
      />
      {isInvalid && (
        <FieldError
          className="absolute bottom-0 translate-y-full pt-1 pr-2 text-xs font-bold"
          errors={field.state.meta.errors}
        />
      )}
    </Field>
  );
};

export default FormInput;
