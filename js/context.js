
var Context = /** @class */ (function () {
    function Context(text, pieceOfPuzzle, end, previous, hint) {
        this.text = text;
        this.pieceOfPuzzle = pieceOfPuzzle;
        this.end = end;
        this.previous = previous;
        this.hint = hint;
    }
    Context.prototype.changePieceOfPuzzleStatus = function () {
        this.pieceOfPuzzle = false;
    };
    Context.prototype.getContext = function () {
        return this.text;
    };
    Context.prototype.isPieceOfPuzzle = function () {
        return this.pieceOfPuzzle;
    };
    Context.prototype.isEnd = function () {
        return this.end;
    };
    Context.prototype.getPrevious = function () {
        return this.previous;
    };
    Context.prototype.getHint = function () {
        return this.hint;
    };
    return Context;
}());
