import { Arceus } from "../arceus";
import { Choice } from "../choices";
import { Context } from "../context";
import { UIMaker } from "../uimaker";

const ANY_CHOICE_1 = new Choice("Answer1", 0, 1, 0, 0);
const ANY_CHOICE_2 = new Choice("Answer2", 1, 0, 10, 0);
const ANY_CHOICE_3 = new Choice("Answer3", 0, 1, 20, 0);
const ANY_CHOICE_4 = new Choice("Answer4", 1, 0, 30, 0);
const ANY_CHOICES_1: Choice[] = [ANY_CHOICE_1, ANY_CHOICE_2];
const ANY_CHOICES_2: Choice[] = [ANY_CHOICE_3, ANY_CHOICE_4];
const FINAL_CHOICES: Choice[][] = [ANY_CHOICES_1, ANY_CHOICES_2];
const ANY_CONTEXT_1 = new Context("Context1", false, false, 1);
const ANY_CONTEXT_2 = new Context("Context2", false, false, 0);
const CONTEXTS: Context[] = [ANY_CONTEXT_1, ANY_CONTEXT_2];
const INITIAL_TOTAL_POINTS = 500;
const ANY_UIMAKER = new UIMaker();
const ANY_STORY: number = 1;

// Tests that affect the context
test("When arceus received a context index, the context text is changed",() => {
    var arceus = new Arceus(FINAL_CHOICES, CONTEXTS, ANY_STORY, ANY_UIMAKER);
    var receivedIndex = 1;
    var expectedContextText = ANY_CONTEXT_2.getContext();
    var actualContextText = arceus.getContext(receivedIndex);
    expect(expectedContextText).toBe(actualContextText);
})

/*test("The context's index is changed by the user's choice", () => {
    var arceus = new Arceus(FINAL_CHOICES, CONTEXTS, ANY_STORY, ANY_UIMAKER);
    var expectedContextIndex = 1;
    arceus.setChoices(0);
    expect(expectedContextIndex).toBe(arceus.getCurrentContextIndex());
});*/

/*test("The context's content is changed by the user's choice", () => {
    var arceus = new Arceus(FINAL_CHOICES, CONTEXTS, ANY_STORY, ANY_UIMAKER);
    arceus.setChoices(0);
    var expectedContextContent: string = ANY_CONTEXT_2.getContext();
    var actualCurrentContextIndex: number = arceus.getCurrentContextIndex();
    var actualCurrentContextText: string = arceus.getContext(actualCurrentContextIndex);
    expect(expectedContextContent).toBe(actualCurrentContextText);
});*/

test("The user made a choice, then he wants to go back, then the context index is changed", () => {
    var arceus = new Arceus(FINAL_CHOICES, CONTEXTS, ANY_STORY, ANY_UIMAKER);
    arceus.setChoices(0);
    var expectedContextIndex:number = 0;
    var actualContextIndex: number = arceus.getPreviousContext();
    expect(expectedContextIndex).toBe(actualContextIndex);
});

// Tests that affect the choices
/*test("When the user starts the game, the first index of Choices is available", () => {
    var arceus = new Arceus(FINAL_CHOICES, CONTEXTS, ANY_STORY, ANY_UIMAKER);
    var expectedChoicesIndex: number = 0;
    var actualChoicesIndex: number = arceus.getCurrentChoicesIndex();
    expect(expectedChoicesIndex).toBe(actualChoicesIndex);
});*/

test("When the user starts the game, the first array of content of Choices is available", () => {
    var arceus = new Arceus(FINAL_CHOICES, CONTEXTS, ANY_STORY, ANY_UIMAKER);
    var expectedArrayOfChoices: Choice[] = ANY_CHOICES_1;
    var actualArrayOfChoices: Choice[] = arceus.getChoices();
    expect(expectedArrayOfChoices).toBe(actualArrayOfChoices);
});

/*test("When the user starts the game, the index of the first array of Choices is available", () => {
    var arceus = new Arceus(FINAL_CHOICES, CONTEXTS, ANY_STORY, ANY_UIMAKER);
    var expectedChoicesIndex: number = 1;
    arceus.setChoices(1);
    var actualChoicesIndex: number = arceus.getCurrentChoicesIndex();
    expect(expectedChoicesIndex).toBe(actualChoicesIndex);
});*/

test("When the user made a choice, then he wants to go back, the previous choices index is available", () => {
    var arceus = new Arceus(FINAL_CHOICES, CONTEXTS, ANY_STORY, ANY_UIMAKER);
    arceus.setChoices(1);
    var newChoicesIndex = arceus.getPreviousChoices();
    var expectedChoicesIndex:number = 0;
    var actualChoicesIndex = newChoicesIndex;
    expect(expectedChoicesIndex).toBe(actualChoicesIndex);
});

// Tests that affect the total points
test("The user wants to get the total points he got", () => {
    var arceus = new Arceus(FINAL_CHOICES, CONTEXTS, ANY_STORY, ANY_UIMAKER);
    var expectedPoints = INITIAL_TOTAL_POINTS;
    expect(expectedPoints).toBe(arceus.getPoints());
});

test("When some points are removed from the total, the total points is changed", () => {
    var arceus = new Arceus(FINAL_CHOICES, CONTEXTS, ANY_STORY, ANY_UIMAKER);
    arceus.removePoints(50);
    var expectedPoints: number = 450;
    expect(expectedPoints).toBe(arceus.getPoints());
});

test("The user choosed a wrong answer, then some points are removed from the total", () => {
    var arceus = new Arceus(FINAL_CHOICES, CONTEXTS, ANY_STORY,  ANY_UIMAKER);
    arceus.setChoices(1);
    var expectedPoints: number = 490;
    expect(expectedPoints).toBe(arceus.getPoints());
});

test("the user choosed a good answer, then no points are removed from the total", () => {
    var arceus = new Arceus(FINAL_CHOICES, CONTEXTS, ANY_STORY, ANY_UIMAKER);
    arceus.setChoices(0);
    var expectedPoints: number = 500;
    expect(expectedPoints).toBe(arceus.getPoints());
});

test("the user choosed two wrongs answer, then the total points is changed", () => {
    var arceus = new Arceus(FINAL_CHOICES, CONTEXTS, ANY_STORY, ANY_UIMAKER);
    arceus.setChoices(1);
    arceus.setChoices(0);
    arceus.setChoices(1);
    var expectedPoints: number = 460;
    expect(expectedPoints).toBe(arceus.getPoints());
});