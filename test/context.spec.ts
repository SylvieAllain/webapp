import { Context } from "../src/context";

const ANY_CONTEXT: string = "It's a context";
const ANY_IS_HINT: boolean = false;
const ANY_IS_END: boolean = false;
const ANY_PREVIOUS_CONTEXT_INDEX: number = 0;

test("return the context of the context", () => {
    var context = new Context(ANY_CONTEXT, ANY_IS_HINT, ANY_IS_END, ANY_PREVIOUS_CONTEXT_INDEX);
    expect(ANY_CONTEXT).toBe(context.getContext());
});

test("return the isHint if the answer is false", () => {
    var context = new Context(ANY_CONTEXT, ANY_IS_HINT, ANY_IS_END, ANY_PREVIOUS_CONTEXT_INDEX);
    expect(false).toBe(context.isHint());
});

test("return the isHint if the answer is true", () => {
    var isHintTrue: boolean = true;
    var context = new Context(ANY_CONTEXT, isHintTrue, ANY_IS_END, ANY_PREVIOUS_CONTEXT_INDEX);
    expect(true).toBe(context.isHint());
});

test("return the isEnd if the answer is false", () => {
    var context = new Context(ANY_CONTEXT, ANY_IS_HINT, ANY_IS_END, ANY_PREVIOUS_CONTEXT_INDEX);
    expect(false).toBe(context.isEnd());
});

test("return the isEnd if the answer is true", () => {
    var isEndTrue: boolean = true;
    var context = new Context(ANY_CONTEXT, ANY_IS_HINT, isEndTrue, ANY_PREVIOUS_CONTEXT_INDEX);
    expect(true).toBe(context.isEnd());
});

test("return the previous context index", () => {
    var context = new Context(ANY_CONTEXT, ANY_IS_HINT, ANY_IS_END, ANY_PREVIOUS_CONTEXT_INDEX);
    expect(ANY_PREVIOUS_CONTEXT_INDEX).toBe(context.getPrevious());
});