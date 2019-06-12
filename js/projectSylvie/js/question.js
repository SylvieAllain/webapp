"use strict";
exports.__esModule = true;
var Question = /** @class */ (function () {
    function Question(question, path) {
        var possibilities = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            possibilities[_i - 2] = arguments[_i];
        }
        this.question = question;
        this.possibilities = possibilities;
    }
    Question.prototype.displayRespond = function () {
        return this.question;
    };
    Question.prototype.getPossibilities = function () {
        return this.possibilities;
    };
    Question.prototype.getPossibilityContent = function (possibility) {
        return possibility.getContent();
    };
    Question.prototype.getPath = function () {
        return null;
    };
    return Question;
}());
exports.Question = Question;
