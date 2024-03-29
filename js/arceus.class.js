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
        this.arrayOfPreviousChoices = [];
        this.arrayOfPreviousContexts = [];
    }

    getStoryIndex() {
        var story = this.story;
        return story.getStoryIndex();
    }

    getCurrentChoices() {
        return this.story.getChoice(this.currentChoicesIndex);
    }

    getCurrentContext() {
        return this.story.getContext(this.currentContextIndex);
    }

    setChoices(userIndex) {
        this.addPrevious();
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
                    if (this.hintsFound == this.getHintsCount()) {
                        allHintsFound = true;
                        nextContextIndex = 13;
                        nextChoicesIndex = 6;
                    }
                    break;
                case 4:
                    if (this.hintsFound == this.getHintsCount()) {
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
        while (this.arrayOfPreviousChoices.length > 0) {
            this.arrayOfPreviousChoices.pop();
        }
        while (this.arrayOfPreviousContexts.length > 0) {
            this.arrayOfPreviousContexts.pop();
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
        if (this.arrayOfPreviousChoices.length == 0) {
            isEmpty = true;
        }
        return isEmpty;
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

    getHintsCount() {
        let count = 0;
        switch (this.storyIndex) {
            case 1:
                count = 3;
                break;
            case 4:
                count = 2;
                break;
        }
        return count;
    }

    getHintsFound() {
        return this.hintsFound;
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
