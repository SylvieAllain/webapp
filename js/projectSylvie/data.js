var choices1 = [];
var choices2 = [];
var choices3 = [];
var choices4 = [];
var choices5 = [];
var choices6 = [];
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
<<<<<<< HEAD:js/main/data.ts

////////////////////////////////////////////////
var context: Context[] = [];

context.push(new Context("A customer is reporting that their Query Suggestions component is not providing any suggestions. What do you do first?", false, false, 0));

var arceus = new Arceus();
arceus.start(0);
arceus.giveAnswer(0);

console.log(arceus);
=======
var finalChoices = [];
finalChoices.push(choices1);
finalChoices.push(choices2);
finalChoices.push(choices3);
finalChoices.push(choices4);
finalChoices.push(choices5);
////////////////////////////////////////////////
var context = [];
context.push(new Context("Context", false, false));
context.push(new Context("Context2", false, true));
context.push(new Context("Context3", false, true));
var arceus = new Arceus(finalChoices, context);
arceus.start(0, 0);
console.log(arceus);
//# sourceMappingURL=data.js.map
>>>>>>> 46d5b773b9ab09e27642f8cc6231e39ec63a9774:js/projectSylvie/data.js
