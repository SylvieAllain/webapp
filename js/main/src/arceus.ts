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
    private storyIndex: number;
    private hintsFound: number = 0;
    constructor(choices: Choice[][], contexts: Context[], storyIndex:number) {
        this.choices = choices;
        this.contexts = contexts;
        this.currentContextIndex = 0;
        this.currentChoicesIndex = 0;
        this.storyIndex = storyIndex;
    }

    setChoices(userIndex: number): void {
        var currentChoices: Choice[] = this.choices[this.currentChoicesIndex];
        var userChoice: Choice = currentChoices[userIndex];
        this.removePoints(userChoice.getPoints());
        this.setContext(userChoice);
        var context = this.contexts[this.currentContextIndex];
        this.currentChoicesIndex = userChoice.getNextChoices();
        switch (this.storyIndex) {
            case 1:
                if (context.isHint() == true) {
                    this.hintsFound++;
                    if (this.hintsFound == 3) {
                        this.currentContextIndex = 11;
                        this.currentChoicesIndex = 5;
                    }
                }
                break;
            default:
                break;
            }
        if (this.isThisAnEnding()) {
            this.displayEnding();
            this.reset();
        }
        else {
            this.displayContent();
        }
    }

    getCurrentContextIndex() {
        return this.currentContextIndex;
    }

    getChoices(): Choice[] {
        return this.choices[this.currentChoicesIndex];
    }

    getPreviousContext(): number {
        var context: Context = this.contexts[this.currentContextIndex];
        return context.getPrevious();
    }
    getPreviousChoices(): number {
        var choices: Choice[] = this.choices[this.currentChoicesIndex];
        var choice: Choice = choices[0];
        return choice.getPrevious();
    }
    setContext(userChoice: Choice): void {
        this.currentContextIndex = userChoice.getNextContext();
    }

    getBack() {
        this.currentContextIndex = this.getPreviousContext();
        this.currentChoicesIndex = this.getPreviousChoices();
        this.displayContent();
    }

    displayEnding(): void {
        var ending: string = this.contexts[this.currentContextIndex].getContext();
        document.getElementById("mainContext").innerHTML = ending;
    }

    displayContent():void {
        this.displayContext();
        this.displayChoices();
    }

    displayContext():void {
        var context: Context = this.contexts[this.currentContextIndex];
        var space = document.createElement("p");
        space.setAttribute("id", "mainContext");
        space.innerHTML = context.getContext();
        document.body.appendChild(space);
    }

    displayChoices():void {
        var choices: Choice[] = this.choices[this.currentChoicesIndex];
        var i: number = 0;
        var self = this;
        choices.forEach(function (element,i) {
            var button = document.createElement("button");
            button.setAttribute("class", "choiceButton");
            button.textContent = element.getChoice();
            button.onclick = function () {
                self.setChoices(i);
            }
            i++;
            document.body.appendChild(button);
        });
        var button = document.createElement("button");
        button.setAttribute("id", "goBack");
        button.onclick = function () {
            self.setChoices(10);
        }
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

    getPoints():number {
        return this.points;
    }

    reset():void {
        this.points = Arceus.STARTING_POINTS;
        var self = this;
        var restartButton = document.createElement("button");
        restartButton.textContent = "Next";
        restartButton.onclick = function () {
            window.location.reload();
            //self.start(self.initialContextIndex, self.initialChoicesIndex);
        }
    }
    
    start(contextIndex: number, choicesIndex: number):void {
        this.initialContextIndex = contextIndex;
        this.initialChoicesIndex = choicesIndex;
        this.displayContent();
    }
}