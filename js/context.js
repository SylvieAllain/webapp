"use strict";
exports.__esModule = true;
var Context = /** @class */ (function () {
    function Context(text, hint, end, previous) {
        this.text = text;
        this.hint = hint;
        this.end = end;
        this.previous = previous;
    }
    Context.prototype.getContext = function () {
        return this.text;
    };
    Context.prototype.isHint = function () {
        return this.hint;
    };
    Context.prototype.isEnd = function () {
        return this.end;
    };
    Context.prototype.getPrevious = function () {
        return this.previous;
    };
    return Context;
}());
exports.Context = Context;
