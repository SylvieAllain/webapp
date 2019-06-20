class State {
    constructor(context, choices) {
        this.context = context;
        this.choices = choices;
    }

    getContext() {
        return this.context;
    }

    getChoices() {
        return this.choices;
    }
}