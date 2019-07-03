var choices = [];
var choices1 = [];
var choices2 = [];
var choices3 = [];
var choices4 = [];
choices1.push(new Choice("Open customer environment and look at the source", 0, 1, 32));
choices1.push(new Choice("Ask for more information like source name and org name", 1, 2, 0));
choices1.push(new Choice("Send a link from Google to the super deflection KB", 0, 6, 9999));
choices1.push(new Choice("Let the client know the next refresh should have it.", 0, 3, 47));

choices2.push(new Choice("Tell client the document is present and you can see it, no issue", 0, 7, 9999));
choices2.push(new Choice("Ask the client why is the document secured instead of public", 1, 2, 47));
choices2.push(new Choice("Ask what identity/email they have in their search", 2, 4, 0));
choices2.push(new Choice("Ask if the user should have access or not in Salesforce", 1, 2, 32));

choices3.push(new Choice("Ask client for a delegated access", 3, 5, 0));
choices3.push(new Choice("Tell client to change the filter on their page", 2, 4, 47));
choices3.push(new Choice("Even if the user should have access to the document it might be filtered out ", 2, 4, 32));
choices3.push(new Choice("Anonymous user is not a real user hence why you are not seeing the document", 0, 8, 9999));

choices4.push(new Choice("Send email of the modification to be done", 0, 9, 47));
choices4.push(new Choice("Go on meeting with customer to fix the filter with them", 0, 10, 0));
choices4.push(new Choice("Send KB to the client about the modification that should be done", 0, 11, 32));
choices4.push(new Choice("You do modification directly in their prod", 0, 12, 9999));

choices.push(choices1);
choices.push(choices2);
choices.push(choices3);
choices.push(choices4);
////////////////////////////////////////////////
var context = [];
var storyIndex = 3;
//initial context
context.push(new Context("I can't seem to find my knowledge article called \"Super deflection KB\"", false, false));
//context 1
context.push(new Context("You don’t have this information just yet.", false, false));
context.push(new Context("You can check in the Content browser, you can see the document.", false, false));
context.push(new Context("Client agreed to wait it out and then ping because the issue is still there.", false, false));
//context 2
context.push(new Context("Clients tell you the user anonymous@coveo.com.", false, false));
//context 3
context.push(new Context("Ask client for a delegated access.", false, false));
//ending
context.push(new Context("Client is unhappy and think GSA was better", false, true));
context.push(new Context("You didn't solve the issue and the customer is unsatisfied", false, true));
context.push(new Context("The issue is not solved and the client is angry", false, true));
context.push(new Context("TThe issue is solved but the client would have liked to have a personal interaction with you.", false, true));
context.push(new Context("The issue is solved and the client is really happy that you took the time to personally meet with them and guide them through the process.", false, true));
context.push(new Context("This solves the issue but the client would have appreciated if you would have taken the time to meet with them personally and guide them through the process.", false, true));
context.push(new Context("This does solve the issue but the client is angry that you went in the prod yourself and a lawsuit could be incoming for breach of contract.", false, true));

let hint = "ALWAYS ask for more information about the client's org before making do something!";

var story = new Story(context, choices, storyIndex, hint);