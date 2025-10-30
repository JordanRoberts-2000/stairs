import z, { ZodType } from "zod";

function nullableInput<TSchema extends ZodType>(schema: TSchema) {
  return schema.nullable().transform((value, ctx) => {
    if (value === null) {
      ctx.addIssue({
        code: "invalid_type",
        expected: schema._zod.def.type,
        input: null,
      });
      return z.NEVER;
    }
    return value;
  });
}

export const formSchema = z.object({
  customer: z.string().min(1),
  site: z.string().min(1),
  plot: nullableInput(z.number().positive()),
  stairType: z.enum(["straight", "winder", "doubleWinder"]),
  treads: nullableInput(z.number().positive().max(20)),
  width: nullableInput(z.number().positive().max(1500)),
});

export type FormSchema = z.infer<typeof formSchema>;
export type FormSchemaInput = z.input<typeof formSchema>;
