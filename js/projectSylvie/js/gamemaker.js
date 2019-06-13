var GameMaster = /** @class */ (function () {
    function GameMaster(ending, arrayRespond, uiMaker) {
        this.ending = ending;
        this.arrayRespond = arrayRespond;
        this.uiMaker = uiMaker;
        this.totalPoint = 50;
    }
    GameMaster.prototype.getQuestion = function (path) {
        return this.arrayRespond[path];
    };
    GameMaster.prototype.getStartQuestion = function () {
        return this.arrayRespond[0];
    };
    GameMaster.prototype.removePoint = function () {
        this.totalPoint = this.totalPoint - 10;
    };
    GameMaster.prototype.isThisTheEnd = function () {
        this.isTheEnd = uiMaker.isThisTheEnd();
    };
    GameMaster.prototype.getEnding = function () {
        return this.ending;
    };
    GameMaster.prototype.savePoint = function (point) {
        this.savedPoint = point;
    };
    //getSavePoint():number
    GameMaster.prototype.init = function () {
        this.isTheEnd = false;
        this.beenThere = [];
    };
    GameMaster.prototype.start = function () {
        this.init();
        var startQuestion = this.getStartQuestion();
        this.uiMaker.displayRespondUI(startQuestion, this.beenThere, this.arrayRespond, this.totalPoint, this.ending);
        /*this.uiMaker.deleteEverything("main");
        var theEnd = document.createElement("p");
        var theEnd2 = document.createElement("p");
        theEnd.innerHTML = "This is the end";
        theEnd2.innerHTML = "This is a test";
        document.getElementById("main").appendChild(theEnd);
        document.getElementById("main").appendChild(theEnd2);*/
    };
    return GameMaster;
}());
