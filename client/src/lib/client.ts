import { DEMO_MODE } from "@/AppConfig";
import { api } from "./api";
import { OPERATORS } from "@/constants";
import type { Operator } from "@/types";
import type { AssemblySchema } from "@/features/assemblyForm/schema";

type SubmitInput = {
  operator: Operator;
  bench: number;
  entry: AssemblySchema;
};

export const client = {
  assembly: {
    submit: async ({ operator, bench, entry }: SubmitInput) => {
      if (DEMO_MODE) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return;
      }

      await api.post("/assembly", { operator, bench, ...entry });
    },
  },
  operators: {
    getAll: async () => {
      if (DEMO_MODE) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return [...OPERATORS];
      }
    },
  },
};
