
var Context = /** @class */ (function () {
    function Context(text, hint, end) {
        this.text = text;
        this.hint = hint;
        this.end = end;
    }
    Context.prototype.changeHintStatus = function () {
        this.hint = false;
    };
    Context.prototype.getContext = function () {
        return this.text;
    };
    Context.prototype.isHint = function () {
        return this.hint;
    };
    Context.prototype.isEnd = function () {
        return this.end;
    };
    return Context;
}());
