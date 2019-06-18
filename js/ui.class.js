class UserInterface {
	constructor() {
        this.initialTimer = 2;
        this.choiceButtons = [];
        
        this.setElements();

        this.flappeo = new Flappeo();
        this.clock = new Clock('clock');
        this.setTimer();
	}

    addButton(choice, goBack = false) {
        let button = document.createElement('button');
        button.classList.add('choice-button');
        button.innerHTML = choice.getChoice();
        this.gameChoices.appendChild(button);
        this.choiceButtons.push(button);
        let buttonIndex = this.choiceButtons.length - 1;
        $(button).on('click', function() {
            this.stopTimer();
            $(button).off();
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

    disableSuperUrgentMode() {
        this.gameChoices.className = "";
        this.timerBarContainer.className = "";
        this.timer.className = "";
    }

    displayNextChoices() {
        this.setContext();
        this.setChoicesButtons();

        this.gameContainer.style.display = 'flex';
        this.gameContainer.classList.add('quiz-box-appear');
    }

    enableSuperUrgentMode() {
        this.gameChoices.className = "";
        this.questionShaking = true;
        this.gameChoices.classList.add('box-super-urgent');
        this.timerBarContainer.classList.add('box-super-urgent');
        this.timer.style.color = 'red';
        this.timer.classList.add('timer-super-urgent');
        this.clock.superUrgent();
    }

    enableUrgentMode() {
        this.questionZooming = true;
        this.gameChoices.classList.add('box-urgent');
        this.timer.classList.add('timer-urgent');
        this.timer.style.color = 'orange';
        this.clock.urgent();
    }

    endAdventure() {
        this.stopTimer();
        this.gameContainer.style.display = "none";
        this.gamePointsContainer.style.display = "flex";
    }

    getElementCenterX(element) {
        return this.offsetLeft(element) + element.offsetWidth / 2;
    }

    getElementCenterY(element) {
        return this.offsetTop(element) + element.offsetHeight / 2;
    }

    getFormatedTimer() {
        let date = new Date(null);
        date.setSeconds(this.questionTimer);
        let time = date.toISOString().substr(15, 4);
        return time;
    }

    nextChoices(selectedIndex) {
        let selectedButton = this.choiceButtons[selectedIndex];
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
                self.gameContainer.classList.remove('quiz-box-disappear');
				$(this).dequeue();
			}).delay(250).queue(function() {
                self.displayNextChoices();
                self.startTimer();
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

    offsetLeft(element) {
        return element.getBoundingClientRect().x;
    }

    offsetTop(element) {
        return element.getBoundingClientRect().y
    }

    removeButtonsClickEvents() {
        this.choiceButtons.forEach(function(button) {
            $(button).off();
        }.bind(this));
    }

    setChoicesButtons() {
        this.clearButtons();
        arceus.getChoices().forEach(function(choice) {
            this.addButton(choice);
        }.bind(this));
    }

    setContext() {
        this.gameCurrentContext.innerHTML = arceus.contexts[arceus.currentContextIndex].getContext();
    }

    setElements() {
        this.background = document.getElementById('background');
        this.coveoLogoContainer = document.getElementById('coveo-logo');
        this.coveoLogoContainerTitle = document.getElementById('coveo-logo-container-title');
        this.coveoLogoImage = document.getElementById('coveo-logo-image');
        this.game = document.getElementById('game');
        this.gameChoices = document.getElementById('game-choices');
        this.gameCurrentContext = document.getElementById('game-current-context');
        this.gameContainer = document.getElementById('game-container');
        this.gameContext = document.getElementById('game-context');
        this.gameInitialContext = document.getElementById('game-initial-context');
        this.gamePointsContainer = document.getElementById('game-points-container');
        this.playButton = document.getElementById('play-button');
        this.timer = document.getElementById('timer');
        this.timerBar = document.getElementById('timer-bar');
        this.timerBarContainer = document.getElementById('timer-bar-container');
        this.timerOrangeBar = document.getElementById('timer-orange-bar');
        this.timerText = document.getElementById('timer-text');

        this.playButton.addEventListener('click', function() {
            this.showAdventure();
        }.bind(this));
    }

    setInitialContext() {
        this.gameInitialContext.innerHTML = arceus.contexts[arceus.initialContextIndex].getContext();
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
    
    showAdventure() {
        this.playButton.style.animation = "none";
        let logoX = this.getElementCenterX(this.coveoLogoImage) + 53;
        let logoY = this.getElementCenterY(this.coveoLogoImage) - 21;
        let buttonX = this.getElementCenterX(this.playButton);
        let buttonY = this.getElementCenterY(this.playButton);
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

	start() {
        this.clock.run();
        this.startTimer();

        arceus.start(0, 0);

        this.setInitialContext();
        this.displayNextChoices();
    }

    startTimer() {
        this.shakeBoxInterval = setInterval(function() {
            this.timerLoop();
        }.bind(this), 1000 / 60);
    }

    stopTimer() {
        window.clearInterval(this.shakeBoxInterval);
    }

    timerLoop() {
        if (this.questionCurrentTimestamp >= 0) {
            this.questionCurrentTimestamp -= 1000 / 60;
            if (this.questionLastTimestamp - this.questionCurrentTimestamp >= 1000) {
                this.questionLastTimestamp = this.questionCurrentTimestamp;
                this.questionTimer--;
                if (this.questionTimer <= 0) {
                    this.questionTimer = 0;
                } else if (this.questionTimer <= 30 && !this.questionShaking) {
                    this.enableSuperUrgentMode();
                } else if (this.questionTimer <= 120 && !this.questionZooming) {
                    this.enableUrgentMode();
                }
            }
        } else {
            window.clearInterval(this.shakeBoxInterval);
            this.removeButtonsClickEvents();
            this.questionTimer = 0;
            this.questionCurrentTimestamp = 0;
            let self = this;
            this.disableSuperUrgentMode();
            $(this.gameContainer).delay(500).queue(function() {
                let choices = self.gameChoices.children;
                let fallDelay = 0;
                for (let i = choices.length - 1; i >= 0; i--) {
                    $(choices[i]).delay(fallDelay).queue(function() {
                        choices[i].classList.add('choice-drop');
                        $(this).dequeue();
                    });
                    fallDelay += 200;
                }
                $(this).dequeue();
            }).delay(200).queue(function() {
                self.gameContext.classList.add('choice-drop');
                $(this).dequeue();
            }).delay(1250).queue(function() {
                self.endAdventure();
            });
        }
        this.updateTimerBar();
    }

    updateTimerBar() {
        this.timerText.textContent = this.getFormatedTimer();
        let barPercentage = 100 - this.questionCurrentTimestamp / this.questionInitialTimestamp * 100;
        this.timerBar.style.width = barPercentage + "%";
    }
}