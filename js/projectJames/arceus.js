var Arceus = /** @class */ (function () {
    function Arceus(initialQuestionIndex) {
        this.answers = [];
        this.questions = [];
        this.initialQuestionIndex = initialQuestionIndex;
    }
    Arceus.prototype.giveAnswer = function (index) {
        this.answers[index];
        this.nextQuestion;
    };
    Arceus.prototype.addQuestion = function (question, answers) {
        this.questions.push(question);
        this.answers.push(answers);
    };
    Arceus.prototype.getQuestion = function (index) {
        return this.questions[index];
    };
    Arceus.prototype.getCurrentQuestion = function () {
    };
    Arceus.prototype.getAnswers = function (index) {
        return this.answers[index];
    };
    Arceus.prototype.nextQuestion = function (index) {
    };
    Arceus.prototype.addPoints = function (index) {
    };
    Arceus.prototype.getPoints = function () {
        //return this.answers[2];
    };
    Arceus.prototype.reset = function () {
    };
    /*
    save() {
    }
    */
    Arceus.prototype.start = function () {
    };
    return Arceus;
}());
//# sourceMappingURL=arceus.js.map