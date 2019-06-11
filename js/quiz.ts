interface Reaction {
    displayRespond(): string;
}
class Question implements Reaction {
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

}

class Affirmation implements Reaction {
    private affirmation: string;
    constructor(affirmation: string) {
        this.affirmation = affirmation;
    }

    displayRespond(): string {
        return this.affirmation;
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

class GameMaster {
    private ending: number;
    private arrayReaction: Reaction[];
    constructor(ending: number, arrayReaction: Reaction[]) {
        this.ending = ending;
        this.arrayReaction = arrayReaction;
    }

    getQuestion(path: number): Reaction {
        return this.arrayReaction[path];
    }

    getEndingNumber() {
        return this.ending;
    }

    getStartQuestion() {
        return this.arrayReaction[0];
    }
}



var answer1 = new Answer("A banana is a vegetable", 1);
var answer2 = new Answer("A banana is a fruit", 2);
var answer3 = new Answer("The banana's color is purple", 1);
var answer4 = new Answer("The banana's color is yellow", 2);
/*var answer5 = new Answer("purple", 4);
var answer6 = new Answer("orange", 4);
var answer7 = new Answer("blue", 3);*/
var question = new Question("What describe a banana?", 0, answer1, answer2, answer3, answer4);
var affirmation = new Affirmation("You're wrong");
var affirmation2 = new Affirmation("You're right,but there's more!");
//var question2 = new Question("What's my favorite color", 2, answer5, answer6, answer7);
console.log(question.getPossibilities());
var reactions: Reaction[] = [question, affirmation, affirmation2];
var gameMaster = new GameMaster(2, reactions);
var beenThere: string[] = [];

var numberOfRightAnswer = 0;

function getPath(path: number, reactions: Reaction[], button) {
    var reaction;
    var i: number;
    for (i = 0; i < reactions.length; i++) {
        if (i == path) {
            reaction = reactions[i];
            console.log(reaction);
        }
        if (reaction instanceof Question) {
            displayRespondUI()
        }
    }

}
function displayRespond(question: string): void {
    var questionToDisplay = document.createElement('p');
    questionToDisplay.textContent = question;
    document.getElementById("main").appendChild(questionToDisplay);
    document.getElementsByTagName('p')[0].setAttribute('class', 'questionP');
    document.getElementsByClassName('questionP')[0].setAttribute('style', 'text-align:center');
}

function displayAnswers(possibilities: Answer[], beenThere: string[]): void {
    var i: number;
    var possibilitiesContent: string[] = [];
    possibilities.forEach(function (possibility) {
        console.log(possibility);
        possibilitiesContent.push(possibility.getContent());
    });
    for (i = 0; i < possibilitiesContent.length; i++) {
        var buttonToCreate = document.createElement('button');
        buttonToCreate.textContent = possibilitiesContent[i];
        var j: number;
        for (j = 0; j < beenThere.length; j++) {
            if (beenThere[j] == buttonToCreate.textContent) {
                buttonToCreate.disabled = true;
            }
        }
        document.getElementById("main").appendChild(buttonToCreate);
    }
}

function comeBackButton(): void {
    var button = document.createElement("button");
    button.textContent = "Try again";
    document.getElementById("test").appendChild(button);
}

function displayRespondUI(question: Question, beenThere: string[]) {
    var division = document.createElement("div");
    division.setAttribute("id", "main");
    document.body.appendChild(division);
    var questionToDisplay = question.displayRespond();
    displayRespond(questionToDisplay);
    displayAnswers(question.getPossibilities(), beenThere);
    var message = document.createElement('p');
    message.setAttribute('id', 'test');
    message.innerHTML = "What's your answer?";
    document.getElementById("main").appendChild(message);
}

var buttons = document.getElementsByTagName('button');
function displayValue(value: string) {
    document.getElementById('test').innerHTML = value;
}

function deleteEverything(idName: string) {
    var everything = document.getElementById(idName);
    while (everything.hasChildNodes()) {
        everything.removeChild(everything.firstChild);
    }
}
function createPath(possibilities: Answer[], beenThere: string[]) {
    var i;
    for (i = 0; i < buttons.length; i++) {
        (function (button) {
            var possibilities: Answer[] = question.getPossibilities();
            var path: number;
            possibilities.forEach(function (answer) {
                var content = answer.getContent();
                if (content == button.textContent) {
                    path = answer.getPath();
                }
            })
            button.onclick = (function () {
                getPath(path, button);
            });
        })(buttons[i]);
    }
}

function start(gameMaster: GameMaster) {
    var startQuestion = gameMaster.getStartQuestion();
    displayRespondUI(startQuestion, beenThere);
    createPath(question.getPossibilities(), beenThere);
    while (gameMaster.getEndingNumber() == numberOfRightAnswer) {
        createPath(question.getPossibilities(), beenThere);
    }
}

start(gameMaster);
