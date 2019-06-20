class Clock {
    constructor(element, initialTimer) {
        this.element = document.getElementById(element);

        this.minutesHandElement = document.createElement('div');
        this.minutesHandElement.setAttribute('class', 'clock-hand');

        this.secondsHandElement = document.createElement('div');
        this.secondsHandElement.setAttribute('class', 'clock-hand');

        this.secondsHandAngle = 0;

        let minutesStart = (initialTimer % 60) / 60;
        this.minutesHandAngle = 360 * minutesStart;

        this.element.appendChild(this.minutesHandElement);
        this.element.appendChild(this.secondsHandElement);

        this.lastTimestamp = 0;
    }
    
    run(initialTimestamp) {
        this.lastTimestamp = initialTimestamp;
        console.log(initialTimestamp);
    }

    update(currentTimestamp) {
        let diffTimestamp = this.lastTimestamp - currentTimestamp;
        this.lastTimestamp = currentTimestamp;

        this.secondsHandAngle -= diffTimestamp * 0.36;
        this.minutesHandAngle -= diffTimestamp * 0.006;
        this.secondsHandElement.style.transform = "translateX(-50%) translateY(-100%) rotate(" + this.secondsHandAngle + "deg)";
        this.minutesHandElement.style.transform = "translateX(-50%) translateY(-100%) rotate(" + this.minutesHandAngle + "deg)";
    }

    urgent() {
        this.element.classList.add('clock-urgent');
        this.minutesHandElement.classList.add('clock-hand-urgent');
        this.secondsHandElement.classList.add('clock-hand-urgent');
    }

    superUrgent() {
        this.element.classList.add('clock-super-urgent');
        this.minutesHandElement.classList.add('clock-hand-super-urgent');
        this.secondsHandElement.classList.add('clock-hand-super-urgent');
    }
}