class Triangle {
	constructor(top, left, right = false) {
        this.element = document.createElement('div');
        this.element.classList.add('triangle');

		this.element.addEventListener('mouseover', function() {
            this.highlight();
        }.bind(this));

		let randOpacity = getRandomInt(10, 40) / 100;

        this.element.style.borderLeftColor = 'rgba(0, 0, 0, ' + randOpacity + ')';
		this.scale = 1;
		if (right) {
			this.scale = -1;
            this.element.style.transform = 'scaleX(' + this.scale + ')';
		}

        this.element.style.top = top + "px";
        this.element.style.left = left + "px";
        UI.background.appendChild(this.element);
	}

	highlight() {
        this.element.classList.add('triangle-highlight');
        this.element.style.transform = 'scaleX(' + this.scale * -1 + ')';
		setTimeout(function() {
            this.element.classList.remove('triangle-highlight');
            this.element.style.transform = 'scaleX(' + this.scale + ')';
		}.bind(this), 500)
	}
}