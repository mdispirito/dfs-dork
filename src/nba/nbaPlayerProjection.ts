import { PlayerProjection } from "../interfaces/PlayerProjection.js";
import { NBAStatSet } from "./nbaStatSet.js";
import { FantasyStatValueMap } from "../interfaces/FantasyStats.js";
import { StatProductionType } from "../interfaces/FantasyStats.js";

export class NBAPlayerProjection implements PlayerProjection {
    readonly fantasyPoints: number;

    constructor(statProjection: NBAStatSet, statValueMap: FantasyStatValueMap) {

        if (statProjection.productionType === StatProductionType.ACTUAL) {
            throw new Error('Player projection must be based on projected stats, not actual production.')
        }

        this.fantasyPoints = this.getProjectedFantasyPoints(statProjection, statValueMap);
    }

    private getProjectedFantasyPoints(statProjection: NBAStatSet, statValueMap: FantasyStatValueMap): number {
        let totalFantasyPoints: number = 0;

        for (const [key, stat] of statProjection.stats) {
            if (stat.enabled) totalFantasyPoints += stat.value * (statValueMap[key] ?? 0);
        }

        return totalFantasyPoints;
    }
}
