import { useEffect, useState } from "react";
import { fetchAuthStatus, logout, getLoginUrl } from "../api/client";
import type { AuthStatus } from "../types";

export function Header() {
  const [auth, setAuth] = useState<AuthStatus>({ authenticated: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthStatus()
      .then(setAuth)
      .catch(() => setAuth({ authenticated: false }))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    setAuth({ authenticated: false });
  };

  return (
    <header className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold">DFS Dork</h1>
      <div className="flex items-center gap-3">
        {loading ? (
          <span className="text-sm text-gray-500">...</span>
        ) : auth.authenticated ? (
          <>
            <span className="text-sm text-gray-400">
              {auth.user?.name ?? "Signed in"}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded text-sm bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors"
            >
              Sign Out
            </button>
          </>
        ) : (
          <a
            href={getLoginUrl()}
            className="px-3 py-1.5 rounded text-sm bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Sign in with Yahoo
          </a>
        )}
      </div>
    </header>
  );
}
