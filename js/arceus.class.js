class Arceus {
    constructor(story) {
        this.initialContextIndex = 0;
        this.initialChoicesIndex = 0;
        this.story = story;
        this.points = 500;
        this.hintsFound = 0;
        this.lastHintFound = false;
        this.currentContextIndex = 0;
        this.currentChoicesIndex = 0;
        this.storyIndex = storyIndex;
        this.arrayOfPreviousStates = [];
    }

    getCurrentChoices() {
        return this.story.getChoice(this.currentChoicesIndex);
    }

    getCurrentContext() {
        return this.story.getContext(this.currentContextIndex);
    }

    setChoices(userIndex) {
        this.addPreviousState();
        let currentChoices = this.getCurrentChoices();
        let userChoice = currentChoices[userIndex];
        this.removePoints(userChoice.getPoints());
        this.setContext(userChoice);
        let context = this.getCurrentContext();
        this.currentChoicesIndex = userChoice.getNextChoices();
        if (context.isHint() == true) {
            let allHintsFound = false;
            let nextContextIndex = 0;
            let nextChoicesIndex = 0;
            context.changeHintStatus();
            this.hintsFound++;
            switch (this.story.getStoryIndex()) {
                case 1:
                    if (this.hintsFound == 3) {
                        allHintsFound = true;
                        nextContextIndex = 11;
                        nextChoicesIndex = 5;
                    }
                    break;
                case 4:
                    if (this.hintsFound == 2) {
                        allHintsFound = true;
                        nextContextIndex = 28;
                        nextChoicesIndex = 6;
                    }
                    break;
            }
            if (allHintsFound) {
                this.lastHintHasBeenFound();
                this.changeCurrentContextIndex(nextContextIndex);
                this.changeCurrentChoicesIndex(nextChoicesIndex);
                this.emptyTheArrays();
            }
        }
    }

    emptyTheArrays() {
        while (this.arrayOfPreviousStates.length > 0) {
            this.arrayOfPreviousStates.pop();
        }
    }
    getInititialContext() {
        return this.initialContextIndex;
    }

    getStoryHint() {
        return this.story.getHint();
    }

    isArrayEmpty() {
        var isEmpty = false;
        if (this.arrayOfPreviousStates.length == 0) {
            isEmpty = true;
        }
        return isEmpty;
    }

    getPreviousState() {
        var previousState = this.arrayOfPreviousStates.pop();
        this.currentChoicesIndex = previousState.getChoices();
        this.currentContextIndex = previousState.getContext();
    }

    addPreviousState() {
        var state = new State(this.currentContextIndex, this.currentChoicesIndex);
        this.arrayOfPreviousStates.push(state);
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
        return this.getCurrentChoices();
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

    getContext(index) {
        return this.story.getContext(index);
    }

    getCurrentContextText() {
        return this.getCurrentContext().getContext();
    }

    isThisAnEnding() {
        return this.getCurrentContext().isEnd();
    }

    isThisChoiceAPathToTheEnding(choice) {
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

    start(contextIndex, choicesIndex) {
        this.initialContextIndex = contextIndex;
        this.initialChoicesIndex = choicesIndex;
    }
}
