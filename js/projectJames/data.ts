var choices: Choice[][] = [];
var choices1: Choice[] = [];
var choices2: Choice[] = [];
var choices3: Choice[] = [];
var choices4: Choice[] = [];
var choices5: Choice[] = [];
var choices6: Choice[] = [];

choices1.push(new Choice("Ask for additional details about the behavior", 0, 0, 0, ));
choices1.push(new Choice("Open the Client's Search Page",1, 1, 10));
choices1.push(new Choice("Open the Client's Cloud Organization",2, 2, 10));
choices1.push(new Choice("Send the Client general documentation regarding Query Suggestions",0, 3, 0));

choices2.push(new Choice("Open the Developer Tools", 5, 0, 10));
choices2.push(new Choice("Opemn the Client's Cloud Organization instead", 2, 1, 0));

choices3.push(new Choice("Opewn the Client's Search Page instead", 1, 0, 0));
choices3.push(new Choice("Inspect the Model", 2, 1, 10));
choices3.push(new Choice("Browse to \"Model Testing\"", 2, 2, 0));

choices4.push(new Choice("Look in the cource code to make sure the component is defined properly", 3, 0, 0));
choices4.push(new Choice("Open the network tab", 4, 1, 10));
choices4.push(new Choice("Look for errors in the Console", 3, 2, 0));

choices5.push(new Choice("Inspect the request that queries the Query Suggestions model", 1, 0, 10));
choices5.push(new Choice("Inspect the request that sends the analytics event related to the search", 1, 1, 10));

choices6.push(new Choice("THe SearchHub filter values are diffrent on the event that feeds the model VS the event that grabs suggestions from the model. The client must ensure that both value's are the same.", 5, 0, 0));
choices6.push(new Choice("The client is testing the model with a keyword that is not part of the candidates. The client must ensure that they're using the right keyword.", 5, 1, 10));
choices6.push(new Choice("Even though there are candidates on the model, there is not enough data to provide suggestions. Thew model must be trained for a longer peroid of time inn order to obtain suggestions", 5, 2, 10));
choices6.push(new Choice("Results are being provided for an anoymous user, while the candidates have been trained by a specific user. Query suggestions are provided according to the user.", 5, 3, 0));

choices.push(choices1);
choices.push(choices2);
choices.push(choices3);
choices.push(choices4);
choices.push(choices5);
choices.push(choices6);
////////////////////////////////////////////////
var context: Context[] = [];

//initial context
context.push(new Context("A customer is reporting that their Query Suggestions component is not providing any suggestions. What do you do first?", false, false, 0));

//context 1
context.push(new Context("Client explians that they are creating for a new developement enviorement. It seems that the model has candidates, but they are not displayed on the Search Page.", false, false, 0));
context.push(new Context("You are on the Client's Search Page and you can see that the Query Suggestions are not provided when typing various letters in the Search Box.", false, false, 0));
context.push(new Context("You are on the Client's Cloud Organization. You browse to \"Machine Learning > Models\" and you can see the corresponding Query Suggestion model.", false, false, 0));
context.push(new Context("Client responds that everything is setup as expoected and that it is still not working.", false, false, 0));

//context 3
context.push(new Context("You can see that the Model has candidates. The only SearchHub filter value that is trained on the model is \" MySearchHub\".", true, false, 3));
context.push(new Context("You are on the Madel Testing page where you can test the Query Suggestions model directly. You can see that Query Suggestions are [rovided when typing various lettters in the Search Box.", false, false, 3));

//context 4
context.push(new Context("The component appears to be defined properly in the source code.", false, false, 2));
context.push(new Context("There are no errors in the console when reproducing the problematic scenario.", false, false, 2));

//context 5
context.push(new Context("You can see 2 things: <br> 1. The query parameteris the expected vfalue that the user enters in the SearchBox <br> 2. THe SearchHub parameter is eaqual to \"MySearchPage\"<br> The object that is returned by the model is an empty object of the expected type, which means that the Query Suggestions model doesn't provide any suggestions for the above parameter.", true, false, 2));
context.push(new Context("All parameters are as expected on the request. THe SearchHub value is equal to \"MySearchHub\".", true, false, 2));

//context 6
context.push(new Context("You have now gathered enough information to formulate a resolution attempt to the client. Which of the following recommendations will you choose?", false, false, 5));

//ending
context.push(new Context("Thids solves the issue, client thanks you vary much and confirms you can close the case!", false, true, 9));
context.push(new Context("client sends you a screenshot proof that the keyword is actually part of the candidates. This is not the right cause to this issue.", false, false, 9));
context.push(new Context("Client responds that this doesn't seem to be the cause of the issue, as the Model Testing feature provides suggestions as expected.", false, false, 9));
context.push(new Context("Client spent time training new candidates using an anoymous session. However the same issue occurs.This doesn't seem to solve the issue.", false, false, 9));

var arceus = new Arceus(context, choices);
arceus.start(0);
//arceus.getChoice(0);

console.log(arceus);