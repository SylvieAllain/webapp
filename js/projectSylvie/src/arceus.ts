import { Choice } from "./choices";
import { Context } from "./context";

export class Arceus {
    static readonly STARTING_POINTS: number = 500;
    private initialContextIndex: number = 0;
    private initialChoicesIndex: number = 0;
    private choices: Choice[][] = [];
    private contexts: Context[] = [];
    private points: number = Arceus.STARTING_POINTS;
    private currentContextIndex: number;
    private currentChoicesIndex: number;
    constructor(choices: Choice[][], contexts: Context[]) {
        this.choices = choices;
        this.contexts = contexts;
        this.currentContextIndex = 0;
        this.currentChoicesIndex = 0;
    }

    setChoices(userIndex: number): void {
        var currentChoices: Choice[] = this.choices[this.currentChoicesIndex];
        var userChoice: Choice = currentChoices[userIndex];
        this.removePoints(userChoice.getPoints());
        this.setContext(userChoice);
        this.currentChoicesIndex = userChoice.getNextChoices();
        /*if (this.isThisAnEnding()) {
            this.reset();
        }
        else {
            this.nextNode();
        }*/
    }

    getChoices(): Choice[] {
        return this.choices[this.currentChoicesIndex];
    }

    getPreviousContext():number {
        var context: Context = this.contexts[this.currentContextIndex];
        return context.getPrevious();
    }
    setContext(userChoice: Choice): void {
        this.currentContextIndex = userChoice.getNextContext();
    }

    getCurrentContextIndex() {
        return this.currentContextIndex;
    }

    getCurrentChoicesIndex() {
        return this.currentChoicesIndex;
    }

    nextNode() {
        console.log(this.getContext(this.currentContextIndex));
        let currentChoices = this.choices[this.currentContextIndex];
        currentChoices.forEach(function (choice, i) {
            console.log((i + 1) + ". " + choice.getChoice());
        });
    }

    isThisAnEnding(): boolean {
        return this.contexts[this.currentContextIndex].isEnd();
    }

    getContext(contextIndex: number): string {
        var index = contextIndex;
        console.log(index);
        return this.contexts[index].getContext();
    }

    removePoints(amount: number) {
        this.points = this.points - amount;
        return this.points;
    }

    getPoints() {
        return this.points;
    }

    reset() {
        this.points = Arceus.STARTING_POINTS;
        this.contexts[this.initialContextIndex];
        this.choices[this.initialChoicesIndex];
    }
    
    start(contextIndex: number, choicesIndex: number) {
        this.initialContextIndex = contextIndex;
        this.initialChoicesIndex = choicesIndex;
        this.nextNode();
    }
}