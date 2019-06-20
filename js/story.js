class Story {
    constructor(contexts, choices, storyIndex) {
        this.choices = choices;
        this.contexts = contexts;
        this.storyIndex = storyIndex;
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
}