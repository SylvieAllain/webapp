"use strict";
exports.__esModule = true;
var UIMaker = /** @class */ (function () {
    function UIMaker() {
        this.isItStart = true;
        this.isTheEnd = false;
        this.gameMaster = gameMaster;
    }
    UIMaker.prototype.displayRespond = function (question) {
        var questionToDisplay = document.createElement('p');
        questionToDisplay.textContent = question;
        document.getElementById("main").appendChild(questionToDisplay);
        document.getElementsByTagName('p')[0].setAttribute('class', 'questionP');
        document.getElementsByClassName('questionP')[0].setAttribute('style', 'text-align:center');
    };
    UIMaker.prototype.displayAnswers = function (possibilities, beenThere) {
        var i;
        var possibilitiesContent = [];
        possibilities.forEach(function (possibility) {
            possibilitiesContent.push(possibility);
        });
        for (i = 0; i < possibilitiesContent.length; i++) {
            var buttonToCreate = document.createElement('button');
            buttonToCreate.textContent = possibilitiesContent[i].getContent();
            var j;
            for (j = 0; j < beenThere.length; j++) {
                if (beenThere[j].getContent() == buttonToCreate.textContent) {
                    buttonToCreate.disabled = true;
                }
            }
            document.getElementById("main").appendChild(buttonToCreate);
        }
    };
    UIMaker.prototype.createQuizFrame = function (respond, beenThere) {
        var division = document.createElement("div");
        division.setAttribute("id", "main");
        document.body.appendChild(division);
        var questionToDisplay = respond.displayRespond();
        this.displayRespond(questionToDisplay);
        this.displayAnswers(respond.getPossibilities(), beenThere);
        var message = document.createElement('p');
        message.innerHTML = "What's your answer?";
        document.getElementById("main").appendChild(message);
    };
    UIMaker.prototype.comeBackButton = function (responds, path, beenThere, points) {
        this.removePoint();
        this.updateTotalPointsValue();
        var button = document.createElement("button");
        button.textContent = "Try again";
        var self = this;
        var selfAnswersNeeded = this.answersNeeded;
        button.onclick = function () {
            self.deleteEverything("main");
            self.displayRespondUI(responds[path], beenThere, responds, points, selfAnswersNeeded);
        };
        document.getElementById("main").appendChild(button);
    };
    UIMaker.prototype.displayRespondUI = function (respond, beenThere, responds, points, answers) {
        if (this.isItStart) {
            this.totalPoints = points;
            this.displayPoint();
            this.answersNeeded = answers;
        }
        if (this.answersNeeded.length != 0) {
            if (respond instanceof Question) {
                if (!this.isItStart) {
                    this.deleteEverything("main");
                }
                this.createQuizFrame(respond, beenThere);
                var possibilities = respond.getPossibilities();
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
    };
    UIMaker.prototype.getPath = function (path, beenThere, responds, points) {
        this.displayRespondUI(responds[path], beenThere, responds, points, this.answersNeeded);
    };
    UIMaker.prototype.createPath = function (possibilities, beenThere, responds, points, answersNeeded) {
        var i;
        var self = this;
        var buttons = document.getElementsByTagName("button");
        for (i = 0; i < buttons.length; i++) {
            (function (button) {
                var path;
                possibilities.forEach(function (answer) {
                    var content = answer.getContent();
                    if (content == button.textContent) {
                        path = answer.getPath();
                    }
                });
                button.onclick = (function () {
                    var buttonText = button.textContent;
                    var answerToPush;
                    possibilities.forEach(function (answer) {
                        if (answer.getContent() == buttonText) {
                            answerToPush = answer;
                        }
                    });
                    beenThere.push(answerToPush);
                    console.log(answersNeeded);
                    if (self.isItInTheArray(answerToPush, answersNeeded)) {
                        self.removeFromTheArray(answerToPush, answersNeeded);
                    }
                    console.log(beenThere);
                    self.getPath(path, beenThere, responds, points);
                });
            })(buttons[i]);
        }
    };
    UIMaker.prototype.deleteEverything = function (idName) {
        var everything = document.getElementById(idName);
        while (everything.hasChildNodes()) {
            everything.removeChild(everything.firstChild);
        }
    };
    UIMaker.prototype.getTotalPoints = function () {
        return this.totalPoints;
    };
    UIMaker.prototype.displayPoint = function () {
        var points = document.createElement("p");
        points.setAttribute("id", "totalPoints");
        points.innerHTML = "Your total point: " + this.getTotalPoints().toString();
        document.body.appendChild(points);
    };
    UIMaker.prototype.updateTotalPointsValue = function () {
        var points = document.getElementById("totalPoints");
        points.innerHTML = "Your total point : " + this.getTotalPoints().toString();
    };
    UIMaker.prototype.removePoint = function () {
        this.totalPoints = this.totalPoints - 10;
    };
    UIMaker.prototype.isThisTheEnd = function () {
        return this.isTheEnd;
    };
    UIMaker.prototype.displayEndingMessage = function (answers) {
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
        };
        document.getElementById("main").appendChild(endMessage);
        document.getElementById("main").appendChild(endButton);
    };
    UIMaker.prototype.isItInTheArray = function (answer, answers) {
        var isItInArray = false;
        answers.forEach(function (element) {
            if (element == answer) {
                isItInArray = true;
            }
        });
        return isItInArray;
    };
    UIMaker.prototype.removeFromTheArray = function (answer, answers) {
        var newArray = [];
        answers.forEach(function (element) {
            if (element != answer) {
                newArray.push(element);
            }
        });
        this.answersNeeded = newArray;
    };
    return UIMaker;
}());
exports.UIMaker = UIMaker;
