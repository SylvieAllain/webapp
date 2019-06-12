import answer = require("./Answer");
export interface Respond {
    displayRespond(): string;

    getPossibilities(): answer.Answer[];
    getPath(): number;
}