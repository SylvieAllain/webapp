class Arceus {
    constructor(story) {
        this.initialContextIndex = 0;
        this.initialChoicesIndex = 0;
        this.story = story;
        this.points = Arceus.STARTING_POINTS;
        this.hintsFound = 0;
        this.lastHintFound = false;
        this.currentContextIndex = 0;
        this.currentChoicesIndex = 0;
        this.storyIndex = storyIndex;
        this.arrayOfPreviousChoices = [];
        this.arrayOfPreviousContexts = [];
        this.STARTING_POINTS = 500;
    }

    setChoices (userIndex) {
        this.addPrevious();
        var currentChoices = this.story.getChoice(this.currentChoicesIndex);
        var userChoice = currentChoices[userIndex];
        this.removePoints(userChoice.getPoints());
        this.setContext(userChoice);
        var context = this.story.getContext(this.currentContextIndex);
        this.currentChoicesIndex = userChoice.getNextChoices();
        switch (this.story.getStoryIndex()) {
            case 1:
                if (context.isHint() == true) {
                    this.hintsFound++;
                    context.changeHintStatus();
                    if (this.hintsFound == 3) {
                        this.lastHintHasBeenFound();
                        this.changeCurrentContextIndex(11);
                        this.changeCurrentChoicesIndex(5);
                    }
                break;
                }
            case 4:
                if (context.isHint() == true) {
                    this.hintsFound++;
                    context.changeHintStatus();
                    if (this.hintsFound == 2) {
                        this.lastHintHasBeenFound();
                        this.changeCurrentContextIndex(30);
                        this.changeCurrentChoicesIndex(6);
                    }
                    break;
                }
            default:
                break;
        }
    }

    getPrevious() {
        this.currentChoicesIndex = this.arrayOfPreviousChoices.pop();
        this.currentContextIndex = this.arrayOfPreviousContexts.pop();
    }

    addPrevious() {
        this.arrayOfPreviousChoices.push(this.currentChoicesIndex);
        this.arrayOfPreviousContexts.push(this.currentContextIndex);
    }

    lastHintHasBeenFound() {
        this.lastHintFound = true;
        this.lastHintFoundIndex = this.currentContextIndex;
    }

    changeCurrentContextIndex(contextIndex) {
        this.currentContextIndex = contextIndex;
    }

    changeCurrentChoicesIndex(choicesIndex) {
        this.currentChoicesIndex = choicesIndex;
    }

    getCurrentContextIndex() {
        return this.currentContextIndex;
    }

    getChoices() {
        return this.story.getChoice(this.currentChoicesIndex);
    }

    setPointsToZero() {
        this.points = 0;
    }
    
    setContext(userChoice) {
        this.currentContextIndex = userChoice.getNextContext();
    }

    getBack() {
        this.currentContextIndex = this.getPreviousContext();
        this.currentChoicesIndex = this.getPreviousChoices();
    }

    isThisAnEnding() {
        return this.story.getContext(this.currentContextIndex).isEnd();
    }

    getCurrentContextText() {
        return this.story.getContext(this.currentContextIndex).getContext();
    }

    isThisChoiceIsAPathToTheEnding(choice) {
        var nextContextIndex = choice.getNextContext()
        var contextToCheck = this.story.getContext(nextContextIndex);
        return contextToCheck.isEnd();
    }

    removePoints(amount) {
        this.points = this.points - amount;
        if (this.points < 0) {
            this.setPointsToZero();
        }
        return this.points;
    }

    getPoints() {
        return this.points;
    }

    reset() {
        var restartButton = document.createElement("button");
        restartButton.textContent = "Next";
        restartButton.onclick = function() {
            window.location.reload();
        };
    }

    start(contextIndex, choicesIndex) {
        this.initialContextIndex = contextIndex;
        this.initialChoicesIndex = choicesIndex;
    }
}
