import { IPlayer } from "./IPlayer.js"

export interface IPlayerPool {
    availablePlayers: Map<number, IPlayer>;
}
