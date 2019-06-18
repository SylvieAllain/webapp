"use strict";
var Choice = /** @class */ (function () {
    function Choice(text, nextChoices, nextContext, points, previousChoices) {
        this.text = text;
        this.nextChoices = nextChoices;
        this.nextContext = nextContext;
        this.points = points;
        this.previousChoices = previousChoices;
    }
    Choice.prototype.getChoice = function () {
        return this.text;
    };
    Choice.prototype.getPoints = function () {
        return this.points;
    };
    Choice.prototype.getNextChoices = function () {
        return this.nextChoices;
    };
    Choice.prototype.getNextContext = function () {
        return this.nextContext;
    };
    Choice.prototype.getPrevious = function () {
        return this.previousChoices;
    };
    return Choice;
}());
