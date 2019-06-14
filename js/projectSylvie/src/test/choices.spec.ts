import { Choice } from '../choices';

var choice = new Choice("it's a choice", 0, 1, 10, 4);

test('return the choice text', () => {
    expect(choice.getChoice()).toBe("it's a choice");
});

test("return the next context index", () => {

})
