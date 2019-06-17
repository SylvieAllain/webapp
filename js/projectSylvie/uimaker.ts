import { Context } from "./context";
import { Choice } from "./choices";
import { Arceus } from "./arceus";

export class UIMaker {

    displayEnding(contexts:Context[],currentContext:number): void {
        var ending: string = contexts[currentContext].getContext();
        document.getElementById("mainContext").innerHTML = ending;
    }

    displayContent(arceus:Arceus,contexts:Context[],currentContext:number, choices:Choice[][],currentChoices:number): void {
        this.displayContext(contexts,currentContext);
        this.displayChoices(arceus,choices,currentChoices);
    }

    displayContext(contexts:Context[], currentContext:number): void {
        var context: Context = contexts[currentContext];
        var space = document.createElement("p");
        space.setAttribute("id", "mainContext");
        space.innerHTML = context.getContext();
        document.body.appendChild(space);
    }

    displayChoices(arceus:Arceus, choices:Choice[][],currentChoices:number): void {
        var displayedChoices: Choice[] = choices[currentChoices];
        var i: number = 0;
        var self = this;
        displayedChoices.forEach(function (element, i) {
            var button = document.createElement("button");
            button.setAttribute("class", "choiceButton");
            button.textContent = element.getChoice();
            button.onclick = function () {
                arceus.setChoices(i);
            }
            i++;
            document.body.appendChild(button);
        });
        var button = document.createElement("button");
        button.setAttribute("id", "goBack");
        button.onclick = function () {
            arceus.setChoices(10);
        }
    }
}