import { DEMO_MODE } from "@/AppConfig";
import type { AssemblySchema } from "@/features/assemblyForm/schema";
import { client, type ApiError } from "./client";
import { z } from "zod";

const operatorsResponseSchema = z.object({
  data: z.array(z.string()),
});

type OperatorsResponse = z.infer<typeof operatorsResponseSchema>;

type SubmitInput = {
  operator: string;
  bench: number;
  entry: AssemblySchema;
};

export const api = {
  assembly: {
    submit: async ({ operator, bench, entry }: SubmitInput) => {
      if (DEMO_MODE) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return;
      }

      const result = await client.post("/assembly/form", {
        operator,
        bench,
        ...entry,
      });
      if (result.isErr()) {
        throw result.error;
      }
    },
  },
  operators: {
    getAll: async () => {
      if (DEMO_MODE) {
        await new Promise((resolve) => setTimeout(resolve, 1_000));
        return [...DEMO_OPERATORS];
      }

      let result = await client.get<OperatorsResponse>("/operators");
      if (result.isErr()) {
        throw result.error;
      }

      const parsed = operatorsResponseSchema.safeParse(result.value);
      if (!parsed.success) {
        throw {
          type: "SchemaError" as const,
          status: 200,
          message: `Response from /operators had an unexpected shape: ${parsed.error}`,
          rawBody: result.value,
        } satisfies ApiError;
      }

      return parsed.data.data;
    },
  },
};

const DEMO_OPERATORS = [
  "Owen Henderson",
  "Jordon Roberts",
  "Thomas Hopkins",
  "Sadman Rafid",
  "Jermaine Arthur",
  "Kasper Grudzinski",
  "Adam Belc",
  "Steven Waldren",
  "Marian Dziemba",
  "Kyle Leighton",
  "Tristian Anderson",
  "Guntis Lapins",
  "Patrica Haidau",
  "Pawel Baryla",
  "BLAZEJ MROZINSKI",
  "Jake Spicer",
  "Kevin King",
  "Lukasz Wierzbicki",
  "Marcus",
  "Lewis",
] as const;
