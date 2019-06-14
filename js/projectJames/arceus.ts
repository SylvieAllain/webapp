class Arceus {

    private initialContextIndex: number;
    private context: Context[] = [];
    private choice: Choice[][] = [];
    private points: number = 0;
    private nodes: Node; 
    private currentContextIndex: number = 0;

    constructor(context: Context[], choice: Choice[][]) {
        this.context = context;
        this.choice = choice
        this.nodes = nodes;
    }

    giveChoices(index: number) {
        this.choice[index];
        this.nextNode;
    }

    getContext(index: number) {
        return this.context[index];
    }

    getCurrentContextIndex() {
        return this.currentContextIndex;
    }

    getChoices(index: number) {
        return this.choice[index];
    }

    nextNode(index: number) {
        this.currentContextIndex = index;

        /*
        console.log(this.context[this.currentContextIndex].getContext());
        let answers = this.choice[this.currentContextIndex];
        answers.forEach(function (choice, i) {
            console.log((i + 1) + ". " + answer.getChoices());
        });
        */
    }

    addPoints(amount: number) {
        this.points = this.points + amount;
        return this.points;
    }

    getPoints() {
        return this.points;
    }

    reset() {
        this.points = 0;
        this.context[this.initialContextIndex];
    }
    
    start(questionIndex: number) {
        this.initialContextIndex = questionIndex;
        this.nextNode(this.initialContextIndex);
    }
}