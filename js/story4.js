var choices = [];
var choices1 = [];
var choices2 = [];
var choices3 = [];
var choices4 = [];
var choices5 = [];
var choices6 = [];
var choices7 = [];
var choices8 = [];
var choices9 = [];
var choices10 = [];
choices1.push(new Choice("Do you see an error message?", 0, 1, 0, 0));
choices1.push(new Choice("Are you sure you want to get results in the first place?", 1, 2, 0, 0));
choices1.push(new Choice("Please send logs", 2, 3, 0, 0));
choices1.push(new Choice("Is your search page accessible from outside your network?", 0, 4, 0, 0));
choices2.push(new Choice("Could you send me the query for this search and confirm the orgID and sourceName?", 3, 2, 0, 0));
choices2.push(new Choice("Could you please confirm your org / source name?", 2, 3, 0, 0));
choices2.push(new Choice("Do you have indexed documents that contain the searched keyword?", 3, 2, 0, 0));
choices2.push(new Choice("Please open another case saying that you see no results", 2, 3, 0, 0));
choices3.push(new Choice("Is your title field searchable?", 1, 2, 0, 0));
choices3.push(new Choice("Ask customer about permissions on documents", 2, 5, 0, 0));
choices3.push(new Choice("Suggest a meeting", 2, 6, 0, 0));
choices4.push(new Choice("Test this expression on customer’s non-prod org", 3, 7, 0, 1));
choices4.push(new Choice("Ask about displayOnSearchfield to the customer", 4, 2, 0, 1));
choices4.push(new Choice("Tell the customer that his query seems to be filtering results out", 3, 8, 0, 1));
choices5.push(new Choice("Suggest a meeting", 1, 9, 0, 3));
choices5.push(new Choice("What would be the full query that does not produce results ?", 1, 10, 0, 3));
choices5.push(new Choice("Try rebuilding all your sources", 1, 9, 0, 3));
choices6.push(new Choice("Ok", 5, 11, 0, 4));
choices6.push(new Choice("Let me test on my end", 5, 12, 0, 4));
choices7.push(new Choice("Suggest a meeting", 1, 9, 0, 3));
choices7.push(new Choice("Ask for extra logs to buy extra time while you think about this.", 1, 10, 0, 3));
choices7.push(new Choice("Open a bug report with the R&D department.", 1, 9, 0, 3));
choices8.push(new Choice("Test this expression on customer’s non-prod org", 1, 9, 0, 3));
choices8.push(new Choice("Ask about “displayOnSearch=1”on a slack channel", 1, 10, 0, 3));
choices8.push(new Choice("Tell customer that displayOnSearch=1 returns no result in nonProd org", 1, 9, 0, 3));
choices9.push(new Choice("Mention to the customer that trial orgs don’t come with free support and close the case.", 1, 9, 0, 3));
choices9.push(new Choice("Check with the Client Success Manager to see if the customer can get free support", 1, 10, 0, 3));
choices9.push(new Choice("Trigger a full rebuild on the trial org to see if there is any change on their site.", 1, 9, 0, 3));
choices9.push(new Choice("Test the full query on the trial org mentioned by the customer.", 1, 9, 0, 3));
choices10.push(new Choice("Tell the costumer that there is no match for their displayOnSearch=1 on their customerNonProdOrg1content browser", 1, 9, 0, 3));
choices10.push(new Choice("Check if there is a match for @displayfOnSearch (without a specific value) on their non-prod org", 1, 10, 0, 3));
choices10.push(new Choice("See if there is a match in their prod org, just in case", 1, 9, 0, 3));
choices.push(choices1);
choices.push(choices2);
choices.push(choices3);
choices.push(choices4);
choices.push(choices5);
choices.push(choices6);
////////////////////////////////////////////////
var context = [];
//initial context
context.push(new Context("A customer is reporting that their Query Suggestions component is not providing any suggestions. What do you do first?", false, false, 0));
//context 1
context.push(new Context("Client explians that they are creating for a new developement enviorement. It seems that the model has candidates, but they are not displayed on the Search Page.", false, false, 0));
context.push(new Context("You are on the Client's Search Page and you can see that the Query Suggestions are not provided when typing various letters in the Search Box.", false, false, 0));
context.push(new Context("You are on the Client's Cloud Organization. You browse to \"Machine Learning > Models\" and you can see the corresponding Query Suggestion model.", false, false, 0));
context.push(new Context("Client responds that everything is setup as expoected and that it is still not working.", false, false, 0));
//context 3
context.push(new Context("You can see that the Model has candidates. The only SearchHub filter value that is trained on the model is \" MySearchHub\".", true, false, 3));
context.push(new Context("You are on the Madel Testing page where you can test the Query Suggestions model directly. You can see that Query Suggestions are provided when typing various lettters in the Search Box.", false, false, 3));
//context 4
context.push(new Context("The component appears to be defined properly in the source code.", false, false, 2));
context.push(new Context("There are no errors in the console when reproducing the problematic scenario.", false, false, 2));
//context 5
context.push(new Context("You can see 2 things: <br> 1. The query parameter is the expected value that the user enters in the SearchBox <br> 2. THe SearchHub parameter is equal to \"MySearchPage\"<br> The object that is returned by the model is an empty object of the expected type, which means that the Query Suggestions model doesn't provide any suggestions for the above parameter.", true, false, 2));
context.push(new Context("All parameters are as expected on the request. THe SearchHub value is equal to \"MySearchHub\".", true, false, 2));
//context 6
context.push(new Context("You have now gathered enough information to formulate a resolution attempt to the client. Which of the following recommendations will you choose?", false, false, 5));
//ending
context.push(new Context("This solves the issue, client thanks you vary much and confirms you can close the case!", false, true, 9));
context.push(new Context("Client sends you a screenshot proof that the keyword is actually part of the candidates. This is not the right cause to this issue.", false, false, 9));
context.push(new Context("Client responds that this doesn't seem to be the cause of the issue, as the Model Testing feature provides suggestions as expected.", false, false, 9));
context.push(new Context("Client spent time training new candidates using an anoymous session. However the same issue occurs. This doesn't seem to solve the issue.", false, false, 9));
var arceus = new Arceus(context, choices);
arceus.start(0);
//arceus.giveChoice(0);
console.log(arceus);
