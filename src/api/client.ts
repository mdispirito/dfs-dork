import type { Contest, Player, OptimizeRequest } from "../types";

const API_BASE = "http://localhost:8080";

export async function fetchContests(): Promise<Contest[]> {
  const res = await fetch(`${API_BASE}/api/contests`);
  if (!res.ok) throw new Error("Failed to fetch contests");
  const data = await res.json();
  return data.contests?.result ?? [];
}

export async function fetchPlayers(contestId: string): Promise<Player[]> {
  const res = await fetch(`${API_BASE}/api/${contestId}/players`);
  if (!res.ok) throw new Error("Failed to fetch players");
  return res.json();
}

export async function optimizeLineups(
  request: OptimizeRequest
): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/optimized_lineup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!res.ok) throw new Error("Failed to optimize lineups");
  return res.json();
}
