import { useEffect, useState } from "react";
import { fetchPlayers } from "../api/client";
import type { Player } from "../types";

interface Props {
  contestId: string;
  excludedPlayers: Set<string>;
  lockedPlayers: Set<string>;
  onToggleExclude: (name: string) => void;
  onToggleLock: (name: string) => void;
}

function playerName(p: Player) {
  return `${p.firstName} ${p.lastName}`;
}

export function PlayerPool({
  contestId,
  excludedPlayers,
  lockedPlayers,
  onToggleExclude,
  onToggleLock,
}: Props) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchPlayers(contestId)
      .then(setPlayers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [contestId]);

  if (loading) return <p className="text-gray-400">Loading players...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">
        Player Pool ({players.length} players)
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-left text-gray-400">
              <th className="pb-2 pr-4">Player</th>
              <th className="pb-2 pr-4">Pos</th>
              <th className="pb-2 pr-4">Team</th>
              <th className="pb-2 pr-4 text-right">Salary</th>
              <th className="pb-2 pr-4 text-right">FPPG</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => {
              const name = playerName(player);
              const isExcluded = excludedPlayers.has(name);
              const isLocked = lockedPlayers.has(name);

              return (
                <tr
                  key={name}
                  className={`border-b border-gray-800 ${isExcluded ? "opacity-40" : ""}`}
                >
                  <td className="py-2 pr-4 font-medium">{name}</td>
                  <td className="py-2 pr-4 text-gray-400">
                    {player.eligiblePositions?.join("/")}
                  </td>
                  <td className="py-2 pr-4 text-gray-400">{player.teamAbbr}</td>
                  <td className="py-2 pr-4 text-right">
                    ${player.salary?.toLocaleString()}
                  </td>
                  <td className="py-2 pr-4 text-right">
                    {player.fantasyPointsPerGame?.toFixed(1)}
                  </td>
                  <td className="py-2 space-x-2">
                    <button
                      onClick={() => onToggleLock(name)}
                      className={`px-2 py-0.5 rounded text-xs ${
                        isLocked
                          ? "bg-green-700 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                      disabled={isExcluded}
                    >
                      {isLocked ? "Locked" : "Lock"}
                    </button>
                    <button
                      onClick={() => onToggleExclude(name)}
                      className={`px-2 py-0.5 rounded text-xs ${
                        isExcluded
                          ? "bg-red-700 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                      disabled={isLocked}
                    >
                      {isExcluded ? "Excluded" : "Exclude"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
