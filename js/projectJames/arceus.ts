class Arceus {
    private initialQuestionIndex: number;
    private answers: Answer[][] = [];
    private questions: Question[] = [];
    private points: number = 0;
    private currentQuestionIndex: number = 0;
    constructor() {
    }
    giveAnswer(index: number) {
        this.answers[index];
        this.nextQuestion;
        this.addPoints(answers[index].getPoints());
    }
    addQuestion(question: Question, answers: Answer[]) {
        this.questions.push(question);
        this.answers.push(answers);
    }
    getQuestion(index: number) {
        return this.questions[index];
    }
    getCurrentQuestionIndex() {
        return this.currentQuestionIndex;
    }
    getAnswers(index: number) {
        return this.answers[index];
    }
    nextQuestion(index: number) {
        this.currentQuestionIndex = index;
        console.log(this.questions[this.currentQuestionIndex].getQuestion());
        let answers = this.answers[this.currentQuestionIndex];
        answers.forEach(function (answer, i) {
            console.log((i + 1) + ". " + answer.getAnswer());
        });

        /*for (let i = 0; i < answers.length; i++) {
            console.log(answers[i].getAnswer());
        }*/
    }
    addPoints(amount: number) {
        this.points = amount + this.points;
        return this.points;
    }
    getPoints() {
        return this.points;
    }
    reset() {
        this.points = 0;
        this.questions[this.initialQuestionIndex];
    }
    /*
    save() {
    }
    */
    start(questionIndex: number) {
        this.initialQuestionIndex = questionIndex;
        this.nextQuestion(this.initialQuestionIndex);
    }
}