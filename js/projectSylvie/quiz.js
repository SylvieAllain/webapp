//patate
var Question = /** @class */ (function () {
    function Question(question, path) {
        var possibilities = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            possibilities[_i - 2] = arguments[_i];
        }
        this.question = question;
        this.possibilities = possibilities;
    }
    Question.prototype.displayRespond = function () {
        return this.question;
    };
    Question.prototype.getPossibilities = function () {
        return this.possibilities;
    };
    Question.prototype.getPossibilityContent = function (possibility) {
        return possibility.getContent();
    };
    Question.prototype.getPath = function () {
        return null;
    };
    return Question;
}());
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
var Answer = /** @class */ (function () {
    function Answer(content, path, isTheRightPath) {
        this.content = content;
        this.path = path;
        this.isTheRightPath = isTheRightPath;
    }
    Answer.prototype.getContent = function () {
        return this.content;
    };
    Answer.prototype.getPath = function () {
        return this.path;
    };
    Answer.prototype.isRightPath = function () {
        return this.isTheRightPath;
    };
    return Answer;
}());
var UIMaker = /** @class */ (function () {
    function UIMaker() {
        this.isItStart = true;
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
    UIMaker.prototype.comeBackButton = function (responds, path, beenThere) {
        var button = document.createElement("button");
        button.textContent = "Try again";
        var self = this;
        button.onclick = function () {
            self.deleteEverything("main");
            self.displayRespondUI(responds[path], beenThere, responds);
        };
        document.getElementById("main").appendChild(button);
    };
    UIMaker.prototype.displayRespondUI = function (respond, beenThere, responds) {
        if (respond instanceof Question) {
            if (!this.isItStart) {
                this.deleteEverything("main");
            }
            this.createQuizFrame(respond, beenThere);
            var possibilities = respond.getPossibilities();
            this.createPath(possibilities, beenThere, responds);
            this.isItStart = false;
        }
        else {
            this.deleteEverything("main");
            this.displayRespond(respond.displayRespond());
            this.comeBackButton(responds, respond.getPath(), beenThere);
        }
    };
    UIMaker.prototype.getPath = function (path, beenThere, responds) {
        this.displayRespondUI(responds[path], beenThere, responds);
    };
    UIMaker.prototype.createPath = function (possibilities, beenThere, responds) {
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
                    console.log(beenThere);
                    self.getPath(path, beenThere, responds);
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
    return UIMaker;
}());
var GameMaster = /** @class */ (function () {
    function GameMaster(ending, arrayRespond, uiMaker) {
        this.ending = ending;
        this.arrayRespond = arrayRespond;
        this.beenThere = [];
        this.uiMaker = uiMaker;
        this.isTheEnd = false;
    }
    GameMaster.prototype.getQuestion = function (path) {
        return this.arrayRespond[path];
    };
    GameMaster.prototype.getStartQuestion = function () {
        return this.arrayRespond[0];
    };
    GameMaster.prototype.start = function () {
        var startQuestion = this.getStartQuestion();
        this.uiMaker.displayRespondUI(startQuestion, this.beenThere, this.arrayRespond);
        /*if (this.ending == this.numberOfRightAnswer) {
            var theEnd = document.createElement("p");
            theEnd.innerHTML = "This is the end";
            document.getElementById("main").appendChild(theEnd);

        }*/
    };
    return GameMaster;
}());
var answer1 = new Answer("A banana is a vegetable", 1, false);
var answer2 = new Answer("A banana is a fruit", 2, true);
var answer3 = new Answer("The banana's color is purple", 1, false);
var answer4 = new Answer("The banana's color is green", 1, true);
var uiMaker = new UIMaker();
var answer5 = new Answer("purple", 3, false);
var answer6 = new Answer("orange", 3, false);
var answer7 = new Answer("blue", 0, true);
var question = new Question("What describe a banana?", 0, answer1, answer2, answer3, answer4);
var affirmation = new Affirmation("You're wrong", 0);
var affirmation1 = new Affirmation("You're wrong", 2);
var affirmation2 = new Affirmation("You're right,but there's more!", 0);
var question2 = new Question("What's my favorite color", 2, answer5, answer6, answer7);
var Responds = [question, affirmation, question2, affirmation1];
var arrayRightAnswers = [answer2, answer4];
var gameMaster = new GameMaster(arrayRightAnswers, Responds, uiMaker);
gameMaster.start();
//# sourceMappingURL=quiz.js.map