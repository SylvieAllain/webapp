"use strict";
exports.__esModule = true;
var Affirmation = /** @class */ (function () {
    function Affirmation(affirmation, path) {
        this.affirmation = affirmation;
        this.path = path;
    }
    Affirmation.prototype.displayRespond = function () {
        return this.affirmation;
    };
    Affirmation.prototype.getPath = function () {
        return this.path;
    };
    Affirmation.prototype.getPossibilities = function () {
        return null;
    };
    return Affirmation;
}());
exports.Affirmation = Affirmation;
