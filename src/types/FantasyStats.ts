
export enum StatProductionType {
    ACTUAL,
    PROJECTED
}

export type Stat = {
    name: string,
    value: number,
    enabled: boolean
}

export type StatProduction = {
    // the intention is that this is extended down the road with more stats
    PTS? : number,      // points
    REB? : number,      // rebounds
    AST? : number,      // assists
    STL? : number,      // steals
    BLK? : number,      // blocks
    TOV? : number       // turnovers
}

export type FantasyStatValueMap = {
    [index: string]: number | undefined

    // maps a real life statistic to its fantasy value
    PTS? : number,
    REB? : number,
    AST? : number,
    STL? : number,
    BLK? : number,
    TOV? : number
}
