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
/*
where we put answers
reponse 9is the answer text itself
the first number is the direction
the second number is the points that the answer is worth 
*/
var answers: Answer[];
answers.push(new Answer("Reponse", 1, 10));
answers.push(new Answer("Reponse2", 0, 0));

arceus.addQuestion(questions[0], answers);