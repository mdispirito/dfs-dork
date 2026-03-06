import { useState } from "react";
import { optimizeLineups } from "../api/client";
import type { Player } from "../types";

interface Props {
  players: Player[];
  excludedPlayers: Set<string>;
  lockedPlayers: Set<string>;
}

export function LineupOptimizer({
  players,
  excludedPlayers,
  lockedPlayers,
}: Props) {
  const [numLineups, setNumLineups] = useState(1);
  const [useProjections, setUseProjections] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await optimizeLineups({
        player_pool: players,
        lineups: numLineups,
        load_external_projections: useProjections,
        excluded_players: Array.from(excludedPlayers),
        locked_players: Array.from(lockedPlayers),
      });
      setResults(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Optimization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Optimize Lineups</h2>
      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2">
          <span className="text-sm text-gray-400"># Lineups:</span>
          <input
            type="number"
            min={1}
            max={20}
            value={numLineups}
            onChange={(e) => setNumLineups(Number(e.target.value))}
            className="w-16 px-2 py-1 rounded bg-gray-800 border border-gray-700 text-sm"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-400">
          <input
            type="checkbox"
            checked={useProjections}
            onChange={(e) => setUseProjections(e.target.checked)}
            className="rounded"
          />
          Use external projections
        </label>
        <button
          onClick={handleOptimize}
          disabled={loading || players.length === 0}
          className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
        >
          {loading ? "Optimizing..." : "Optimize"}
        </button>
      </div>

      {error && <p className="text-red-400 mb-3">Error: {error}</p>}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((lineup, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-gray-800 border border-gray-700"
            >
              <h3 className="text-sm font-semibold text-gray-400 mb-1">
                Lineup {i + 1}
              </h3>
              <pre className="text-sm whitespace-pre-wrap">{lineup}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
