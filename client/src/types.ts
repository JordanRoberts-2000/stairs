import type { OPERATORS } from "./constants";
import type { AssemblySchema } from "./features/assemblyForm/schema";

export type Operator = (typeof OPERATORS)[number];

export type Entry = AssemblySchema & {
  timestamp: string;
};

export type OperatorProfile = {
  target?: number;
  history: Entry[];
  autoClearHistory: boolean;
  darkMode: boolean;
};
