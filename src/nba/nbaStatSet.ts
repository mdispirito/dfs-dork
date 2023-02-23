import { Stat, StatProduction, StatProductionType } from "../types/FantasyStats.js";

export class NBAStatSet {
    readonly productionType: StatProductionType
    readonly stats: Map<string, Stat>

    constructor(statProductionType: StatProductionType, statProduction: StatProduction) {
        this.productionType = statProductionType;
        this.stats = new Map<string, Stat>();

        for (const [statName, statValue] of Object.entries(statProduction)) {
            this.stats.set(statName, {name: statName, value: statValue, enabled: true})
        }
    }
}
