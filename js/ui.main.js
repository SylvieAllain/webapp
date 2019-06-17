const TRIANGLE_HEIGHT = 52;
const TRIANGLE_LENGTH = 86;

var UI = new UIManager();

var arceus = new Arceus(finalChoices, context, 1);

var triangles = [];

// Create the triangles with the proper size & position, push them in an array
for (let i = 0; i < $(window).innerWidth() / TRIANGLE_LENGTH; i++) {
	for (let j = 0; j < $(window).innerHeight() / TRIANGLE_HEIGHT; j++) {
		let Y = j * TRIANGLE_HEIGHT * 2;
		if (i % 2 != 0) {
			Y = j * TRIANGLE_HEIGHT * 2 - TRIANGLE_HEIGHT;
		}

		triangles.push(new Triangle(Y, i * TRIANGLE_LENGTH));
		triangles.push(new Triangle(Y - TRIANGLE_HEIGHT, i * TRIANGLE_LENGTH, true));
	}
}

// Sets 20 initial triangles to be highlighted, so it can get the things going
for (let i = 0; i < 20; i++) {
	let randomTriangle = triangles[getRandomInt(0, triangles.length - 1)];
	randomTriangle.element.classList.add('triangle-highlight');
}

// Randomly highlight triangles, because it's pretty
setInterval(function() {

	// Spawning Flappeo, the Coveo bird
	if (UI.questionTimer < UI.initialTimer && !UI.flappeo.flying) {
		if (getRandomInt(1, 1) == 1 || UI.questionTimer < 45) {
			UI.flappeo.element.style.visibility = "visible";
			UI.coveoLogoImage.style.backgroundImage = 'url("image/logo.png")';
			UI.flappeo.fly();
		}
	}

	let randomTriangle = triangles[getRandomInt(0, triangles.length - 1)];
	let highlightedTriangles = document.getElementsByClassName('triangle-highlight');
	let randomHighlightedTriangle = highlightedTriangles[getRandomInt(0, highlightedTriangles.length - 1)];
	
	randomTriangle.element.classList.add('triangle-highlight');
	randomHighlightedTriangle.classList.remove('triangle-highlight');
}, 250);