import { Choice } from '../choices';

const ANY_CHOICE = new Choice("it's a choice", 0, 1, 10, 4);

test('return the choice text', () => {
    expect("it's a choice").toBe(ANY_CHOICE.getChoice());
});

test("return the next context index", () => {
    expect(1).toBe(ANY_CHOICE.getNextContext());
})
