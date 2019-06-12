class Answer {
    private text: string;
    private next: number;
    private points: number;
    private visited: boolean = false;
    constructor(text: string, next: number, points: number) {
        this.text = text;
        this.next = next;
        this.points = points;
    }

    visit() {
        this.visited = true;
    }
    getPoints() {
        return this.points;
    }
    getNextDirection() {
        return this.next;
    }
    getAnswer() {
        return this.text;
    }
    hasBeenVisted() {
        return this.visited;
    }

}
*/
