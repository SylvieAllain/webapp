var choices = [];
var choices1 = [];
var choices2 = [];
var choices3 = [];
var choices4 = [];
var choices5 = [];
var choices6 = [];
var choices7 = [];
choices1.push(new Choice("Open The Customer Cloud Platform and look at his sources", 1, 1, 0));
choices1.push(new Choice("Ask for more information such as which source and for how long this has happened", 2, 2, 0));
choices1.push(new Choice("Send the customer some documentation on how to set a refresh schedule", 0, 3, 0));
choices1.push(new Choice("Log into Kibana to look at logs", 0, 4, 0));

choices2.push(new Choice("Ask the customer which of the 2 sources is the one not indexing.", 2, 5, 0));
choices2.push(new Choice("Tell the customer your observation regarding the 2 sources in error.", 3, 6, 0));
choices2.push(new Choice("Launch a Rebuild on both sources to try and resolve the issue.", 1, 7, 0));

choices3.push(new Choice("Look at Kibana logs for their KB sources with the date of the error", 4, 8, 0));
choices3.push(new Choice("Look at the log browser in their organization", 2, 9, 10));
choices3.push(new Choice("Look at the source configuration to see if there's anything wrong with it", 2, 9, 0));
choices3.push(new Choice("Click on the 'Required Rebuild' button on the source", 2, 10, 0));

choices4.push(new Choice("Split your case so that we keep issue separated", 2, 11, 0));
choices4.push(new Choice("Cancel all current operation on both sources and trigger a Rebuild", 3, 12, 0));
choices4.push(new Choice("Look at the Error code and date of the error to confirm if there's a pattern", 4, 14, 0));

choices5.push(new Choice("You Notify the customer that the issue was due to the Crawling Server not being available", 4, 15, 0));
choices5.push(new Choice("Tell the customer that it was a temporary issue. Cancel the current Rebuild or Resume it's operation to resolve the issue", 5, 16, 0));
choices5.push(new Choice("See if there were any planned maintenance for Salesforce at the specified time since the 503 error happened on a Salesforce source.", 6, 17, 0));
choices5.push(new Choice("You look into the 503 Issue with the R&D team", 4, 18, 0));

choices6.push(new Choice("Investigate the 503 Error with the R&D Team.", 5, 18, 0));
choices6.push(new Choice("Explain the 503 Error code to the customer and what it means.", 5, 19, 0));
choices6.push(new Choice("Look at the Salesforce Status and Maintenance page to confirm if the server could have been unavailable", 6, 17, 0));

choices7.push(new Choice("Tell the customer that the issue happened due to a Salesforce Maintenance. Provide the link to the known issue. Then tell him he needs to either resume the current operation or cancel it and start a new one.", 6, 20, 0));
choices7.push(new Choice("Tell the customer that the issue happened due to a Salesforce Maintenance. Provide the link to the known issue.  Then tell him that you've Canceled the current operation and started a Rebuild.", 6, 21, 10));
choices7.push(new Choice("Tell the customer that the issue happened due to a Salesforce Maintenance. Provide the link to the known issue. Then tell the customer to start a Rebuild.", 6, 22, 5));
choices.push(choices1);
choices.push(choices2);
choices.push(choices3);
choices.push(choices4);
choices.push(choices5);
choices.push(choices6);
choices.push(choices7);
////////////////////////////////////////////////
var context = [];
var storyIndex = 2;
//initial context
context.push(new Context("A customer is reporting that the latest content of it's Salesforce source is not being indexed.", false, false));
//context 1
context.push(new Context("You notice that the customer has 3 different Salesforce sources. And that 2 of them are currently paused in errors.", false, false));
context.push(new Context("The customer tells you that his 'Knowledge' source doesn't seem to index the new Kb.", false, false));
context.push(new Context("The Customer tells you that a schedule is already set on the source.", false, false));
context.push(new Context("There's just too many information and you've lost about 30 minutes trying to look at all the logs for the past 3 days in the customer org without finding anything.", false, false));
//context 2
context.push(new Context("The customer tells you that his KB Source is currently the one causing an issue.", false, false));
context.push(new Context("The customer tells you that he didn't know and would like you to resolve both sources in error.", false, false));
context.push(new Context("Nothing happens, the source state doesn't change and remains 'Paused on Error',", false, false));
//context 3
context.push(new Context("You noticed that the source entered this state after a 503 Service Unavailable Error.", false, false));
context.push(new Context("You do not seem to be able to find anything relevant.", false, false));
context.push(new Context("Nothing happens, the source state doesn't change and remains 'Paused on Error'.", false, false));
//context 4
context.push(new Context("Both issues were related so you'll do double the work for nothing. But lets keep going.", false, false));
context.push(new Context("Someone in the customer organization had made changes to the case source and the new condition made it so that almost all content was deleted in Production.", false, true));
context.push(new Context("Customer escalate the issue into a higher one and escalate the case. You created work for the ops team which need to restore a backup and made a change you weren't allowed to.", false, true));
context.push(new Context("Both issues happened on the same day within 1 minute of themselves and the Error Code in the Activity Browser is the same ERROR: 503 Service Unavailable.", false, false));
//context 5
context.push(new Context("The customer does not fully understand and mentions that there were no report on their side. They want more info and the issue is not resolved.", false, false));
context.push(new Context("The customer follows your instructions and the issue is resolved, but they want to know the root cause of the issue.", false, false));
context.push(new Context("You notice that Salesforce had a planned maintenance with disruption of service (Specifically SOQL and REST API services) at the date of the issue.", false, false));
context.push(new Context("R&D tells you that there weren't any issue with our Crawling servers and that the 503 happened on the Customer Side. Probably a Maintenance at large or on the customer side.", false, false));
//context 6
context.push(new Context("The customer let you know that they understand what a 503 means, but that they didn't receive users report stating that the Salesforce instance was unavailable at said time.", false, false));
//ending
context.push(new Context("You've resolved the issue and the customer is happy to know the root cause. You can close the case.", false, true));
context.push(new Context("You've resolved the issue, however the customer doesn't like that you triggered an unauthorized rebuild in is production org and if there is any issue after the rebuild could come back with it's legal team against us.", false, true));
context.push(new Context("The customer is happy that you found the root cause, but the Rebuild didn't resolve the issue and the source is still paused on error.", false, true));

let hint = "Don't do anything in the client's org on your own. Make the client do it.";

var story = new Story(context, choices, storyIndex, hint);