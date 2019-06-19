class Story {
    constructor(contexts, choices, storyIndex, hint) {
        this.choices = choices;
        this.contexts = contexts;
        this.storyIndex = storyIndex;
        this.hint = hint;
    }

    getChoice(choiceIndex) {
        return this.choices[choiceIndex];
    }

    getContext(contextIndex) {
        return this.contexts[contextIndex];
    }

    getStoryIndex() {
        return this.storyIndex;
    }

    getHint() {
        return this.hint;
    }
}