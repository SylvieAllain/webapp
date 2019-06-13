/*interface Respond {
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
    private path: number;
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
    constructor(content: string, path: number) {
        this.content = content;
        this.path = path;
    }

    getContent(): string {
        return this.content;
    }

    getPath(): number {
        return this.path;
    }
}

class UIMaker {

    private isItStart: boolean;
    private totalPoints: number;
    private isTheEnd: boolean;
    private gameMaster: GameMaster;
    private answersNeeded: Answer[];
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

    private comeBackButton(responds: Respond[], path: number, beenThere: Answer[], points: number): void {
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

    displayRespondUI(respond: Respond, beenThere: Answer[], responds: Respond[], points: number, answers: Answer[]) {
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
                var possibilities: Answer[] = respond.getPossibilities();
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

    private getPath(path: number, beenThere: Answer[], responds: Respond[], points: number): void {
        this.displayRespondUI(responds[path], beenThere, responds, points, this.answersNeeded);
    }


    private createPath(possibilities: Answer[], beenThere: Answer[], responds: Respond[], points: number, answersNeeded: Answer[]) {
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

    private displayEndingMessage(answers: Answer[]): void {
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

    private isItInTheArray(answer: Answer, answers: Answer[]): boolean {
        var isItInArray = false;
        answers.forEach(function (element) {
            if (element == answer) {
                isItInArray = true;
            }
        })
        return isItInArray;
    }

    private removeFromTheArray(answer: Answer, answers: Answer[]): void {
        var newArray: Answer[] = [];
        answers.forEach(function (element) {
            if (element != answer) {
                newArray.push(element);
            }
        })
        this.answersNeeded = newArray;
    }
}

class GameMaster {
    private ending: Answer[];
    private arrayRespond: Respond[];
    private uiMaker: UIMaker;
    private beenThere: Answer[];
    private isTheEnd: boolean;
    private totalPoint: number;
    private savedPoint: number;
    constructor(ending: Answer[], arrayRespond: Respond[], uiMaker: UIMaker) {
        this.ending = ending;
        this.arrayRespond = arrayRespond;
        this.uiMaker = uiMaker;
        this.totalPoint = 50;
    }

    getQuestion(path: number): Respond {
        return this.arrayRespond[path];
    }

    getStartQuestion(): Respond {
        return this.arrayRespond[0];
    }

    removePoint(): void {
        this.totalPoint = this.totalPoint - 10;
    }

    isThisTheEnd(): void {
        this.isTheEnd = uiMaker.isThisTheEnd();
    }

    getEnding(): Answer[] {
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
        var startQuestion: Respond = this.getStartQuestion();
        this.uiMaker.displayRespondUI(startQuestion, this.beenThere, this.arrayRespond, this.totalPoint, this.ending);

    }
}


var answer1 = new Answer("A banana is a vegetable", 1);
var answer2 = new Answer("A banana is a fruit", 2);
var answer3 = new Answer("The banana's color is purple", 1);
var answer4 = new Answer("The banana's color is green", 1);
var uiMaker = new UIMaker();
var answer5 = new Answer("purple", 3);
var answer6 = new Answer("orange", 3);
var answer7 = new Answer("blue", 0);
var question = new Question("What describe a banana?", 0, answer1, answer2, answer3, answer4);
var affirmation = new Affirmation("You're wrong", 0);
var affirmation1 = new Affirmation("You're wrong", 2);
var affirmation2 = new Affirmation("You're right,but there's more!", 0);
var question2 = new Question("What's my favorite color", 2, answer5, answer6, answer7);
var Responds: Respond[] = [question, affirmation, question2, affirmation1];
var arrayRightAnswers: Answer[] = [answer2, answer7];
var gameMaster = new GameMaster(arrayRightAnswers, Responds, uiMaker);

gameMaster.start();*/

