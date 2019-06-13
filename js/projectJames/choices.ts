class Choice {
    private text: string;
    private nextDirection: number;
    private nextContext: number;
    static points: number;
    constructor(text: string, nextDirection: number, nextContext :number, points: number) {
        this.text = text;
        this.nextDirection = nextDirection;
        this.nextContext = nextContext;
        this.points = points;
    }
    getText() {
        return this.text;
    }
    getPoints() {
        return this.points;
    }
    getNextDirection() {
        return this.nextDirection;
    }
    getNextContext() {
        return this.nextContext;
    }
    

}

