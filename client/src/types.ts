import type { AssemblySchema } from "./features/assemblyForm/schema";

export type Entry = AssemblySchema & {
  timestamp: string;
};

export type OperatorProfile = {
  target?: number;
  history: Entry[];
  autoClearHistory: boolean;
  autoComplete: boolean;
  darkMode: boolean;
};
