"use strict";
exports.__esModule = true;
var Answer = /** @class */ (function () {
    function Answer(content, path) {
        this.content = content;
        this.path = path;
    }
    Answer.prototype.getContent = function () {
        return this.content;
    };
    Answer.prototype.getPath = function () {
        return this.path;
    };
    return Answer;
}());
exports.Answer = Answer;
