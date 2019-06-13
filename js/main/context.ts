class Context {
    private text: string;
    private hint: boolean;
    private end: boolean
    constructor(text: string, hint: boolean, end: boolean) {
        this.text = text;
        this.hint = hint;
        this.end = end;
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
}
