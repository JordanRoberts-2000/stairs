import type {
  AssemblySchema,
  AssemblySchemaInput,
} from "./features/assemblyForm/schema";

export const DESIGNS = ["straight", "winder", "doubleWinder"] as const;

export const GOOGLE_DESIGN_VALUES: Record<AssemblySchema["design"], string> = {
  straight: "Straight",
  winder: "Winder",
  doubleWinder: "Double Winder",
};

export const TREADS_CONFIG = {
  straight: { options: [10, 11, 12], default: 12 },
  winder: { options: [3, 7, 8, 9], default: 8 },
  doubleWinder: { options: [4, 6], default: 4 },
} as const;

export const FORM_DEFAULTS = {
  customer: "",
  site: "",
  plot: "",
  wos: "",
  isOneTwo: false,
  design: "straight",
  treads: {
    kind: "preset",
    value: TREADS_CONFIG["straight"].default.toString(),
  },
} satisfies AssemblySchemaInput as AssemblySchemaInput;

export const OPERATORS = [
  // "Owen Henderson",
  "Jordon Roberts",
  // "Thomas Hopkins",
  "Sadman Rafid",
  // "Jermaine Arthur",
  // "Kasper Grudzinski",
  // "Adam Belc",
  // "Steven Waldren",
  // "Marian Dziemba",
  // "Kyle Leighton",
  // "Tristian Anderson",
  // "Guntis Lapins",
  // "Patrica Haidau",
  // "Pawel Baryla",
  // "BLAZEJ MROZINSKI",
  // "Jake Spicer",
  // "Kevin King",
  // "Lukasz Wierzbicki",
  // "Marcus",
  // "Lewis",
] as const;

export const BENCH_NUMBERS = new Set(
  Array.from({ length: 12 }, (_, i) => i + 1),
);

export const RESET_TIME = 9 * 60 * 60 * 1000;
