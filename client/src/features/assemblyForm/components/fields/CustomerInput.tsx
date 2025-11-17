import { Field, FieldError, FieldLabel, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { withForm } from "../../hooks";
import { FORM_DEFAULTS } from "@/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const shouldShowCustomerTooltip = (raw: unknown): boolean => {
  const value = String(raw ?? "")
    .trim()
    .toLowerCase();

  if (!value) return false;

  const normalized = value.replace(/[\s.'"]/g, "");

  const targets = new Set(
    [
      "dw'",
      "d w",
      "d.w",
      "david",
      "david wilson",
      "david.wilson",
      "barratt",
      "barrat",
    ].map((s) => s.toLowerCase()),
  );

  const normalizedTargets = new Set(
    Array.from(targets).map((s) => s.replace(/[\s.'"]/g, "")),
  );

  return targets.has(value) || normalizedTargets.has(normalized);
};

const CustomerInput = withForm({
  defaultValues: FORM_DEFAULTS,
  render: ({ form }) => {
    return (
      <form.AppField name="customer">
        {(field) => {
          const value = field.state.value ?? "";
          const isInvalid =
            !field.state.meta.isValid && field.state.meta.isTouched;
          const showTooltip = shouldShowCustomerTooltip(value);

          return (
            <Field data-invalid={isInvalid} className="relative">
              <FieldLabel
                htmlFor={field.name}
                className="absolute top-0 left-4 z-10 w-fit! -translate-y-1/2 bg-background bg-white px-2 text-sm font-black text-black! capitalize"
              >
                {field.name}
              </FieldLabel>

              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  className={cn(
                    "w-full rounded-[8px] border-2 px-3 py-2 text-lg shadow-md",
                    "border-neutral-500",
                    showTooltip && "border-orange-500 pr-10", // make room for icon
                  )}
                  aria-invalid={isInvalid}
                  inputMode="url"
                  value={value}
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  onBlur={() => {
                    field.handleBlur();
                    const v = field.state.value as string | undefined;

                    if (v && v.includes("/")) {
                      const parts = v.split("/").map((part) => part.trim());

                      if (parts.length >= 1 && parts[0]) {
                        form.setFieldValue("customer", parts[0]);
                        form.validateField("customer", "submit");
                      }
                      if (parts.length >= 2 && parts[1]) {
                        form.setFieldValue("site", parts[1]);
                        form.validateField("site", "submit");
                      }
                      if (parts.length >= 3 && parts[2]) {
                        form.setFieldValue("plot", parts[2]);
                        form.validateField("plot", "submit");
                      }
                      if (parts.length >= 4 && parts[3]) {
                        form.setFieldValue("wos", parts[3]);
                        form.validateField("wos", "submit");
                      }
                    }
                  }}
                  onChange={(e) => {
                    // Clear errors as soon as user edits again
                    field.setMeta((m) => ({
                      ...m,
                      errors: [],
                      errorMap: {},
                    }));
                    field.handleChange(e.target.value);
                  }}
                />

                {showTooltip && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="pointer-events-auto absolute inset-y-0 right-3 my-auto flex size-6 items-center justify-center rounded-full border border-orange-500 bg-orange-100 text-xs font-bold text-orange-600"
                      >
                        !
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      side="top"
                      align="end"
                      className="max-w-xs text-xs"
                    >
                      'Barratt' and 'David Wilson'{" "}
                      <span className="font-bold">winder</span> stairs must have
                      corner blocks on the back of the risers
                    </PopoverContent>
                  </Popover>
                )}
              </div>

              {isInvalid && (
                <FieldError
                  className="absolute bottom-0 translate-y-full pt-1 pr-2 text-xs font-bold"
                  errors={field.state.meta.errors}
                />
              )}
            </Field>
          );
        }}
      </form.AppField>
    );
  },
});

export { CustomerInput };
