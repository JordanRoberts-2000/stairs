import z from "zod";
import { DESIGNS } from "./constants";

const FormInputNumber = (
  additionalValidations?: (schema: z.ZodNumber) => z.ZodNumber
) => {
  const baseSchema = z
    .string()
    .trim()
    .nonempty("Required")
    .pipe(z.coerce.number("Needs to be a number"));

  return additionalValidations
    ? baseSchema.pipe(additionalValidations(z.number()))
    : baseSchema;
};

const treadSchema = z
  .discriminatedUnion("kind", [
    z.object({
      kind: z.literal("preset"),
      value: FormInputNumber((n) =>
        n
          .int("Invalid tread number")
          .min(1, "Invalid tread number")
          .max(20, "Tread limit exceeded")
      ),
    }),
    z.object({
      kind: z.literal("custom"),
      value: FormInputNumber((n) =>
        n
          .int("Invalid tread number")
          .min(1, "Invalid tread number")
          .max(20, "Tread limit exceeded")
      ),
    }),
  ])
  .transform((v) => v.value);

export const formSchema = z.object({
  customer: z.string().nonempty("Required"),
  site: z.string().nonempty("Required"),
  plot: FormInputNumber((n) => n.int("Invalid number")),
  wos: FormInputNumber((n) =>
    n
      .int("Invalid number")
      .min(700, "Width too small")
      .max(1500, "Width too large")
  ),
  design: z.enum(DESIGNS),
  treads: treadSchema,
});

export type FormSchema = z.infer<typeof formSchema>;
export type FormSchemaInput = z.input<typeof formSchema>;
