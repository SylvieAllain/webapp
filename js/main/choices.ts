class Choice {
    private text: string;
    private nextChoices: number;
    private nextContext: number;
    private points: number;
    constructor(text: string, nextChoices: number, nextContext: number, points: number) {
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