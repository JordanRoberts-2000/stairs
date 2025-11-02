import z from "zod";
import { DESIGNS } from "./constants";

const FormInputNumber = (
  additionalValidations?: (schema: z.ZodNumber) => z.ZodNumber
) => {
  const baseSchema = z
    .string()
    .trim()
    .nonempty("required")
    .pipe(z.coerce.number());

  return additionalValidations
    ? baseSchema.pipe(additionalValidations(z.number()))
    : baseSchema;
};

export const formSchema = z.object({
  customer: z.string().nonempty("required"),
  site: z.string().nonempty("required"),
  plot: FormInputNumber((n) => n.positive()),
  wos: FormInputNumber((n) => n.positive().max(1500)),
  design: z.enum(DESIGNS),
  treads: FormInputNumber((n) => n.positive().max(20)),
});

export type FormSchema = z.infer<typeof formSchema>;
export type FormSchemaInput = z.input<typeof formSchema>;
