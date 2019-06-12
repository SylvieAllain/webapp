class Question {
    private text: string;
    constructor(text: string) {
        this.text = text;
    }
    getQuestion() {
        return this.text;
    }
}