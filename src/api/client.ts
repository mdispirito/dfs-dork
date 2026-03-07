import type { Contest, Player, OptimizeRequest, AuthStatus } from "../types";

const API_BASE = "https://localhost:8080";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...init,
  });
  if (!res.ok) throw new Error(`Request failed: ${path}`);
  return res.json();
}

export async function fetchContests(): Promise<Contest[]> {
  const data = await apiFetch<{ contests?: { result?: Contest[] } }>(
    "/api/contests"
  );
  return data.contests?.result ?? [];
}

export async function fetchPlayers(contestId: string): Promise<Player[]> {
  return apiFetch(`/api/${contestId}/players`);
}

export async function optimizeLineups(
  request: OptimizeRequest
): Promise<string[]> {
  return apiFetch("/api/optimized_lineup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
}

export async function fetchAuthStatus(): Promise<AuthStatus> {
  return apiFetch("/auth/status");
}

export async function logout(): Promise<void> {
  await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export function getLoginUrl(): string {
  return `${API_BASE}/auth/yahoo`;
}
