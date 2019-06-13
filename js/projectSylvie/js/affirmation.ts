import respond = require("./Respond");
import answer = require("./Answer");
export class Affirmation implements respond.Respond {
    private affirmation: string;
    private path: number;
    constructor(affirmation: string, path: number) {
        this.affirmation = affirmation;
        this.path = path;
    }

    displayRespond(): string {
        return this.affirmation;
    }

    getPath(): number {
        return this.path;
    }

    getPossibilities(): answer.Answer[] {
        return null;
    }
}