class Choice {
    constructor(text, nextChoices, nextContext, points) {
        this.text = text;
        this.nextChoices = nextChoices;
        this.nextContext = nextContext;
        this.points = points;
    }

    getChoice() {
        return this.text;
    }

    getPoints() {
        return this.points;
    }

    getNextChoices() {
        return this.nextChoices;
    }

    getNextContext() {
        return this.nextContext;
    }
}