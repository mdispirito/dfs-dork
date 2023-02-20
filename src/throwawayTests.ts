import { NBAPlayerProjection } from "./nba/nbaPlayerProjection.js";
import { NBAStatSet } from "./nba/nbaStatSet.js";
import { StatProductionType } from "./types/FantasyStats.js";
import { YAHOO_NBA_DFS_STAT_MAP } from "./nba/nbaFantasyStatValues.js";

/**
    not real tests, just quickly making sure classes work as expected
 */

// some thing comes up with projected stats, we use them to create a projected StatSet
const westbrickSpecial = new NBAStatSet(StatProductionType.PROJECTED, {
    PTS: 12,
    REB: 12,
    AST: 12
});

console.log(westbrickSpecial.stats)

// we pass a projected StatSet to a PlayerProjection to come up with projected fantasy value
const westbrickSpecialFantasyOutput = new NBAPlayerProjection(westbrickSpecial, YAHOO_NBA_DFS_STAT_MAP);

console.log(`projected fantasy points: ${westbrickSpecialFantasyOutput.fantasyPoints}`);
