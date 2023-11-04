import { CsvParser } from './parsers/csvParser.js'
import { NBADFSModel } from './models/NBADFSModel.js';
import { NBAStatSet } from './nba/nbaStatSet.js';
import { StatProductionType } from './interfaces/FantasyStats.js';
import { NBAPlayerProjection } from './nba/nbaPlayerProjection.js';
import { YAHOO_NBA_DFS_STAT_MAP } from './nba/nbaFantasyStatValues.js';
import { Player } from './interfaces/Player.js';

const filePath: string = '/Users/marcodispirito/Downloads/Export_2023_03_05.csv';

const records = await CsvParser.parseCSV(filePath);

// console.log(records);

let modelVariables = new Map<string, Player>();

for (const record of records) {
    record.full_name = record.first_name + "_" + record.last_name;
    record.rosterSpot = 1;
    
    const projected_stats = new NBAStatSet(StatProductionType.PROJECTED, {
        PTS: record.points,
        REB: record.rebounds,
        AST: record.assists,
        STL: record.steals,
        BLK: record.blocks,
        TOV: record.turnovers
    });

    record.fantasy_points = new NBAPlayerProjection(projected_stats, YAHOO_NBA_DFS_STAT_MAP).fantasyPoints;
    modelVariables.set(record.full_name, record);
}

const model = new NBADFSModel({
    objective: "fantasy_points",
    salaryLimit: 200,
    maxAvailableRosterSpots: 8,
    variables: modelVariables
})

console.log(model.getSolution())
