import z from "zod";

export const formSchema = z.object({
  customer: z.string().min(1),
  site: z.string().min(1),
});

export type FormSchema = z.infer<typeof formSchema>;
