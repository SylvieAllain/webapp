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
            this.clicked = true;
            $(this.element).stop();
            this.giveHint();
            setTimeout(() => { this.evade(); }, 2000);
        }.bind(this));
	}
    
    animate() {
        if (!this.clicked) {
            let xRange = [0, $(window).innerWidth()];
            let yRange = [0, $(window).innerHeight() - 300];
            
            let newX = getRandomInt(xRange[0], xRange[1]);
            let newY = getRandomInt(yRange[0], yRange[1]);
            
            let currentX = parseInt($(this.element).css('left'));
            let currentY = parseInt($(this.element).css('top'));
            
            this.flappeoScale = Math.sign(currentX - newX);
            
            $(this.element).css('transform', 'scaleX(' + this.flappeoScale * -1 + ')');
            
            let xDiff = newX - currentX;
            let yDiff = newY - currentY;
            let zDistance = Math.round(Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)));
            
            let time = this.time = zDistance * 10;

            $(this.element).animate({
                top: "+=" + yDiff,
                left: "+=" + xDiff
            }, time, function() {
                this.animate();
            }.bind(this));
        }
    }

    evade() {
        let left = -400 * this.flappeoScale;
        this.element.style.transform = "scaleX(" + this.flappeoScale * -1 + ") rotate(-25deg)";
        $(this.element).animate({
            top: "-=110%",
            left: "+=" + left
        }, 2000);
    }

    fly() {
        this.flying = true;
        setTimeout(function() {
            this.animate();
        }.bind(this), 5000);
    }

    giveHint() {
        let hintElement = document.createElement('div');
        hintElement.setAttribute('class', 'flappeo-hint');

        let hintTextElement = document.createElement('div');
        hintTextElement.setAttribute('class', 'flappeo-hint-text-bubble');
        hintElement.appendChild(hintTextElement);

        let hintSmallBubble1Element = document.createElement('div');
        hintSmallBubble1Element.setAttribute('class', 'flappeo-hint-small-bubble-1');
        hintElement.appendChild(hintSmallBubble1Element);

        let hintSmallBubble2Element = document.createElement('div');
        hintSmallBubble2Element.setAttribute('class', 'flappeo-hint-small-bubble-2');
        hintElement.appendChild(hintSmallBubble2Element);

        document.body.appendChild(hintElement);
        
        let flappeoX = this.element.offsetLeft;
        let flappeoY = this.element.offsetTop;

        let newX = flappeoX + this.element.getBoundingClientRect().width;
        let newY = flappeoY + this.element.getBoundingClientRect().height + 30;

        if (this.flappeoScale == 1) {
            hintElement.style.transform = "scaleX(1)";
            hintTextElement.style.transform = "scaleX(1)";
        }

        console.log(hintElement.getBoundingClientRect().width);

        hintElement.style.top = newY + "px";
        hintElement.style.left = newX + "px";

        hintTextElement.innerHTML = arceus.getStoryHint();
    }

    isClicked() {
        return this.clicked;
    }
}