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

    getPrevious(): number {
        return this.previous;
    }
}