import { clearSession, getToken } from "./auth";

const API_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD ? "/api" : "http://localhost:4000/api");

async function request(path, options = {}) {
  const token = getToken();
  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    });
  } catch {
    throw new Error(
      "Unable to reach the server. Start the API with `npm run dev:server` or `npm run dev:full`.",
    );
  }

  const payload = await response.json().catch(() => ({}));

  if (response.status === 401) {
    clearSession();
  }

  if (!response.ok) {
    throw new Error(payload.error ?? "Request failed.");
  }

  return payload;
}

export function signup(payload) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function login(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function submitInquiry(payload) {
  return request("/inquiries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getDashboardOverview() {
  return request("/dashboard/overview");
}

export function getCurrentUser() {
  return request("/auth/me");
}
