class Question {
    private text: string;
    constructor(text: string) {
        this.text = text;
    }
    getQuestion() {
        return this.text;
    }
}
/*
where we put the question text
*/
var questions: Question[];
questions.push(new Question("Question1"));
questions.push(new Question("Question2"));

var arceus = new Arceus(0);
arceus.addQuestion(questions[0], answers);