import { NBAStatSet } from "../../src/nba/nbaStatSet.js";
import { StatProductionType } from "../../src/interfaces/FantasyStats.js";
import { NBAPlayerProjection } from "../../src/nba/nbaPlayerProjection.js";
import { YAHOO_NBA_DFS_STAT_MAP } from "../../src/nba/nbaFantasyStatValues.js";

describe("NBA Stat Set", () => {
    it("should store all stats that are passed in", () => {
        const fortyPiece = new NBAStatSet(StatProductionType.PROJECTED, {
            PTS: 40
        });

        const expected = {
            name: "PTS",
            value: 40,
            enabled: true
        }

        expect(fortyPiece.stats.get("PTS")).toStrictEqual(expected);
    });

    it("should throw an error if it receives a negative stat", () => {
        expect(() => {
            new NBAStatSet(StatProductionType.PROJECTED, {
                PTS: -10
            })
        }).toThrow(RangeError);
    });
});

describe("NBA Player Projection", () => {
    it("Should generate an exact fantasy output, given a stat set and stat map", () => {
        const westbrickSpecial = new NBAStatSet(StatProductionType.PROJECTED, {
            PTS: 16,
            REB: 11,
            AST: 12,
            STL: 1,
            BLK: 0,
            TOV: 8
        });

        const westbrickSpecialFantasyOutput = new NBAPlayerProjection(westbrickSpecial, YAHOO_NBA_DFS_STAT_MAP);
        expect(westbrickSpecialFantasyOutput).toBe(42.2);
    });
});
