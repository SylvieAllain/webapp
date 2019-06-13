import gamemaster = require("./GameMaster");
import answer = require("./Answer");
import respond = require("./Respond");
import question = require("./Question");
export class UIMaker {

    private isItStart: boolean;
    private totalPoints: number;
    private isTheEnd: boolean;
    private gameMaster: gamemaster.GameMaster;
    private answersNeeded: answer.Answer[];
    constructor() {
        this.isItStart = true;
        this.isTheEnd = false;
        this.gameMaster = gameMaster;
    }

    private displayRespond(question: string): void {
        var questionToDisplay = document.createElement('p');
        questionToDisplay.textContent = question;
        document.getElementById("main").appendChild(questionToDisplay);
        document.getElementsByTagName('p')[0].setAttribute('class', 'questionP');
        document.getElementsByClassName('questionP')[0].setAttribute('style', 'text-align:center');
    }

    private displayAnswers(possibilities: answer.Answer[], beenThere: answer.Answer[]): void {
        var i: number;
        var possibilitiesContent: answer.Answer[] = [];
        possibilities.forEach(function (possibility) {
            possibilitiesContent.push(possibility);
        });
        for (i = 0; i < possibilitiesContent.length; i++) {
            var buttonToCreate = document.createElement('button');
            buttonToCreate.textContent = possibilitiesContent[i].getContent();
            var j: number;
            for (j = 0; j < beenThere.length; j++) {
                if (beenThere[j].getContent() == buttonToCreate.textContent) {
                    buttonToCreate.disabled = true;
                }
            }
            document.getElementById("main").appendChild(buttonToCreate);
        }
    }

    private createQuizFrame(respond: respond.Respond, beenThere: answer.Answer[]) {
        var division = document.createElement("div");
        division.setAttribute("id", "main");
        document.body.appendChild(division);
        var questionToDisplay = respond.displayRespond();
        this.displayRespond(questionToDisplay);
        this.displayAnswers(respond.getPossibilities(), beenThere);
        var message = document.createElement('p');
        message.innerHTML = "What's your answer?";
        document.getElementById("main").appendChild(message);
    }

    private comeBackButton(responds: respond.Respond[], path: number, beenThere: answer.Answer[], points: number): void {
        this.removePoint();
        this.updateTotalPointsValue();
        var button = document.createElement("button");
        button.textContent = "Try again";
        var self = this;
        var selfAnswersNeeded = this.answersNeeded;
        button.onclick = function () {
            self.deleteEverything("main");
            self.displayRespondUI(responds[path], beenThere, responds, points, selfAnswersNeeded);
        }
        document.getElementById("main").appendChild(button);

    }

    displayRespondUI(respond: respond.Respond, beenThere: answer.Answer[], responds: respond.Respond[], points: number, answers: answer.Answer[]) {
        if (this.isItStart) {
            this.totalPoints = points;
            this.displayPoint();
            this.answersNeeded = answers;
        }
        if (this.answersNeeded.length != 0) {
            if (respond instanceof question.Question) {
                if (!this.isItStart) {
                    this.deleteEverything("main");
                }
                this.createQuizFrame(respond, beenThere);
                var possibilities: answer.Answer[] = respond.getPossibilities();
                this.createPath(possibilities, beenThere, responds, this.totalPoints, this.answersNeeded);
                this.isItStart = false;
            }
            else {
                this.deleteEverything("main");
                this.displayRespond(respond.displayRespond());
                this.comeBackButton(responds, respond.getPath(), beenThere, this.totalPoints);
            }
        }
        else {
            this.isTheEnd = true;
            this.answersNeeded = answers;
            gameMaster.savePoint(this.getTotalPoints());
            this.isItStart = true;
            this.displayEndingMessage(answers);
        }
    }

    private getPath(path: number, beenThere: answer.Answer[], responds: respond.Respond[], points: number): void {
        this.displayRespondUI(responds[path], beenThere, responds, points, this.answersNeeded);
    }


    private createPath(possibilities: answer.Answer[], beenThere: answer.Answer[], responds: respond.Respond[], points: number, answersNeeded: answer.Answer[]) {
        var i;
        var self = this;
        var buttons = document.getElementsByTagName("button");
        for (i = 0; i < buttons.length; i++) {
            (function (button) {
                var path: number;
                possibilities.forEach(function (answer) {
                    var content = answer.getContent();
                    if (content == button.textContent) {
                        path = answer.getPath();
                    }
                })
                button.onclick = (function () {
                    var buttonText = button.textContent;
                    var answerToPush: answer.Answer;
                    possibilities.forEach(function (answer) {
                        if (answer.getContent() == buttonText) {
                            answerToPush = answer;
                        }
                    });
                    beenThere.push(answerToPush);
                    console.log(answersNeeded);
                    if (self.isItInTheArray(answerToPush, answersNeeded)) {
                        self.removeFromTheArray(answerToPush, answersNeeded)
                    }
                    console.log(beenThere);
                    self.getPath(path, beenThere, responds, points);
                });
            })(buttons[i]);
        }
    }

    private deleteEverything(idName: string) {
        var everything = document.getElementById(idName);
        while (everything.hasChildNodes()) {
            everything.removeChild(everything.firstChild);
        }
    }

    getTotalPoints(): number {
        return this.totalPoints;
    }

    private displayPoint(): void {
        var points = document.createElement("p");
        points.setAttribute("id", "totalPoints");
        points.innerHTML = "Your total point: " + this.getTotalPoints().toString();
        document.body.appendChild(points);
    }

    private updateTotalPointsValue(): void {
        var points = document.getElementById("totalPoints");
        points.innerHTML = "Your total point : " + this.getTotalPoints().toString();
    }

    private removePoint(): void {
        this.totalPoints = this.totalPoints - 10;
    }

    isThisTheEnd(): boolean {
        return this.isTheEnd;
    }

    private displayEndingMessage(answers: answer.Answer[]): void {
        this.deleteEverything("main");
        this.deleteEverything("totalPoints");
        var endMessage = document.createElement("p");
        endMessage.innerHTML = "This is the end";
        var endButton = document.createElement("button");
        endButton.textContent = "Try again?";
        var self = this;
        endButton.onclick = function () {
            gameMaster.init();
            self.deleteEverything("main");
            //self.deleteEverything("totalPoints");
            gameMaster.start();
        }
        document.getElementById("main").appendChild(endMessage);
        document.getElementById("main").appendChild(endButton);
    }

    private isItInTheArray(answer: answer.Answer, answers: answer.Answer[]): boolean {
        var isItInArray = false;
        answers.forEach(function (element) {
            if (element == answer) {
                isItInArray = true;
            }
        })
        return isItInArray;
    }

    private removeFromTheArray(answer: answer.Answer, answers: answer.Answer[]): void {
        var newArray: answer.Answer[] = [];
        answers.forEach(function (element) {
            if (element != answer) {
                newArray.push(element);
            }
        })
        this.answersNeeded = newArray;
    }
}
