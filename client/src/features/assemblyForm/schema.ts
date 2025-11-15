import z from "zod";
import { DESIGNS } from "../../constants";
import { FormInputNumber } from "@/utils/formInputNumber";

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

export const assemblySchema = z
  .object({
    customer: z.string().nonempty("Required"),
    site: z.string().nonempty("Required"),
    plot: FormInputNumber((n) => n.int("Invalid number")),
    isOneTwo: z.boolean(),
    wos: FormInputNumber((n) =>
      n
        .int("Invalid number")
        .min(700, "Width too small")
        .max(1500, "Width too large")
    ),
    design: z.enum(DESIGNS),
    treads: treadSchema,
  })
  .transform((data) => {
    const { isOneTwo, ...rest } = data;
    return {
      ...rest,
      plot: isOneTwo ? `${data.plot} 1/2` : `${data.plot}`,
    };
  });

export type AssemblySchema = z.infer<typeof assemblySchema>;
export type AssemblySchemaInput = z.input<typeof assemblySchema>;
