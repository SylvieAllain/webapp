﻿

var groups: Group[];
groups.push(new Group());
groups.push(new Group());
groups.push(new Group());
groups.push(new Group());
groups.push(new Group());
groups.push(new Group());
//////////////////////////
var answers: Answer[];
var answers2: Answer[];
var answers3: Answer[];
var answers4: Answer[];
var answers5: Answer[];
var answers6: Answer[];
/////////////////////////////////////////////
answers.push(new Answer("Reponse", 0, 0));
answers.push(new Answer("Reponse2",  1, 10));
answers.push(new Answer("Reponse", 1, 10));
answers.push(new Answer("Reponse2", 0, 0));

answers2.push(new Answer("Reponse", 1, 10));
answers2.push(new Answer("Reponse2", 0, 0));

var arceus = new Arceus();
arceus.addQuestion(questions[0], answers);
arceus.addQuestion(questions[1], answers);
arceus.start(0);
arceus.giveAnswer(0);

console.log(arceus);