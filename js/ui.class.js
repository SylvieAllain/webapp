class UserInterface {
	constructor() {
        this.initialTimer = 180;
        this.choiceButtons = [];
        this.isTheEnd = false;
        this.setElements();
        this.isLastHintContextDisplayed = false;
        this.flappeo = new Flappeo();
        this.clock = new Clock('clock', this.initialTimer);
        this.storyMultiplier = 1;
    }

    getStoryMultiplier() {
        var storyIndex = arceus.getStoryIndex();
        switch (storyIndex) {
            case 1:
                this.storyMultiplier = 0.7;
                break;
            case 3:
                this.storyMultiplier = 2;
                break;
            case 4:
                this.storyMultiplier = 2.3;
                break;
            default:
                this.storyMultiplier = 1;
                break;
        }
    }

    addButton(choice, goBack=false) {
        let button = document.createElement('button');
        button.classList.add('choice-button');
        this.gameChoices.appendChild(button);
        this.choiceButtons.push(button);
        let buttonIndex = this.choiceButtons.length - 1;
        if (!goBack) {
            button.innerHTML = choice.getChoice();
            $(button).on('click', function () {
                this.stopTimer();
                $(button).off();

                let isNextContextAHint = arceus.getContext(choice.getNextContext()).isHint();

                if (isNextContextAHint) {
                    this.displayHintPopup();
                }

                arceus.setChoices(buttonIndex);
                if (arceus.isThisChoiceAPathToTheEnding(choice)) {
                    this.regroupAnimation(button);
                    this.popupAnimation();
                    setTimeout(() => {
                        this.endAdventure();
                    }, 1500);
                } else {
                    this.nextChoices(buttonIndex);
                }
            }.bind(this));
        } else {
            button.innerHTML = choice;
            button.classList.add('choice-button-goback');
            $(button).on('click', function () {
                this.stopTimer();
                $(button).off();
                this.regroupAnimation(button);
                setTimeout(() => {
                    arceus.getPrevious();
                    this.displayNextChoices();
                    this.startTimer();
                }, 400);
            }.bind(this));
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

    displayHintPopup() {
        this.gameHintStatus.textContent = arceus.getHintsFound() + 1 + " of " + arceus.getHintsCount() + " found";
        this.gameHint.classList.add('game-hint-appear');
        setTimeout(function() {
            this.gameHint.classList.remove('game-hint-appear');
            this.gameHint.classList.add('game-hint-disappear');
            setTimeout(function() {
                this.gameHint.classList.remove('game-hint-disappear');
            }.bind(this), 250);
        }.bind(this), 4000);
    }

    displayNextChoices() {
        this.setContext();
        if (this.isTheEnd) {
            this.endAdventure();
        } else {
            this.setChoicesButtons();
            this.elementDisplayFlex(this.gameContainer);
            this.gameContainer.classList.add('choices-box-appear');
        }
    }

    displayReplayButton() {
        if (this.atcoveo.textContent.length > 0) {
            this.replayButton.style.visibility = 'visible';
        } else {
            this.replayButton.style.visibility = 'hidden';
        }
    }

    elementDisplayFlex(element) {
        element.style.display = "flex";
    }

    elementHide(element) {
        element.style.display = "none";
    }

    enableSuperUrgentMode() {
        this.gameChoices.className = "";
        this.timerBarContainer.className = "";
        this.timer.className = "";
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
        this.timerBarContainer.classList.add('box-urgent');
        this.timer.classList.add('timer-urgent');
        this.timer.style.color = 'orange';
        this.clock.urgent();
    }

    endAdventure() {
        if (this.questionTimer <= 0) {
            arceus.setPointsToZero();
            this.gameEndingResult.innerHTML = "Time's up! You couldn't resolve the problem in time, the case has been assigned to another agent.";
        }
        else {
            let timeLeft = this.initialTimer - this.questionTimer;
            this.gameEndingResult.outerHTML = "<p>" + arceus.getCurrentContextText() + "</p><p>You finished your adventure in " + this.getFormatedTime(timeLeft) + "!</p>";
        }
        this.stopTimer();
        this.getStoryMultiplier();
        var pointsToRemoveFromWastedTime = Math.round((this.initialTimer - this.questionTimer) * this.storyMultiplier);
        arceus.removePoints(pointsToRemoveFromWastedTime);
        this.elementHide(this.gameContainer);
        this.gameFinalPoints.innerHTML = "<strong>" + arceus.getPoints() + "</strong>";
        this.elementDisplayFlex(this.gamePointsContainer);
        this.gamePointsContainer.classList.add('game-points-container-appear');

        this.atcoveo.addEventListener("keypress", () => {this.displayReplayButton()});
    }

    fallingElementsAnimation(animatedElements) {
        let fallDelay = 0;
        animatedElements.forEach(function(element) {
            $(element).delay(fallDelay).queue(function() {
                element.classList.add('ending-drop');
                $(this).dequeue();
            });
            fallDelay += 100;
        });
    }

    getElementCenterX(element) {
        return this.offsetLeft(element) + element.offsetWidth / 2;
    }

    getElementCenterY(element) {
        return this.offsetTop(element) + element.offsetHeight / 2;
    }

    getFormatedTime(time) {
        let date = new Date(null);
        date.setSeconds(time);
        let formatedTime = date.toISOString().substr(15, 4);
        return formatedTime;
    }

    getFormatedTimer() {
        return this.getFormatedTime(this.questionTimer);
    }

    nextChoices(selectedIndex) {
        let selectedButton = this.choiceButtons[selectedIndex];
        let buttons = document.getElementsByClassName('choice-button');
        buttons.disabled = true;

        this.regroupAnimation(selectedButton);
        this.popupAnimation();
    }

    offsetLeft(element) {
        return element.getBoundingClientRect().x;
    }

    offsetTop(element) {
        return element.getBoundingClientRect().y
    }

    outOfTime() {
        let animatedElements = [];

        for (let i = this.choiceButtons.length - 1; i >= 0; i--) {
            animatedElements.push(this.choiceButtons[i]);
        }

        animatedElements.push(this.timerContainer, this.gameContext, this.gameInitialContext);

        setTimeout(function() {
            this.fallingElementsAnimation(animatedElements);

            setTimeout(function() {
                this.endAdventure();
            }.bind(this), 1250);
        }.bind(this), 500);
    }

    popupAnimation() {
        let self = this;
		$(this.gameContainer).delay(500).queue(function() {
			$(self.gameContainer).addClass('choices-box-disappear').delay(500).queue(function() {
				self.elementHide(self.gameContainer);
				self.clearButtons();
                self.gameContainer.classList.remove('choices-box-disappear');
				$(this).dequeue();
			}).delay(250).queue(function() {
                self.displayNextChoices();
                if (!self.isTheEnd) {
                    self.startTimer();
                }
				$(this).dequeue();
			}).delay(250).queue(function() {
                self.gameContainer.classList.remove('choices-box-appear');
				$(this).dequeue();
			}).queue(function() {
				$(this).dequeue();
			});
			$(this).dequeue();
        });
    }

    regroupAnimation(selectedButton) {
        selectedButton.classList.add('choice-selected');
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
    }

    removeButtonsClickEvents() {
        this.choiceButtons.forEach(function(button) {
            $(button).off();
        }.bind(this));
    }

    saveResult() {
        let usersData = [];

        if (localStorage.hasOwnProperty('support_elevate')) {
            try {
                usersData = JSON.parse(localStorage.getItem('support_elevate'));
            } catch {
                usersData = [];
            }
        }

        if (!Array.isArray(usersData)) {
            usersData = [];
        }

        let user = this.atcoveo.textContent;

        let userData = {
            user: user + "@coveo.com",
            points: arceus.getPoints(),
            date: Date.now()
        }

        if (!usersData.push(userData)) {
            usersData = [];
            usersData.push(userdata);
        }

        localStorage.setItem('support_elevate', JSON.stringify(usersData));

        $.ajax({
            type: "POST",
            url: "./register.php",
            data: userData,
            success: function(response) {
                console.log(response);
            }
        });
    }

    empt

    setChoicesButtons() {
        this.clearButtons();
        arceus.getChoices().forEach(function(choice) {
            this.addButton(choice);
        }.bind(this));
        if (!arceus.isArrayEmpty()) {
            this.addBackButton();
        }
    }

    setContext() {
        if (arceus.isThisAnEnding()) {
            this.isTheEnd = true;
        }
        else {
            if (arceus.lastHintFound && !this.isLastHintContextDisplayed) {
                this.gameLastHintMessage.innerHTML = arceus.getContext(arceus.lastHintFoundIndex).getContext();
                this.isLastHintContextDisplayed = true;
            } else {
                this.gameLastHintMessage.innerHTML = '';
            }
            this.gameCurrentContext.innerHTML = arceus.getCurrentContext().getContext();
        }
        if (arceus.getCurrentContextIndex() != arceus.initialContextIndex) {
            this.setInitialContext();
        }
    }

    setElements() {
        this.atcoveo = document.getElementById('atcoveo');
        this.background = document.getElementById('background');
        this.coveoLogoContainer = document.getElementById('coveo-logo');
        this.coveoLogoContainerTitle = document.getElementById('coveo-logo-container-title');
        this.coveoLogoImage = document.getElementById('coveo-logo-image');
        this.game = document.getElementById('game');
        this.gameChoices = document.getElementById('game-choices');
        this.gameCurrentContext = document.getElementById('game-current-context');
        this.gameLastHintMessage = document.getElementById('game-last-hint-message');
        this.gameEndingResult = document.getElementById('game-ending-result');
        this.gameContainer = document.getElementById('game-container');
        this.gameContext = document.getElementById('game-context');
        this.gameFinalPoints = document.getElementById('game-final-points');
        this.gameHint = document.getElementById('game-hint');
        this.gameHintStatus = document.getElementById('game-hint-status');
        this.gameInitialContext = document.getElementById('game-initial-context');
        this.gamePointsContainer = document.getElementById('game-points-container');
        this.replayButton = document.getElementById('replay-button');
        this.playButton = document.getElementById('play-button');
        this.timer = document.getElementById('timer');
        this.timerBar = document.getElementById('timer-bar');
        this.timerBarContainer = document.getElementById('timer-bar-container');
        this.timerContainer = document.getElementById('timer-container');
        this.timerOrangeBar = document.getElementById('timer-orange-bar');
        this.timerText = document.getElementById('timer-text');

        document.addEventListener('mousedown', function(mouseEvent) {
            let lastY = mouseEvent.clientY;
            let scroll = function(mouseEvent) {
                let newY = mouseEvent.clientY;
                let diffY = this.gameContainer.scrollTop + ((newY - lastY) * -1);
                lastY = newY;
                this.gameContainer.scroll(0, diffY);
            }.bind(this);
            document.addEventListener('mousemove', scroll);
            document.addEventListener('mouseup', function() {
                document.removeEventListener('mousemove', scroll);
            })
        }.bind(this));

        this.playButton.addEventListener('click', function() {
            this.showAdventure();
        }.bind(this));

        this.replayButton.addEventListener('click', function() {

            this.saveResult();

            let animatedElements = [];
            let elements = this.gamePointsContainer.children;
            
            for (let element of elements) {
                animatedElements.unshift(element);
            }

            this.fallingElementsAnimation(animatedElements);
            setTimeout(function() {
                window.location.reload();
            }, 2000);
        }.bind(this));
    }

    setInitialContext() {
        this.gameInitialContext.innerHTML = arceus.story.getContext(arceus.initialContextIndex).getContext();
    }

    setTimer(timer = this.initialTimer) {
        this.questionTimer = timer;
		this.questionShaking = false;
		this.questionZooming = false;
        this.questionInitialTimestamp = Date.now();
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
        let self = this;

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
        this.setTimer();
        this.clock.run(this.questionInitialTimestamp);
        this.startTimer();

        arceus.start(0, 0);

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
        if (this.questionTimer > 0) {
            this.questionCurrentTimestamp = Date.now();
            let diffTimestamp = this.questionCurrentTimestamp - this.questionLastTimestamp;
            if (diffTimestamp >= 1000) {
                let rest = diffTimestamp - 1000;
                this.questionLastTimestamp = this.questionCurrentTimestamp - rest;
                this.questionTimer--;
                if (this.questionTimer <= 0) {
                    this.questionTimer = 0;
                } else if (this.questionTimer <= 20 && !this.questionShaking) {
                    this.enableSuperUrgentMode();
                } else if (this.questionTimer <= 90 && !this.questionZooming) {
                    this.enableUrgentMode();
                }
            }
        } else {
            this.stopTimer();
            this.removeButtonsClickEvents();
            this.questionTimer = 0;
            this.questionCurrentTimestamp = 0;
            this.disableSuperUrgentMode();
            this.outOfTime();
        }
        this.clock.update(this.questionCurrentTimestamp);
        this.updateTimerBar();
    }

    updateTimerBar() {
        this.timerText.textContent = this.getFormatedTimer();
        let barPercentage = Math.abs((this.questionInitialTimestamp - this.questionCurrentTimestamp) / 1000) / this.initialTimer * 100;
        this.timerBar.style.width = barPercentage + "%";
    }
}