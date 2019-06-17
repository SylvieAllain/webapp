var Arceus = /** @class */ (function () {
    function Arceus(choices, contexts) {
        this.choices = [];
        this.contexts = [];
        this.points = Arceus.STARTING_POINTS;
        this.choices = choices;
        this.contexts = contexts;
        this.currentContextIndex = 0;
        this.currentChoicesIndex = 0;
    }
    Arceus.prototype.setChoices = function (userIndex) {
        var currentChoices = this.choices[this.currentChoicesIndex];
        var userChoice = currentChoices[userIndex];
        this.removePoints(userChoice.getPoints());
        this.setContext(userChoice);
        this.currentChoicesIndex = userChoice.getNextChoices();
        if (this.isThisAnEnding()) {
            this.reset();
        }
        else {
            this.nextNode();
        }
    };
    Arceus.prototype.getPrevious = function () {
        var context = this.contexts[this.currentContextIndex];
        return context.getPrevious();
    };
    Arceus.prototype.setContext = function (userChoice) {
        this.currentContextIndex = userChoice.getNextContext();
    };
    Arceus.prototype.getCurrentContextIndex = function () {
        return this.currentContextIndex;
    };
    Arceus.prototype.nextNode = function () {
        console.log(this.getContext(this.currentContextIndex));
        var currentChoices = this.choices[this.currentContextIndex];
        currentChoices.forEach(function (choice, i) {
            console.log((i + 1) + ". " + choice.getChoice());
        });
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
        this.points = amount - this.points;
        return this.points;
    };
    Arceus.prototype.getPoints = function () {
        return this.points;
    };
    Arceus.prototype.reset = function () {
        this.points = Arceus.STARTING_POINTS;
        this.contexts[this.initialContextIndex];
        this.choices[this.initialChoicesIndex];
    };
    Arceus.prototype.start = function (contextIndex, choicesIndex) {
        this.initialContextIndex = contextIndex;
        this.initialChoicesIndex = choicesIndex;
        this.nextNode();
    };
    Arceus.STARTING_POINTS = 500;
    return Arceus;
}());
//# sourceMappingURL=arceus.js.map