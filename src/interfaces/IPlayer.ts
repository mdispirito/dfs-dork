import { IPlayerProjection } from "./IPlayerProjection.js"

export interface IPlayer {
    id: number,
    firstName: string,
    lastName: string,
    team: string,
    position: string
    salary: number
    projection: IPlayerProjection
}
