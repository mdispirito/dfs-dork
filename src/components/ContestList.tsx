import { useEffect, useState } from "react";
import { fetchContests } from "../api/client";
import type { Contest } from "../types";

interface Props {
  onSelectContest: (contestId: string) => void;
}

export function ContestList({ onSelectContest }: Props) {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContests()
      .then(setContests)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400">Loading contests...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;
  if (contests.length === 0) return <p className="text-gray-400">No contests available.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Select a Contest</h2>
      <div className="space-y-2">
        {contests.map((contest) => (
          <button
            key={contest.contest_id}
            onClick={() => onSelectContest(contest.contest_id)}
            className="w-full text-left p-3 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-gray-800 transition-colors"
          >
            <div className="font-medium">{contest.title}</div>
            <div className="text-sm text-gray-400">
              Entry: ${contest.entry_fee} · Prize Pool: ${contest.prize_pool?.toLocaleString()} · {contest.entries}/{contest.max_entries} entries
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
