class Arceus {
    private initialQuestionIndex: number;
    private answers: Answer[][] = [];
    private questions: Question[] = [];
    constructor(initialQuestionIndex: number) {
        this.initialQuestionIndex = initialQuestionIndex;
    }
    giveAnswer(index: number) {
        this.answers[index];
        this.nextQuestion;
    }
    addQuestion(question: Question, answers: Answer[]) {
        this.questions.push(question);
        this.answers.push(answers);
    }
    getQuestion(index: number) {
        return this.questions[index];
    }
    getCurrentQuestion() {
    }
    getAnswers(index: number) {
        return this.answers[index];
    }
    nextQuestion(index: number) {
    }
    addPoints(index: number) {
    }
    getPoints() {
        //return this.answers[2];
    }
    reset() {
    }
    /*
    save() {
    }
    */
    start() {

    }
}