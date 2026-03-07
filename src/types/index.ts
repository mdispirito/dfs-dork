export interface Contest {
  contest_id: string;
  title: string;
  sport: string;
  entry_fee: number;
  prize_pool: number;
  entries: number;
  max_entries: number;
}

export interface Player {
  firstName: string;
  lastName: string;
  teamAbbr: string;
  eligiblePositions: string[];
  salary: number;
  fantasyPointsPerGame: number;
}

export interface OptimizeRequest {
  player_pool: Player[];
  lineups: number;
  load_external_projections: boolean;
  force_refresh_projections?: boolean;
  excluded_players: string[];
  locked_players: string[];
}

export interface AuthStatus {
  authenticated: boolean;
  user?: {
    name?: string;
    email?: string;
    sub?: string;
  };
}
