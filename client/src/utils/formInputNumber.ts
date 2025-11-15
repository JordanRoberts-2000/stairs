import z from "zod";

export const FormInputNumber = (
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
