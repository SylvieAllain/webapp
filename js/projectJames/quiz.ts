//patate

interface Respond {
    displayRespond(): string;

    getPossibilities(): Answer[];
    getPath(): number;
}

class Question implements Respond {
    private question: string;
    private possibilities: Answer[];
    constructor(question: string, path: number, ...possibilities: Answer[]) {
        this.question = question;
        this.possibilities = possibilities;
    }

    displayRespond(): string {
        return this.question;
    }

    getPossibilities(): Answer[] {
        return this.possibilities;
    }

    getPossibilityContent(possibility: Answer): string {
        return possibility.getContent();
    }

    getPath(): number {
        return null;
    }

}

class Affirmation implements Respond {
    private affirmation: string;
    private path: number
    constructor(affirmation: string, path: number) {
        this.affirmation = affirmation;
        this.path = path;
    }

    displayRespond(): string {
        return this.affirmation;
    }

    getPath(): number {
        return this.path;
    }

    getPossibilities(): Answer[] {
        return null;
    }
}

class Answer {
    private content: string;
    private path: number;
    private isTheRightPath: boolean
    constructor(content: string, path: number, isTheRightPath: boolean) {
        this.content = content;
        this.path = path;
        this.isTheRightPath = isTheRightPath;
    }

    getContent(): string {
        return this.content;
    }

    getPath(): number {
        return this.path;
    }

    isRightPath(): boolean {
        return this.isTheRightPath;
    }
}

class UIMaker {

    private isItStart: boolean;
    constructor() {
        this.isItStart = true;
    }

    private displayRespond(question: string): void {
        var questionToDisplay = document.createElement('p');
        questionToDisplay.textContent = question;
        document.getElementById("main").appendChild(questionToDisplay);
        document.getElementsByTagName('p')[0].setAttribute('class', 'questionP');
        document.getElementsByClassName('questionP')[0].setAttribute('style', 'text-align:center');
    }

    private displayAnswers(possibilities: Answer[], beenThere: Answer[]): void {
        var i: number;
        var possibilitiesContent: Answer[] = [];
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

    private createQuizFrame(respond: Respond, beenThere: Answer[]) {
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

    private comeBackButton(responds: Respond[], path: number, beenThere: Answer[]): void {
        var button = document.createElement("button");
        button.textContent = "Try again";
        var self = this;
        button.onclick = function () {
            self.deleteEverything("main");
            self.displayRespondUI(responds[path], beenThere, responds);
        }
        document.getElementById("main").appendChild(button);

    }

    displayRespondUI(respond: Respond, beenThere: Answer[], responds: Respond[]) {
        if (respond instanceof Question) {
            if (!this.isItStart) {
                this.deleteEverything("main");
            }
            this.createQuizFrame(respond, beenThere);
            var possibilities: Answer[] = respond.getPossibilities();
            this.createPath(possibilities, beenThere, responds);
            this.isItStart = false;
        }
        else {
            this.deleteEverything("main");
            this.displayRespond(respond.displayRespond());
            this.comeBackButton(responds, respond.getPath(), beenThere);
        }
    }

    private getPath(path: number, beenThere: Answer[], responds: Respond[]): void {
        this.displayRespondUI(responds[path], beenThere, responds);
    }


    private createPath(possibilities: Answer[], beenThere: Answer[], responds: Respond[]) {
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
                    var answerToPush: Answer;
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
    }

    private deleteEverything(idName: string) {
        var everything = document.getElementById(idName);
        while (everything.hasChildNodes()) {
            everything.removeChild(everything.firstChild);
        }
    }
}

class GameMaster {
    private ending: Answer[];
    private arrayRespond: Respond[];
    private uiMaker: UIMaker;
    private beenThere: Answer[];
    private isTheEnd: boolean;
    constructor(ending: Answer[], arrayRespond: Respond[], uiMaker: UIMaker) {
        this.ending = ending;
        this.arrayRespond = arrayRespond;
        this.beenThere = [];
        this.uiMaker = uiMaker;
        this.isTheEnd = false;
    }

    getQuestion(path: number): Respond {
        return this.arrayRespond[path];
    }

    getStartQuestion(): Respond {
        return this.arrayRespond[0];
    }

    start(): void {
        var startQuestion: Respond = this.getStartQuestion();
        this.uiMaker.displayRespondUI(startQuestion, this.beenThere, this.arrayRespond);
        /*if (this.ending == this.numberOfRightAnswer) { 
            var theEnd = document.createElement("p");
            theEnd.innerHTML = "This is the end";
            document.getElementById("main").appendChild(theEnd);

        }*/

    }
}


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
var Responds: Respond[] = [question, affirmation, question2, affirmation1];
var arrayRightAnswers: Answer[] = [answer2, answer4];
var gameMaster = new GameMaster(arrayRightAnswers, Responds, uiMaker);


gameMaster.start();

