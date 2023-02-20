import { PlayerProjection } from "./PlayerProjection.js"

export type Player = {
    id: number,
    firstName: string,
    lastName: string,
    team: string,
    position: string
    salary: number
    projection: PlayerProjection
}
