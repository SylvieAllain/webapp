import answer = require("./Answer");
import uimaker = require("./UIMaker");
import respond = require("./Respond");
import question = require("./Question");
import affirmation = require("./Affirmation");


var answer1 = new answer.Answer("A banana is a vegetable", 1);
var answer2 = new answer.Answer("A banana is a fruit", 2);
var answer3 = new answer.Answer("The banana's color is purple", 1);
var answer4 = new answer.Answer("The banana's color is green", 1);
var uiMaker = new uimaker.UIMaker();
var answer5 = new answer.Answer("purple", 3);
var answer6 = new answer.Answer("orange", 3);
var answer7 = new answer.Answer("blue", 0);
var question = new question.Question("What describe a banana?", 0, answer1, answer2, answer3, answer4);
var affirmation = new affirmation.Affirmation("You're wrong", 0);
var affirmation1 = new affirmation.Affirmation("You're wrong", 2);
var affirmation2 = new affirmation.Affirmation("You're right,but there's more!", 0);
var question2 = new question.Question("What's my favorite color", 2, answer5, answer6, answer7);
var Responds: respond.Respond[] = [question, affirmation, question2, affirmation1];
var arrayRightAnswers: answer.Answer[] = [answer2, answer7];
var gameMaster = new GameMaster(arrayRightAnswers, Responds, uiMaker);