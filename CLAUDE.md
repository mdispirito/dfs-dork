# DFS Dork

## Overview
React + TypeScript frontend for the dfs-dork-optimizer Flask API.
Built with Vite and Tailwind CSS.

## Setup
- Package manager: **yarn**
- Install deps: `yarn`
- Dev server: `yarn dev` (starts on port 5173)
- Build: `yarn build`

## Project Structure
```
src/
  api/client.ts         # API client for dfs-dork-optimizer (localhost:8080)
  components/
    ContestList.tsx      # Contest selection view
    PlayerPool.tsx       # Player table with lock/exclude controls
    LineupOptimizer.tsx  # Optimization controls and results display
  types/index.ts        # TypeScript interfaces
  App.tsx               # Main app with view routing
```

## API Dependency
Requires dfs-dork-optimizer running on localhost:8080.
See ../dfs-dork-optimizer for backend setup.
