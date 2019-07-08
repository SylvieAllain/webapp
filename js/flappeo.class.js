class Flappeo {
	constructor() {
        this.flappeoScale = -1;
        let canvas = document.getElementById('flappeo-playground');
		this.element = document.createElement('div');
		this.element.setAttribute('class', 'flappeo');
		canvas.appendChild(this.element);
        this.clicked = false;
        this.flying = false;
        this.element.addEventListener('click', function() {
            if (!this.clicked) {
                this.clicked = true;
                $(this.element).stop();
                this.evade();
            }
        }.bind(this));
	}

    evade() {
        let currentX = this.element.getBoundingClientRect().left;
        let currentY = this.element.getBoundingClientRect().top;

        let hintZoneX = window.innerWidth * 0.38;
        let hintZoneY = 50;

        this.turnAround(currentX, hintZoneX);
        
        let diffX = hintZoneX - currentX;
        let diffY = hintZoneY - currentY;
            
        let time = this.time = this.getFlyDistance(diffX, diffY) * 2;

        let self = this;

        $(this.element).animate({
            top: "+=" + diffY,
            left: "+=" + diffX
        }, time).delay(500).queue(function() {
            self.giveHint();
            $(this).dequeue();
        }).delay(2000).queue(function() {
            self.flyAway();
            $(this).dequeue();
        });
    }

    fly() {
        this.flying = true;
        setTimeout(function() {
            this.flyAround();
        }.bind(this), 5000);
    }

    flyAround() {
        if (!this.clicked) {
            let xRange = [0, $(window).innerWidth()];
            let yRange = [0, $(window).innerHeight() - 300];
            
            let newX = getRandomInt(xRange[0], xRange[1]);
            let newY = getRandomInt(yRange[0], yRange[1]);
            
            let currentX = parseInt($(this.element).css('left'));
            let currentY = parseInt($(this.element).css('top'));
            
            this.turnAround(currentX, newX);
            
            let diffX = newX - currentX;
            let diffY = newY - currentY;
            
            let time = this.time = this.getFlyDistance(diffX, diffY) * 10;

            $(this.element).animate({
                top: "+=" + diffY,
                left: "+=" + diffX
            }, time, function() {
                this.flyAround();
            }.bind(this));
        }
    }

    flyAway() {
        let left = -400 * this.flappeoScale;
        this.element.style.transform = "scaleX(" + this.flappeoScale * -1 + ") rotate(-25deg)";
        $(this.element).animate({
            top: "-=110%",
            left: "+=" + left
        }, 2000);
    }

    getFlyDistance(x, y) {
        return Math.round(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
    }

    giveHint() {
        let hintElement = document.createElement('div');
        hintElement.setAttribute('class', 'flappeo-hint');

        let hintBubbleElement = document.createElement('div');
        hintBubbleElement.setAttribute('class', 'flappeo-hint-bubble');
        hintElement.appendChild(hintBubbleElement);

        let hintTextElement = document.createElement('div');
        hintTextElement.setAttribute('class', 'flappeo-hint-text-bubble');
        hintBubbleElement.appendChild(hintTextElement);

        let hintSmallBubble1Element = document.createElement('div');
        hintSmallBubble1Element.setAttribute('class', 'flappeo-hint-small-bubble-1');
        hintBubbleElement.appendChild(hintSmallBubble1Element);

        let hintSmallBubble2Element = document.createElement('div');
        hintSmallBubble2Element.setAttribute('class', 'flappeo-hint-small-bubble-2');
        hintBubbleElement.appendChild(hintSmallBubble2Element);

        document.body.appendChild(hintElement);
        
        let flappeoX = this.element.offsetLeft;
        let flappeoY = this.element.offsetTop;

        let newX = flappeoX + this.element.getBoundingClientRect().width;
        let newY = flappeoY + this.element.getBoundingClientRect().height + 30;

        if (this.flappeoScale == 1) {
            hintElement.style.transform = "scaleX(1)";
            newX -= this.element.getBoundingClientRect().width * 2;
            hintTextElement.style.transform = "scaleX(1)";
        } else {
            newX += this.element.getBoundingClientRect().width;
        }

        hintElement.style.top = newY + "px";
        hintElement.style.left = newX + "px";

        hintTextElement.innerHTML = "<i>*psst*</i> " + arceus.getStoryHint();
    }

    isClicked() {
        return this.clicked;
    }

    turnAround(fromPosition, toPosition) {
        this.flappeoScale = Math.sign(fromPosition - toPosition);
        $(this.element).css('transform', 'scaleX(' + this.flappeoScale * -1 + ')');
    }
}