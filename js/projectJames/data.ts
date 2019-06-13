var choices1: Choice[] = [];
var choices2: Choice[] = [];
var choices3: Choice[] = [];
var choices4: Choice[] = [];
var choices5: Choice[] = [];
var choices6: Choice[] = [];

choices1.push(new Choice("Reponse",0, 0, 0));
choices1.push(new Choice("Reponse2",1, 1, 10));
choices1.push(new Choice("Reponse",2, 2, 10));
choices1.push(new Choice("Reponse2",0, 3, 0));

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

////////////////////////////////////////////////
var context: Context[] = [];

context.push(new Context("Context", false, false));

var arceus = new Arceus();
arceus.start(0);
arceus.giveAnswer(0);

console.log(arceus);