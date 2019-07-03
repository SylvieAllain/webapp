var choices = [];
var choices1 = [];
var choices2 = [];
var choices3 = [];
var choices4 = [];
var choices5 = [];
var choices6 = [];
choices1.push(new Choice("Ask for additional details about the behavior", 0, 1, 12));
choices1.push(new Choice("Open the Client's Search Page", 1, 2, 0));
choices1.push(new Choice("Open the Client's Cloud Organization", 2, 3, 0));
choices1.push(new Choice("Send the Client general documentation regarding Query Suggestions", 0, 4, 24));

choices2.push(new Choice("Use the Searchbox to send as many queries as you can in the shortest amount of time posssible in order to train the model", 1, 5, 12));
choices2.push(new Choice("Open the Developer Tools", 3, 2, 0));
choices2.push(new Choice("Open the Client's Cloud Organization instead", 2, 3, 0));


choices3.push(new Choice("Open the Client's Search Page instead", 1, 2, 0));
choices3.push(new Choice("Inspect the Model", 2, 6, 0));
choices3.push(new Choice("Browse to \"Model Testing\"", 2, 7, 12));
choices3.push(new Choice("Edit the Model's JSON in order to manually enter test candidates", 2, 8, 9999));

choices4.push(new Choice("Look in the source code to make sure the component is defined properly", 3, 9, 6));
choices4.push(new Choice("Open the network tab", 4, 2, 0));
choices4.push(new Choice("Look for errors in the Console", 3, 10, 6));

choices5.push(new Choice("Inspect the request that queries the Query Suggestions model", 1, 11, 0));
choices5.push(new Choice("Inspect the request that sends the analytics event related to the search", 1, 12, 0));

choices6.push(new Choice("The SearchHub filter values are different on the event that feeds the model VS the event that grabs suggestions from the model. The client must ensure that both values are the same.", 5, 14, 0));
choices6.push(new Choice("The client is testing the model with a keyword that is not part of the candidates. The client must ensure that they're using the right keyword.", 5, 15, 6));
choices6.push(new Choice("Even though there are candidates on the model, there is not enough data to provide suggestions. The model must be trained for a longer period of time in order to obtain suggestions", 5, 16, 6));
choices6.push(new Choice("Results are being provided for an anoymous user, while the candidates have been trained by a specific user. Query suggestions are provided according to the user.", 5, 17, 12));

choices.push(choices1);
choices.push(choices2);
choices.push(choices3);
choices.push(choices4);
choices.push(choices5);
choices.push(choices6);
////////////////////////////////////////////////
var context = [];
var storyIndex = 1;
//initial context
context.push(new Context("A customer is reporting that their Query Suggestions component is not providing any suggestions. What do you do first?", false, false,));
//context 1
context.push(new Context("Client explains that they are creating for a new development environment. It seems that the model has candidates, but they are not displayed on the Search Page.", false, false));
context.push(new Context("You are on the Client's Search Page and you can see that the Query Suggestions are not provided when typing various letters in the Search Box.", false, false));
context.push(new Context("You are on the Client's Cloud Organization. You browse to \"Machine Learning > Models\" and you can see the corresponding Query Suggestion model.", false, false));
context.push(new Context("Client responds that everything is setup as expected and that it is still not working.", false, false));
//context 2
context.push(new Context("This was a trap, you should not do that", false, false));
//context 3
context.push(new Context("You can see that the Model has candidates. The only SearchHub filter value that is trained on the model is \"MySearchHub\".", true, false));
context.push(new Context("You are on the Model Testing page where you can test the Query Suggestions model directly. You can see that Query Suggestions are provided when typing various letters in the Search Box.", false, false));
context.push(new Context("This breaks everything!", false, true));
//context 4
context.push(new Context("The component appears to be defined properly in the source code.", false, false));
context.push(new Context("There are no errors in the console when reproducing the problematic scenario.", false, false));
//context 5
context.push(new Context("You can see 2 things: <ol><li>The query parameter is the expected value that the user enters in the SearchBox</li><li>The SearchHub parameter is equal to \"MySearchPage\"<br> The object that is returned by the model is an empty object of the expected type, which means that the Query Suggestions model doesn't provide any suggestions for the above parameter.</li></ol>", true, false));
context.push(new Context("All parameters are as expected on the request. The SearchHub value is equal to \"MySearchHub\".", true, false));
//context 6
context.push(new Context("You have now gathered enough information to formulate a resolution attempt to the client. Which of the following recommendations will you choose?", false, false));
//ending
context.push(new Context("This solves the issue, the client thanks you very much and confirms you can close the case!", false, true));
context.push(new Context("The client sends you a screenshot proof that the keyword is actually part of the candidates. This is not the right cause to this issue.", false, false));
context.push(new Context("The client responds that this doesn't seem to be the cause of the issue, as the Model Testing feature provides suggestions as expected.", false, false));
context.push(new Context("The client spent time training new candidates using an anonymous session. However the same issue occurs. This doesn't seem to solve the issue.", false, false));

let hint = "Try inspecting once in a while!";

var story = new Story(context, choices, storyIndex, hint);