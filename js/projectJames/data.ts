﻿

var questions: Question[];
questions.push(new Question("Question1"));
questions.push(new Question("Question2"));
var answers: Answer[];
var answers2: Answer[];
answers.push(new Answer("Reponse", 1, 10));
answers.push(new Answer("Reponse2", 0, 0));
answers2.push(new Answer("Reponse", 1, 10));
answers2.push(new Answer("Reponse2", 0, 0));

var arceus = new Arceus(0);
arceus.addQuestion(questions[0], answers);
arceus.addQuestion(questions[1], answers);

console.log(arceus);