import { Player } from "./Player.js";

export interface PlayerPool {
    availablePlayers: Map<number, Player>;
}
