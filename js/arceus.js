var Arceus = /** @class */ (function () {
    function Arceus(story) {
        this.initialContextIndex = 0;
        this.initialChoicesIndex = 0;
        this.story = story;
        this.points = Arceus.STARTING_POINTS;
        this.piecesOfPuzzleFound = 0;
        this.lastPieceOfPuzzleFound = false;
        this.currentContextIndex = 0;
        this.currentChoicesIndex = 0;
    }
    Arceus.prototype.setChoices = function (userIndex) {
        var currentChoices = this.story.getChoice(this.currentChoicesIndex);
        var userChoice = currentChoices[userIndex];
        this.removePoints(userChoice.getPoints());
        this.setContext(userChoice);
        var context = this.story.getContext(this.currentContextIndex);
        this.currentChoicesIndex = userChoice.getNextChoices();
        switch (this.story.getStoryIndex()) {
            case 1:
                if (context.isPieceOfPuzzle() == true) {
                    this.piecesOfPuzzleFound++;
                    context.changePieceOfPuzzleStatus();
                    if (this.piecesOfPuzzleFound == 3) {
                        this.lastPieceOfPuzzleHasBeenFound();
                        this.changeCurrentContextIndex(11);
                        this.changeCurrentChoicesIndex(5);
                    }
                break;
                }
            case 4:
                if (context.isPieceOfPuzzle() == true) {
                    this.piecesOfPuzzleFound++;
                    context.changePieceOfPuzzleStatus();
                    if (this.piecesOfPuzzleFound == 2) {
                        this.lastPieceOfPuzzleHasBeenFound();
                        this.changeCurrentContextIndex(30);
                        this.changeCurrentChoicesIndex(6);
                    }
                    break;
                }
            default:
                break;
        }
    };
    Arceus.prototype.lastPieceOfPuzzleHasBeenFound = function () {
        this.lastPieceOfPuzzleFound = true;
        this.lastPieceOfPuzzleFoundIndex = this.currentContextIndex;
    };
    Arceus.prototype.changeCurrentContextIndex = function (contextIndex) {
        this.currentContextIndex = contextIndex;
    };
    Arceus.prototype.changeCurrentChoicesIndex = function (choicesIndex) {
        this.currentChoicesIndex = choicesIndex;
    };
    Arceus.prototype.getCurrentContextIndex = function () {
        return this.currentContextIndex;
    };
    Arceus.prototype.getChoices = function () {
        return this.story.getChoice(this.currentChoicesIndex);
    };
    Arceus.prototype.setPointsToZero = function () {
        this.points = 0;
    };
    Arceus.prototype.getPreviousContext = function () {
        var context = this.story.getChoice(this.currentChoicesIndex);
        return context.getPrevious();
    };
    Arceus.prototype.getPreviousChoices = function () {
        var choices = this.story.getChoice(this.currentChoicesIndex);
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
        return this.story.getContext(this.currentContextIndex).isEnd();
    };
    Arceus.prototype.getCurrentContextText = function () {
        return this.story.getContext(this.currentContextIndex).getContext();
    };
    Arceus.prototype.isThisChoiceIsAPathToTheEnding = function (choice) {
        var nextContextIndex = choice.getNextContext()
        var contextToCheck = this.story.getContext(nextContextIndex);
        return contextToCheck.isEnd();
    };
    Arceus.prototype.removePoints = function (amount) {
        this.points = this.points - amount;
        if (this.points < 0) {
            this.setPointsToZero();
        }
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
