import type { FormSchemaInput } from "@/features/form/schema";

export const DESIGNS = ["straight", "winder", "doubleWinder"] as const;

export const TREADS_CONFIG = {
  straight: { options: [10, 11, 12], default: 12 },
  winder: { options: [7, 8, 9], default: 8 },
  doubleWinder: { options: [3, 4, 6], default: 4 },
} as const;

export const FORM_DEFAULTS = {
  customer: "",
  site: "",
  plot: "",
  wos: "",
  design: "straight",
  treads: TREADS_CONFIG["straight"].default.toString(),
} satisfies FormSchemaInput as FormSchemaInput;
