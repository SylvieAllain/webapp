export class Answer {
    private content: string;
    private path: number;
    constructor(content: string, path: number) {
        this.content = content;
        this.path = path;
    }

    getContent(): string {
        return this.content;
    }

    getPath(): number {
        return this.path;
    }
}