
export const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export const safeFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers: defaultHeaders,
    credentials: "include",
  });

  const text = await response.text();
  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(
      `Server returned an invalid response (${response.status}). If using Render free tier, the backend may be waking up.`,
    );
  }

  if (!response.ok || data.error) {
    throw new Error(
      data.error || data.message || `Request failed (${response.status})`,
    );
  }

  return data;
};
