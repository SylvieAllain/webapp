import respond = require("./Respond");
import answer = require("./Answer");
export class Question implements respond.Respond {
    private question: string;
    private possibilities: answer.Answer[];
    constructor(question: string, path: number, ...possibilities: answer.Answer[]) {
        this.question = question;
        this.possibilities = possibilities;
    }

    displayRespond(): string {
        return this.question;
    }

    getPossibilities(): answer.Answer[] {
        return this.possibilities;
    }

    getPossibilityContent(possibility: answer.Answer): string {
        return possibility.getContent();
    }

    getPath(): number {
        return null;
    }

}