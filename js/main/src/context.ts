class Context {
    private text: string;
    private hint: boolean;
    private end: boolean
    private previous: number
    constructor(text: string, hint: boolean, end: boolean, previous: number) {
        this.text = text;
        this.hint = hint;
        this.end = end;
        this.previous = previous;
    }
    getContext(): string {
        return this.text;
    }
    isHint(): boolean {
        return this.hint;
    }

    isEnd(): boolean {
        return this.end;
    }
<<<<<<< HEAD:js/main/context.ts
=======

>>>>>>> 46d5b773b9ab09e27642f8cc6231e39ec63a9774:js/main/src/context.ts
    getPrevious(): number {
        return this.previous;
    }
}