import { PlayerProjection } from "./PlayerProjection.js"

export interface Player {
    id: number;
    firstName: string;
    lastName: string;
    team: string;
    position: string;
    salary: number;
    projection: PlayerProjection
}
