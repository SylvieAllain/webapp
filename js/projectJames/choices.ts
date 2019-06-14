class  Choice {
    private text: string;
    private nextDirection: number;
    private nextContext: number;
    private points: number;
    private previous: number
    constructor(text: string, nextDirection: number, nextContext :number, points: number, previous: number) {
        this.text = text;
        this.nextDirection = nextDirection;
        this.nextContext = nextContext;
        this.points = points;
        this.previous = previous;
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
    getPrevious() {
        return this.previous;
    }
    

}

