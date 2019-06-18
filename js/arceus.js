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
            case 4:
                if (context.isHint() == true) {
                    this.hintsFound++;
                    if (this.hintsFound == 2) {
                        this.currentContextIndex = 11;
                        this.currentChoicesIndex = 5;
                    }
                }
                break;
            default:
                break;
        }
    };
    Arceus.prototype.getCurrentContextIndex = function () {
        return this.currentContextIndex;
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
    Arceus.prototype.getBack = function () {
        this.currentContextIndex = this.getPreviousContext();
        this.currentChoicesIndex = this.getPreviousChoices();
    };
    Arceus.prototype.isThisAnEnding = function () {
        return this.contexts[this.currentContextIndex].isEnd();
    };
    Arceus.prototype.getCurrentContextText = function () {
        return this.contexts[this.currentContextIndex].getContext();
    };
    Arceus.prototype.removePoints = function (amount) {
        this.points = this.points - amount;
        return this.points;
    };
    Arceus.prototype.getPoints = function () {
        return this.points;
    };
    Arceus.prototype.reset = function () {
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
    };
    Arceus.STARTING_POINTS = 500;
    return Arceus;
}());
exports.Arceus = Arceus;
