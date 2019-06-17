import { Choice } from '../src/choices';

const ANY_CONTENT: string = "it's a choice";
const ANY_NEXT_CONTEXT_INDEX: number= 1;
const ANY_NEXT_CHOICES_INDEX: number= 0;
const ANY_POINTS_TO_REMOVE: number= 10;
const ANY_PREVIOUS_CHOICES_INDEX: number = 4;

const ANY_CHOICE = new Choice(ANY_CONTENT, ANY_NEXT_CHOICES_INDEX, ANY_NEXT_CONTEXT_INDEX, ANY_POINTS_TO_REMOVE, ANY_PREVIOUS_CHOICES_INDEX);

test('return the choice text', () => {
    expect(ANY_CONTENT).toBe(ANY_CHOICE.getChoice());
});

test("return the next choices index", () => {
    expect(ANY_NEXT_CHOICES_INDEX).toBe(ANY_CHOICE.getNextChoices());
});

test("return the next context index", () => {
    expect(ANY_NEXT_CONTEXT_INDEX).toBe(ANY_CHOICE.getNextContext());
});

test("return the number of points to remove", () => {
    expect(ANY_POINTS_TO_REMOVE).toBe(ANY_CHOICE.getPoints());
});

test("return the number of points to remove", () => {
    expect(ANY_PREVIOUS_CHOICES_INDEX).toBe(ANY_CHOICE.getPrevious());
});


