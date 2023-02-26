import { parse } from 'csv-parse/sync';
import { promises as fs } from 'fs';

export class CsvParser {

    public static async parseCSV(filePath: string): Promise<any> {
        const content = await fs.readFile(filePath);

        // TODO - make parser settings overridable
        return parse(content, {
            columns: true,
            skip_empty_lines: true
        });
    }
}
