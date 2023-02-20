import { PlayerProjection } from "../types/PlayerProjection.js";
import { NBAStatSet } from "./nbaStatSet.js";
import { FantasyStatValueMap } from "../types/FantasyStats.js";
import { StatProductionType } from "../types/FantasyStats.js";

export class NBAPlayerProjection implements PlayerProjection {
    fantasyPoints: number;

    constructor(statProjection: NBAStatSet, statValueMap: FantasyStatValueMap) {

        if (statProjection.productionType === StatProductionType.ACTUAL) {
            throw new Error('Player projection must be based on projected stats, not actual production.')
        }

        this.fantasyPoints = this.getProjectedFantasyPoints(statProjection, statValueMap);
    }

    public getProjectedFantasyPoints(statProjection: NBAStatSet, statValueMap: FantasyStatValueMap): number {
        let totalFantasyPoints: number = 0;

        for (const [key, stat] of statProjection.stats) {
            if (stat.enabled) totalFantasyPoints += stat.value * (statValueMap[key] ?? 0);
        }

        return totalFantasyPoints;
    }
}
