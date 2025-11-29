import { Result, ok, err } from "neverthrow";

const API_BASE_URL = "/api";

export type ApiErrorType =
  | "HttpError"
  | "NonJsonError"
  | "ParseError"
  | "SchemaError";

export type ApiError = {
  type: ApiErrorType;
  status: number;
  message: string;
  rawBody?: unknown;
};

async function handleResponse<T = unknown>(
  response: Response,
): Promise<Result<T | void, ApiError>> {
  if (!response.ok) {
    return err({
      type: "HttpError",
      status: response.status,
      message: `HTTP ${response.status}: ${response.statusText}`,
    });
  }

  if (response.status === 204 || response.status === 205) {
    return ok(undefined);
  }

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.toLowerCase().includes("application/json");

  if (!isJson) {
    const text = await response.text().catch(() => "");
    return err({
      type: "NonJsonError",
      status: response.status,
      message:
        text ||
        `Expected JSON but received ${contentType || "unknown content-type"}`,
      rawBody: text,
    });
  }

  const parsed = await response.json().catch(() => undefined);
  if (parsed === undefined)
    return err({
      type: "ParseError",
      status: response.status,
      message: "Failed to parse JSON response body",
    });

  return ok(parsed as T);
}

export const client = {
  async post<TBody, TResponse = unknown>(
    endpoint: string,
    body: TBody,
    options?: RequestInit,
  ): Promise<Result<TResponse | void, ApiError>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        body: JSON.stringify(body),
        ...options,
      });

      return handleResponse<TResponse>(response);
    } catch {
      return err({
        type: "HttpError",
        status: 0,
        message: "Network error while contacting server",
      });
    }
  },

  async get<TResponse = unknown>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<Result<TResponse | void, ApiError>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });

      return handleResponse<TResponse>(response);
    } catch {
      return err({
        type: "HttpError",
        status: 0,
        message: "Network error while contacting server",
      });
    }
  },
};
