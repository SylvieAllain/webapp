import answer = require("./Answer");
import respond = require("./Respond");
import uimaker = require("./UIMaker");
export class GameMaster {
    private ending: answer.Answer[];
    private arrayRespond: respond.Respond[];
    private uiMaker: uimaker.UIMaker;
    private beenThere: answer.Answer[];
    private isTheEnd: boolean;
    private totalPoint: number;
    private savedPoint: number;
    constructor(ending: answer.Answer[], arrayRespond: respond.Respond[], uiMaker: uimaker.UIMaker) {
        this.ending = ending;
        this.arrayRespond = arrayRespond;
        this.uiMaker = uiMaker;
        this.totalPoint = 50;
    }

    getQuestion(path: number): respond.Respond {
        return this.arrayRespond[path];
    }

    getStartQuestion(): respond.Respond {
        return this.arrayRespond[0];
    }

    removePoint(): void {
        this.totalPoint = this.totalPoint - 10;
    }

    isThisTheEnd(): void {
        this.isTheEnd = uiMaker.isThisTheEnd();
    }

    getEnding(): answer.Answer[] {
        return this.ending;
    }

    savePoint(point): void {
        this.savedPoint = point;
    }

    //getSavePoint():number

    init(): void {
        this.isTheEnd = false;
        this.beenThere = [];
    }

    start(): void {
        this.init();
        var startQuestion: respond.Respond = this.getStartQuestion();
        this.uiMaker.displayRespondUI(startQuestion, this.beenThere, this.arrayRespond, this.totalPoint, this.ending);
        /*this.uiMaker.deleteEverything("main");
        var theEnd = document.createElement("p");
        var theEnd2 = document.createElement("p");
        theEnd.innerHTML = "This is the end";
        theEnd2.innerHTML = "This is a test";
        document.getElementById("main").appendChild(theEnd);
        document.getElementById("main").appendChild(theEnd2);*/


    }
}