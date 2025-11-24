const API_BASE_URL = "/api";

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message || `HTTP ${response.status}: ${response.statusText}`,
    );
  }
  if (response.status === 204 || response.status === 205) {
    return;
  }

  return response.json();
}

type FetchOptions = {
  headers?: HeadersInit;
  init?: Omit<RequestInit, "method" | "body" | "headers">;
};

export const api = {
  async post<T>(endpoint: string, data: T, options?: FetchOptions) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: JSON.stringify(data),
      ...options?.init,
    });
    return handleResponse(response);
  },

  async get(endpoint: string, options?: FetchOptions) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options?.init,
    });
    return handleResponse(response);
  },
};
