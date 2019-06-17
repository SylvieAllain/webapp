class Clock {
    constructor(element) {
        this.element = document.getElementById(element);

        this.minutesHandElement = document.createElement('div');
        this.minutesHandElement.setAttribute('class', 'clock-hand');

        this.secondsHandElement = document.createElement('div');
        this.secondsHandElement.setAttribute('class', 'clock-hand');

        this.element.appendChild(this.minutesHandElement);
        this.element.appendChild(this.secondsHandElement);
    }
    
    run() {
        this.minutesHandElement.classList.add('clock-hand-minutes');
        this.secondsHandElement.classList.add('clock-hand-seconds');
    }

    urgent() {
        this.element.classList.add('clock-urgent');
        this.minutesHandElement.classList.add('clock-urgent');
        this.secondsHandElement.classList.add('clock-urgent');
    }

    superUrgent() {
        this.element.classList.add('clock-super-urgent');
        this.minutesHandElement.classList.add('clock-super-urgent');
        this.secondsHandElement.classList.add('clock-super-urgent');
    }
}