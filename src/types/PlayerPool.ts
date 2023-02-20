import { Player } from "./Player.js";

export type PlayerPool = {
    availablePlayers: Map<number, Player>;
}
