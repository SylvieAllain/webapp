"use strict";
exports.__esModule = true;
var Arceus = /** @class */ (function () {
    function Arceus(choices, contexts, storyIndex) {
        this.initialContextIndex = 0;
        this.initialChoicesIndex = 0;
        this.choices = [];
        this.contexts = [];
        this.points = Arceus.STARTING_POINTS;
        this.hintsFound = 0;
        this.choices = choices;
        this.contexts = contexts;
        this.currentContextIndex = 0;
        this.currentChoicesIndex = 0;
        this.storyIndex = storyIndex;
    }
    Arceus.prototype.setChoices = function (userIndex) {
        if (userIndex == 10) {
            this.currentContextIndex = this.getPreviousContext();
            this.currentChoicesIndex = this.getPreviousChoices();
        }
        else {
            var currentChoices = this.choices[this.currentChoicesIndex];
            var userChoice = currentChoices[userIndex];
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
        }
        if (this.isThisAnEnding()) {
            this.displayEnding();
            this.reset();
        }
        else {
            this.displayContent();
        }
    };
    Arceus.prototype.getChoices = function () {
        return this.choices[this.currentChoicesIndex];
    };
    Arceus.prototype.getPreviousContext = function () {
        var context = this.contexts[this.currentContextIndex];
        return context.getPrevious();
    };
    Arceus.prototype.getPreviousChoices = function () {
        var choices = this.choices[this.currentChoicesIndex];
        var choice = choices[0];
        return choice.getPrevious();
    };
    Arceus.prototype.setContext = function (userChoice) {
        this.currentContextIndex = userChoice.getNextContext();
    };
    Arceus.prototype.displayEnding = function () {
        var ending = this.contexts[this.currentContextIndex].getContext();
        document.getElementById("mainContext").innerHTML = ending;
    };
    Arceus.prototype.displayContent = function () {
        this.displayContext();
        this.displayChoices();
    };
    Arceus.prototype.displayContext = function () {
        var context = this.contexts[this.currentContextIndex];
        var space = document.createElement("p");
        space.setAttribute("id", "mainContext");
        space.innerHTML = context.getContext();
        document.body.appendChild(space);
    };
    Arceus.prototype.displayChoices = function () {
        var choices = this.choices[this.currentChoicesIndex];
        var i = 0;
        var self = this;
        choices.forEach(function (element, i) {
            var button = document.createElement("button");
            button.setAttribute("class", "choiceButton");
            button.textContent = element.getChoice();
            button.onclick = function () {
                self.setChoices(i);
            };
            i++;
            document.body.appendChild(button);
        });
        var button = document.createElement("button");
        button.setAttribute("id", "goBack");
        button.onclick = function () {
            self.setChoices(10);
        };
    };
    Arceus.prototype.isThisAnEnding = function () {
        return this.contexts[this.currentContextIndex].isEnd();
    };
    Arceus.prototype.getContext = function (contextIndex) {
        var index = contextIndex;
        console.log(index);
        return this.contexts[index].getContext();
    };
    Arceus.prototype.removePoints = function (amount) {
        this.points = this.points - amount;
        return this.points;
    };
    Arceus.prototype.getPoints = function () {
        return this.points;
    };
    Arceus.prototype.reset = function () {
        this.points = Arceus.STARTING_POINTS;
        var self = this;
        var restartButton = document.createElement("button");
        restartButton.textContent = "Next";
        restartButton.onclick = function () {
            window.location.reload();
            //self.start(self.initialContextIndex, self.initialChoicesIndex);
        };
    };
    Arceus.prototype.start = function (contextIndex, choicesIndex) {
        this.initialContextIndex = contextIndex;
        this.initialChoicesIndex = choicesIndex;
        this.displayContent();
    };
    Arceus.STARTING_POINTS = 500;
    return Arceus;
}());
exports.Arceus = Arceus;
