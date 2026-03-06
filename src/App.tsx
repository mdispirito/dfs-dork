import { useState, useCallback } from "react";
import { ContestList } from "./components/ContestList";
import { PlayerPool } from "./components/PlayerPool";
import { LineupOptimizer } from "./components/LineupOptimizer";
import { fetchPlayers } from "./api/client";
import type { Player } from "./types";

function App() {
  const [contestId, setContestId] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [excludedPlayers, setExcludedPlayers] = useState<Set<string>>(
    new Set()
  );
  const [lockedPlayers, setLockedPlayers] = useState<Set<string>>(new Set());

  const handleSelectContest = useCallback(async (id: string) => {
    setContestId(id);
    setExcludedPlayers(new Set());
    setLockedPlayers(new Set());
    try {
      const fetched = await fetchPlayers(id);
      setPlayers(fetched);
    } catch {
      setPlayers([]);
    }
  }, []);

  const toggleExclude = useCallback((name: string) => {
    setExcludedPlayers((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const toggleLock = useCallback((name: string) => {
    setLockedPlayers((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">DFS Dork</h1>

        {!contestId ? (
          <ContestList onSelectContest={handleSelectContest} />
        ) : (
          <div className="space-y-8">
            <button
              onClick={() => setContestId(null)}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              &larr; Back to contests
            </button>

            <LineupOptimizer
              players={players}
              excludedPlayers={excludedPlayers}
              lockedPlayers={lockedPlayers}
            />

            <PlayerPool
              contestId={contestId}
              excludedPlayers={excludedPlayers}
              lockedPlayers={lockedPlayers}
              onToggleExclude={toggleExclude}
              onToggleLock={toggleLock}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
