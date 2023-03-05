import { Model } from 'yalps';
import { Solution } from 'yalps';
import { solve } from 'yalps';

export interface NBADFSModelProps {
    objective: string,
    salaryLimit: number,
    maxAvailableRosterSpots: number,
    variables: Map<string, any>
}

export class NBADFSModel implements Model {
    direction: "maximize" | "minimize" | undefined = "maximize";
    objective: string;
    constraints: { salary: { max: number }, rosterSpot: { max: number } };
    variables: Map<string, any>;
    binaries: boolean = true;

    constructor(props: NBADFSModelProps) {
        this.objective = props.objective;
        this.variables = props.variables;
        this.constraints = {
            salary: { max: props.salaryLimit },
            rosterSpot: { max: props.maxAvailableRosterSpots }
        };
    }

    public getSolution(): Solution {
        return solve(this);
    }
}
