import { api } from "@/api";
import type { ApiError } from "@/api/client";
import { useQuery } from "@tanstack/react-query";

export function useOperators() {
  return useQuery<string[], ApiError>({
    queryKey: ["operators"],
    queryFn: () => api.operators.getAll(),
    // staleTime: 5 * 60 * 1000,
  });
}
