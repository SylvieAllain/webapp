class Context {
    constructor(text, hint, end) {
        this.text = text;
        this.hint = hint;
        this.end = end;
    }

    changeHintStatus() {
        this.hint = false;
    }

    getContext() {
        return this.text;
    }

    isHint() {
        return this.hint;
    }

    isEnd() {
        return this.end;
    }
}
