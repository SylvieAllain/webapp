class UIManager {
	constructor() {
        this.initialTimer = 120;
		this.background = document.getElementById('background');
        this.gameContainer = document.getElementById('game-container');
        this.gameChoices = document.getElementById('game-choices');
        this.playButton = document.getElementById('play-button');
        this.coveoLogoImage = document.getElementById('coveo-logo-image');
        this.coveoLogoContainer = document.getElementById('coveo-logo');
        this.coveoLogoContainerTitle = document.getElementById('coveo-logo-container-title');
        this.timer = document.getElementById('timer');
        this.timerBar = document.getElementById('timer-bar');
        this.timerOrangeBar = document.getElementById('timer-orange-bar');
        this.timerText = document.getElementById('timer-text');
        this.choiceButtons = [];
        this.flappeo = new Flappeo();
        this.clock = new Clock('clock');
        this.playButton.addEventListener('click', function() {
            this.showAdventure();
        }.bind(this));
        this.setTimer();
	}

    offsetLeft(element) {
        return element.getBoundingClientRect().x;
    }

    offsetTop(element) {
        return element.getBoundingClientRect().y
    }

    showAdventure() {
        this.playButton.style.animation = "none";
        let logoX = this.offsetLeft(this.coveoLogoImage) + this.coveoLogoImage.offsetWidth / 2 + 53;
        let logoY = this.offsetTop(this.coveoLogoImage) + this.coveoLogoImage.offsetHeight / 2 - 21;
        let buttonX = this.offsetLeft(this.playButton) + this.playButton.offsetWidth / 2;
        let buttonY = this.offsetTop(this.playButton) + this.playButton.offsetHeight / 2;
        let diffX = logoX - buttonX;
        let diffY = logoY - buttonY;
        var self = this;

        $("#play-button").animate({
            left: "+=" + diffX,
            top: "+=" + diffY,
            width: "50px"
        }, 100, function() {
            self.playButton.style.opacity = 0;
            self.coveoLogoImage.style.backgroundImage = 'url("image/logo_orange.png"), url("image/logo.png")';
            $("#coveo-logo-image").addClass('coveo-logo-phase-1').delay(300).queue(function() {
                self.coveoLogoImage.style.backgroundImage = 'url("image/logo_orange.png")';
                $(this).dequeue().delay(200).queue(function() {
                    self.coveoLogoImage.className = '';
                    self.coveoLogoContainer.classList.add('coveo-logo-corner');
                    self.coveoLogoContainerTitle.classList.add('coveo-logo-title-corner');
                    $(this).dequeue().delay(500).queue(function() {
                        self.start();
                    });
                });
            });
        });
    }

	addButton(choice, goBack = false) {
        let button = document.createElement('button');
        button.classList.add('choice-button');
        button.innerHTML = choice.getChoice();
        this.gameChoices.appendChild(button);
        this.choiceButtons.push(button);
        let buttonIndex = this.choiceButtons.length - 1;
        button.addEventListener('click', function() {
            arceus.setChoices(buttonIndex);
            this.nextChoices(buttonIndex);
        }.bind(this));

        if (goBack) {
            button.classList.add('choice-button-goback')
        }
	}

    addBackButton() {
        this.addButton("&larrhk;", true);
    }

	clearButtons() {
		this.gameChoices.innerHTML = "";
		this.choiceButtons = [];
	}

	setTimer(timer = this.initialTimer) {
		this.questionTimer = timer;
		this.questionShaking = false;
		this.questionZooming = false;
        this.questionInitialTimestamp = this.questionTimer * 1000;
		this.questionLastTimestamp = this.questionInitialTimestamp;
		this.questionCurrentTimestamp = this.questionInitialTimestamp;
        this.timerText.textContent = this.getFormatedTimer();
        this.updateTimerBar();
	}

    getFormatedTimer() {
        let date = new Date(null);
        date.setSeconds(this.questionTimer);
        let time = date.toISOString().substr(15, 4);
        return time;
    }

    resetBoxChoices() {
        this.gameChoices.className = '';
        this.timer.className = '';
        this.timerBar.style.width = 0;
        this.timerText.style.color = "#FFFFFF";
    }

	nextChoices(selectedIndex) {
        let selectedButton = this.choiceButtons[selectedIndex];
        this.clearButtons();
        let choices = arceus.getChoices();
        console.log(choices);
        choices.forEach(function(choice) {
            this.addButton(choice);
        }.bind(this));
        selectedButton.classList.add('choice-selected');
        let buttons = document.getElementsByClassName('choice-button');
        buttons.disabled = true;
		
        this.gameContainer.className = '';
		this.choiceButtons.forEach(function(button) {
			let yDiff = this.offsetTop(selectedButton) - this.offsetTop(button);
			if (button != selectedButton) {
				$(button).animate({
					top: "+=" + yDiff,
					opacity: 0.75
				}, 50, function() {
					button.style.visibility = "hidden";
				});
			}
		}.bind(this));

        var self = this;
		$(this.gameContainer).delay(500).queue(function() {
			$(self.gameContainer).addClass('quiz-box-disappear').delay(500).queue(function() {
				self.gameContainer.style.display = "none";
				self.clearButtons();
				self.resetBoxChoices();
                self.gameContainer.classList.remove('quiz-box-disappear');
				$(this).dequeue();
			}).delay(250).queue(function() {
                self.gameContainer.style.display = 'flex';
                self.gameContainer.classList.add('quiz-box-appear');
				$(this).dequeue();
			}).delay(250).queue(function() {
                self.gameContainer.classList.remove('quiz-box-appear');
				$(this).dequeue();
			}).queue(function() {
				$(this).dequeue();
			});
			$(this).dequeue();
		});
    }

    endAdventure() {
        window.clearInterval(this.shakeBoxInterval);
        this.playButton.style.display = "none";
    }

    start() {
        this.clock.run();
        this.shakeBoxInterval = setInterval(function() {
            this.timerLoop();
        }.bind(this), 1000 / 60);
        this.gameContainer.style.display = 'flex';
        this.gameContainer.classList.add('quiz-box-appear');
        arceus.start(0, 0);

        // Method context


        // Method choices
        let choices = arceus.getChoices();
        choices.forEach(function(choice) {
            this.addButton(choice);
        }.bind(this));
    }

    timerLoop() {
        if (this.questionCurrentTimestamp >= 0) {
            this.questionCurrentTimestamp -= 1000 / 60;
            if (this.questionLastTimestamp - this.questionCurrentTimestamp >= 1000) {
                let diff = this.questionCurrentTimestamp % 1000;
                this.questionLastTimestamp = this.questionCurrentTimestamp;
                this.questionTimer--;
                if (this.questionTimer < 0) {
                    this.questionTimer = 0;
                }
    
                if (this.questionTimer <= 120) {
                    if (!this.questionZooming) {
                        this.questionZooming = true;
                        this.gameChoices.classList.add('box-urgent');
                        this.timer.classList.add('timer-urgent');
                        this.timer.style.color = 'orange';
                        this.clock.urgent();
                    }
                }
                if (this.questionTimer <= 30) {
                    if (!this.questionShaking) {
                        this.questionShaking = true;
                        this.shakeBox();
                        this.gameChoices.classList.add('box-super-urgent');
                        this.timer.style.color = 'red';
                        this.timer.classList.add('timer-super-urgent');
                        this.clock.superUrgent();
                    }
                }
            }
        } else {
            this.questionTimer = 0;
            this.questionCurrentTimestamp = 0;
        }
        this.updateTimerBar();
    }

    updateTimerBar() {
        this.timerText.textContent = this.getFormatedTimer();
        let barPercentage = 100 - this.questionCurrentTimestamp / this.questionInitialTimestamp * 100;
        this.timerBar.style.width = barPercentage + "%";
    }

    shakeBox() {
        let self = this;
        if (this.questionZooming) {
            let shakeTime = 50;
            $("#game-container").animate({
                left: "-=10",
                top: "+=5"
            }, shakeTime, function() {
                $("#game-container").animate({
                    left: "+=10",
                    top: "-=5"
                }, shakeTime, function() {
                    $("#game-container").animate({
                        left: "+=10",
                        top: "-=5"
                    }, shakeTime, function() {
                        $("#game-container").animate({
                            left: "-=10",
                            top: "+=5"
                        }, shakeTime, function() {
                            $("#game-container").animate({
                                left: "+=10",
                                top: "+=5"
                            }, shakeTime, function() {
                                $("#game-container").animate({
                                    left: "-=10",
                                    top: "-=5"
                                }, shakeTime, function() {
                                    $("#game-container").animate({
                                        left: "-=10",
                                        top: "-=5"
                                    }, shakeTime, function() {
                                        $("#game-container").animate({
                                            left: "+=10",
                                            top: "+=5"
                                        }, shakeTime).delay(500).queue(function() {
                                            self.shakeBox();
                                            $(this).dequeue();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    }
}