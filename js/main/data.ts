﻿var choices1: Choice[] = [];
var choices2: Choice[] = [];
var choices3: Choice[] = [];
var choices4: Choice[] = [];
var choices5: Choice[] = [];
var choices6: Choice[] = [];

choices1.push(new Choice("Reponse", 0, 0, 0));
choices1.push(new Choice("Reponse2", 1, 1, 10));
choices1.push(new Choice("Reponse", 2, 2, 10));
choices1.push(new Choice("Reponse2", 0, 3, 0));

choices2.push(new Choice("Reponse", 5, 0, 10));
choices2.push(new Choice("Reponse2", 2, 1, 0));

choices3.push(new Choice("Reponse", 1, 0, 0));
choices3.push(new Choice("Reponse2", 2, 1, 10));
choices3.push(new Choice("Reponse", 2, 2, 0));

choices4.push(new Choice("Reponse", 3, 0, 0));
choices4.push(new Choice("Reponse2", 4, 1, 10));
choices4.push(new Choice("Reponse", 3, 2, 0));

choices5.push(new Choice("Reponse", 1, 0, 10));
choices5.push(new Choice("Reponse2", 1, 1, 10));

var finalChoices: Choice[][] = [];
finalChoices.push(choices1);
finalChoices.push(choices2);
finalChoices.push(choices3);
finalChoices.push(choices4);
finalChoices.push(choices5);


////////////////////////////////////////////////
var context: Context[] = [];

context.push(new Context("Context", false, false));
context.push(new Context("Context2", false, true));
context.push(new Context("Context3", false, true));

var arceus = new Arceus(finalChoices, context);
arceus.start(0, 0);


console.log(arceus);