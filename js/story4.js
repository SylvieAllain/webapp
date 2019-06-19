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
var choices11 = [];
var choices12 = [];

choices1.push(new Choice("Do you see an error message?", 1, 1, 0, 0));
choices1.push(new Choice("Are you sure you want to get results in the first place?", 0, 2, 0, 0));
choices1.push(new Choice("Please send logs", 1, 3, 0, 0));
choices1.push(new Choice("Is your search page accessible from outside your network?", 3, 4, 0, 0));

choices2.push(new Choice("Could you send me the query for this search and confirm the orgID and sourceName?", 10, 5, 0, 0));
choices2.push(new Choice("Could you please confirm your org / source name?", 4, 6, 0, 0));
choices2.push(new Choice("Do you have indexed documents that contain the searched keyword?", 2, 7, 0, 0));
choices2.push(new Choice("Please open another case saying that you see no results", 0, 8, 0, 0));

choices3.push(new Choice("Is your title field searchable?", 2, 9, 0, 1));
choices3.push(new Choice("Ask customer about permissions on documents", 2, 10, 0, 1));
choices3.push(new Choice("Suggest a meeting", 0, 11, 0, 1));

choices4.push(new Choice("Test this expression on customer’s non-prod org", 8, 12, 0, 0));
choices4.push(new Choice("Ask about displayOnSearchfield to the customer", 5, 13, 0, 0));
choices4.push(new Choice("Tell the customer that his query seems to be filtering results out", 5, 13, 0, 0));

choices5.push(new Choice("Suggest a meeting", 9, 11, 0, 2));
choices5.push(new Choice("What would be the full query that does not produce results ?", 9, 14, 2, 3));
choices5.push(new Choice("Try rebuilding all your sources", 9, 16, 2, 3));

choices6.push(new Choice("Ok", 0, 11, 0, 4));
choices6.push(new Choice("Let me test on my end", 7, 17, 0, 4));

choices7.push(new Choice("Suggest a meeting", 0, 11, 0, 3));
choices7.push(new Choice("Ask for extra logs to buy extra time while you think about this.", 0, 18, 0, 3));
choices7.push(new Choice("Open a bug report with the R&D department.", 0, 19, 0, 3));

//choices 8-9 are the same just diffrent routes for previous
choices8.push(new Choice("Test this expression on customer’s non-prod org", 11, 20, 0, 5));
choices8.push(new Choice("Ask about “displayOnSearch=1” on a slack channel", 0, 21, 0, 5));
choices8.push(new Choice("Tell customer that displayOnSearch=1 returns no result in nonProd org", 0, 22, 0, 5));

choices9.push(new Choice("Ask about “displayOnSearch=1”on a slack channel", 0, 21, 0, 3));
choices9.push(new Choice("Tell customer that displayOnSearch=1 returns no result in nonProd org", 0, 22, 0, 3));

//choices 10-11 are the same just diffrent routes for previous
choices10.push(new Choice("Mention to the customer that trial orgs don’t come with free support and close the case.", 0, 23, 0, 4));
choices10.push(new Choice("Check with the Client Success Manager to see if the customer can get free support", 0, 24, 0, 4));
choices10.push(new Choice("Trigger a full rebuild on the trial org to see if there is any change on their site.", 0, 25, 0, 4));
choices10.push(new Choice("Test the full query on the trial org mentioned by the customer.", 0, 26, 0, 4));

choices11.push(new Choice("Mention to the customer that trial orgs don’t come with free support and close the case.", 0, 23, 0, 1));
choices11.push(new Choice("Check with the Client Success Manager to see if the customer can get free support", 0, 24, 0, 1));
choices11.push(new Choice("Trigger a full rebuild on the trial org to see if there is any change on their site.", 0, 25, 0, 1));
choices11.push(new Choice("Test the full query on the trial org mentioned by the customer.", 0, 26, 0, 1));

choices12.push(new Choice("Tell the costumer that there is no match for their displayOnSearch=1 on their customerNonProdOrg1content browser", 0, 27, 0, 7));
choices12.push(new Choice("Check if there is a match for @displayfOnSearch (without a specific value) on their non-prod org", 0, 28, 0, 7));
choices12.push(new Choice("See if there is a match in their prod org, just in case", 0, 29, 0, 7));

choices.push(choices1);
choices.push(choices2);
choices.push(choices3);
choices.push(choices4);
choices.push(choices5);
choices.push(choices6);
choices.push(choices7);
choices.push(choices8);
choices.push(choices9);
choices.push(choices10);
choices.push(choices11);
choices.push(choices12);
////////////////////////////////////////////////
var context = [];

//initial context
context.push(new Context("I see no results", false, false, 0));

//context 
context.push(new Context("Yes, it says No results.", false, false, 0));
context.push(new Context("Is this a joke to you ?[Customer calls their CSM]You’re in trouble.", false, true, 0));
context.push(new Context("Customer sends log. You find nothing weird.", false, false, 0));
context.push(new Context("\“Of course. Please test this for yourself on dev.mysearch.site\”Testing the live website makes you realize that the query looks for documents that match the expression \“displayOnSearch=1\”", false, false, 0));

//context 2
context.push(new Context("Q: testCQ : Source=mySourceAQ : displayOnSearch=1Org : myTrialOrg2", false, false, 3));
context.push(new Context("Org : myTrialOrg2Source name : mySource(mySource contains public items).", false, false, 3));
context.push(new Context("Yes, all my documents have the same title as my keyword.", false, false, 3));
context.push(new Context("[Customer calls their CSM]You’re in trouble.", false, true, 3));

//context 3
context.push(new Context("Yes the feilds are searchable.", true, false, 7));
context.push(new Context("All the documents are public.", true, false, 7));
context.push(new Context("This was solved during the meeting : The customer had set an advanced query expression that was looking for a specific value on a field that was not indexed by Coveo.", false, true, 7));
//the one above is for every suggest a meeting route 11

//context 4
context.push(new Context("No match for this on customerNonprodOrg1", false, false, 4));
context.push(new Context("Customer says that this field is set on all items in their own system. They request a meeting to discuss this.", false, false, 4));
context.push(new Context("Customer is confused about this statement. Requests a meeting to discuss this further.", false, false, 4));

//context 5
context.push(new Context("Q: testCQ : Source=mySourceAQ : displayOnSearch=1", false, false, 6));
context.push(new Context("You die while hitting send.", false, true, 6));

//context 6
context.push(new Context("Let me test on my end.", false, false, 6));

//context 7
context.push(new Context("Struck by lightning, you die on your way to the coffee machine.", false, true, 9)); //can't go back
context.push(new Context("Dissatisfied with the poor quality of your report, your team lead frames you for murder.", false, true, 9));

//context 8
context.push(new Context("No match for this on customerNonprodOrg1", false, false, 4));
context.push(new Context("Your request is completely ignored by everyone, except for a few facepalm emoticons that are added under your request. Customer is closing the case, mentioning that a Coveo solution architect solved the issue during a call. Fail", false, true, 4));
context.push(new Context("The customer mentions that this is instance is indexing in a personal trial org. Your message got them check for the presence of this field in their content and they solved the issue on their end.Somewhat okay outcome.", false, true, 4));

//ending
context.push(new Context("The customer contacts their client executive, asking for the support they paid for through their regular prod and non prod orgs. The Client exec sets a meeting and invites you to hop in as well. The issue ends up being solved during the meeting but you sense that everyone is somewhat mad at you for pushing back.", false, true, 19));
context.push(new Context("The CSM says that this customer did pay for support and that they are entitled to open support cases even if this is involving a trial org that they created on the side. You end up solving the issue on a meeting the day after but your inbox is now full of Coveo employees inquiring about this customer.", false, true, 19));
context.push(new Context("Nothing is solved. The customer notices what you did and mentions that you just broke all sorts of crazy nonsense European laws. You are now wanted by Interpol, the French GIGN, the British Bobbies and by King Arthur’s brave knights. You quit your job and go live in the mountains with a few goats. You are kinda happy but wonder what could have been.", false, true, 19));
context.push(new Context("After some testing on the org, you notice that even if all indexed content is public, there is no match for the query they are using on their search page. You get back to the customer with a full report, mentioning that their query is looking for a specific value on a field not appearing in the index. The customer sees an error in their cloud v2 extensions and fixes the code, solving the issue in the process. They thank you for your help and tell you to close the case.", false, true, 19));
context.push(new Context("The customer mentions that this issue is not concerning a source in their non prod org, but that they are using a personal trial org. They insist on a meeting. You go on the meeting and they are passive aggressive. Everyone finds the culprit at the same time but they don’t thank you.", false, true, 19));
context.push(new Context("No match for this on customerNonprodOrg1.", false, false, 19));
context.push(new Context("There is no indexed content on prod org.", false, false, 19));

//hint
<<<<<<< HEAD
<<<<<<< HEAD
context.push(new Context("So you now know that the documents are public and the feilds are searchable.", false, false, 7));

var arceus = new Arceus(context, choices);
=======
context.push(new Context("So you now know that the documents are public and the feilds are searchable.", false, false, 6));
var storyIndex = 4;
var arceus = new Arceus(context, choices, storyIndex);
>>>>>>> 40540d148ddb44a64ac76031011d96566b5e8bc0
=======
context.push(new Context("So you now know that the documents are public and the feilds are searchable.", false, false, 6));
var storyIndex = 4;
var arceus = new Arceus(context, choices, storyIndex);
>>>>>>> 40540d148ddb44a64ac76031011d96566b5e8bc0
arceus.start(0);