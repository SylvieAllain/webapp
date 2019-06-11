class Question {
    private text: string;
    constructor(text: string) {
        this.text = text;
    }
    getQuestion() {
        return this.text;
    }
}
var questions: Question[];
questions.push(new Question("Question1"));
questions.push(new Question("Question2"));

arceus.addQuestion(questions[0], answers);