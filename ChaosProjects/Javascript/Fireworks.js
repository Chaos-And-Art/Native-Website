//#region Button Controllers/Functions

var controllerOpen = false;
var fControllerPanel = document.getElementById("Slide_Up")
var presetsDropdown = document.getElementById("Dropdown_Content")

function toggleController(){
	if(controllerOpen == false){
		slideUp();
		controllerOpen = true;
	} else{
		slideDown();
		controllerOpen = false;
	}
}

function slideUp() {
	fControllerPanel.style.height = "70vh"
	fControllerPanel.style.transform = "translateY()";
	document.getElementById("Slide_Content").style.display = "block";
	if (presetsDropdown.classList.contains('show')) {
		presetsDropdown.classList.toggle("show");
	}
}

function slideDown() {
	fControllerPanel.style.height = "75px"
	fControllerPanel.style.transform = "translateY()";
	document.getElementById("Slide_Content").style.display = "none";
}

function togglePresetsDropdown(){
	presetsDropdown.classList.toggle("show");
}

//#endregion

//#region  Touch Controls for Sliding
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
	return evt.touches ||
		evt.originalEvent.touches;
}

function handleTouchStart(evt) {
	const firstTouch = getTouches(evt)[0];
	xDown = firstTouch.clientX;
	yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
	if (!xDown || !yDown) {
		return;
	}

	var xUp = evt.touches[0].clientX;
	var yUp = evt.touches[0].clientY;

	var xDiff = xDown - xUp;
	var yDiff = yDown - yUp;

	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

	if (Math.abs(yDiff) > Math.abs(xDiff)) {
		if (yDiff > 5) {
			if((height / 7) > height - yUp){
				slideUp();
			}
		} else if (yDiff < -4) {
			slideDown();
		}
	}
	xDown = null;
	yDown = null;
};

//#endregion

//#region Sliders Control

// var fSpeedSlider = document.getElementById("Firework_Speed_Range");
// var fSpeedOutput = document.getElementById("Firework_Speed_Value");
// fSpeedOutput.innerHTML = fSpeedSlider.value;
// fSpeedSlider.oninput = function () {
// 	fSpeedOutput.innerHTML = this.value;
// 	sliderFSpeed = this.value
// }

// var pSpeedSlider = document.getElementById("Particle_Speed_Range");
// var pSpeedOutput = document.getElementById("Particle_Speed_Value");
// pSpeedOutput.innerHTML = pSpeedSlider.value;
// pSpeedSlider.oninput = function () {
// 	pSpeedOutput.innerHTML = this.value;
// 	sliderFSpeed = this.value
// }

// var pSpeedVarSlider = document.getElementById("Particle_SpeedVar_Range");
// var pSpeedVarOutput = document.getElementById("Particle_SpeedVar_Value");
// pSpeedVarOutput.innerHTML = pSpeedVarSlider.value;
// pSpeedVarSlider.oninput = function () {
// 	pSpeedVarOutput.innerHTML = this.value;
// 	sliderFSpeed = this.value
// }

// var pCountSlider = document.getElementById("Particle_Count_Range");
// var pCountOutput = document.getElementById("Particle_Count_Value");
// pCountOutput.innerHTML = pCountSlider.value;
// pCountSlider.oninput = function () {
// 	pCountOutput.innerHTML = this.value;
// 	sliderFSpeed = this.value
// }

// var pFrictionSlider = document.getElementById("Particle_Friction_Range");
// var pFrictionOutput = document.getElementById("Particle_Friction_Value");
// pFrictionOutput.innerHTML = pFrictionSlider.value;
// pFrictionSlider.oninput = function () {
// 	pFrictionOutput.innerHTML = this.value;
// 	sliderFSpeed = this.value
// }

// var pGravitySlider = document.getElementById("Particle_Gravity_Range");
// var pGravityOutput = document.getElementById("Particle_Gravity_Value");
// pGravityOutput.innerHTML = pGravitySlider.value;
// pGravitySlider.oninput = function () {
// 	pGravityOutput.innerHTML = this.value;
// 	sliderFSpeed = this.value
// }

// var pFlickerSlider = document.getElementById("Particle_Flicker_Range");
// var pFlickerOutput = document.getElementById("Particle_Flicker_Value");
// pFlickerOutput.innerHTML = pFlickerSlider.value;
// pFlickerSlider.oninput = function () {
// 	pFlickerOutput.innerHTML = this.value;
// 	sliderFSpeed = this.value
// }
//#endregion


//#region Firework Presets
var newFireworks;
window.onload = (event) => {
	defaultFireworks()
};

function defaultFireworks() {
	setTimeout(function () {
		document.getElementById("text_change").innerHTML = "Default";
		slideDown()
	}, 100);

	newFireworks = Fireworks(
		2, 4, false, true, 40, 5, 10, 50, 5, 1, 20, 0, 360, 40, 1, 50
	);
}

function longFall() {
	setTimeout(function () {
		document.getElementById("text_change").innerHTML = "Long Fall";
		slideDown()
	}, 100);

	newFireworks = Fireworks(
		2, 4, false, true, 100, 10, 15, 10, 20, 5, 50, 0, 360, 40, 1, 50
	);
}


function antiGravity() {
	setTimeout(function () {
		document.getElementById("text_change").innerHTML = "Anti-Gravity";
		slideDown()
	}, 100);

	newFireworks = Fireworks(
		2, 4, false, true, 200, 5, 10, 50, 5, -10, 20, 0, 360, 40, 1, 50
	)
}

function slowLaunch() {
	setTimeout(function () {
		document.getElementById("text_change").innerHTML = "Slow Launch";
		slideDown()
	}, 100);

	newFireworks = Fireworks(
		1, 1, false, true, 150, 1, 1, 10, 1, 0, 15, 0, 360, 20, 1, 50
	)
}

function randomTrails() {
	setTimeout(function () {
		document.getElementById("text_change").innerHTML = "Random Trails";
		slideDown()
	}, 100);

	newFireworks = Fireworks(
		2, 2, false, true, 100, 10, 0, 100, 0, 2, 100, 0, 360, 20, 4, 25
	)
	newFireworks.init();
}

//#endregion

var firstLoad = false;

var Fireworks = function (fSpeed, fAcceleration, showckwave, target, count, pSpeed, pSpeedVariance, pWind, pFriction, pGravity, flicker, colorMin, colorMax, colorVar, fWidth, clear) {
	/*=============================================================================*/
	/* Utility
	/*=============================================================================*/
	var self = this;
	var rand = function (rMi, rMa) { return ~~((Math.random() * (rMa - rMi + 1)) + rMi); }
	window.requestAnimFrame = function () { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) { window.setTimeout(a, 1E3 / 60) } }();

	/*=============================================================================*/
	/* Initialize
	/*=============================================================================*/
	self.init = function () {
		self.dt = 0;
		self.oldTime = Date.now();
		if (self.canvas == null) {
			self.canvas = document.createElement('canvas');
			firstLoad = true;
		} else {
			self.canvas = $('canvas');
		}

		self.canvasContainer = $('#canvas-container');

		var canvasContainerDisabled = document.getElementById('canvas-container');
		self.canvas.onselectstart = function () {
			return false;
		};

		var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

		self.canvas.width = self.cw = width;
		self.canvas.height = self.ch = height / 1.3;

		self.partCount = count;
		self.currentHue = 170;
		self.partSpeed = pSpeed;
		self.partSpeedVariance = pSpeedVariance;
		self.partWind = pWind;
		self.partFriction = pFriction;
		self.partGravity = pGravity;
		self.hueMin = colorMin;
		self.hueMax = colorMax;
		self.fworkSpeed = fSpeed;
		self.fworkAccel = fAcceleration;
		self.hueVariance = colorVar;
		self.flickerDensity = flicker;
		self.showShockwave = showckwave;
		self.showTarget = target;
		self.clearAlpha = clear;

		self.particles = [];
		self.fireworks = [];
		self.mx = self.cw / 2;
		self.my = self.ch / 2;


		self.canvasContainer.append(self.canvas);
		self.ctx = self.canvas.getContext('2d');
		// if (firstLoad) {
		// 	self.ctx = self.canvas.getContext('2d');
		// 	firstLoad = false;
		// } else {
		// 	self.ctx = self.canvas[0].getContext('2d');
		// }

		self.ctx.lineCap = 'round';
		self.ctx.lineJoin = 'round';
		self.lineWidth = fWidth;
		self.bindEvents();
		self.canvasLoop();

		self.canvas.onselectstart = function () {
			return false;
		};


	};

	/*=============================================================================*/
	/* Particle Constructor
	/*=============================================================================*/
	var Particle = function (x, y, hue) {
		this.x = x;
		this.y = y;
		this.coordLast = [
			{ x: x, y: y },
			{ x: x, y: y },
			{ x: x, y: y }
		];
		this.angle = rand(0, 360);
		this.speed = rand(((self.partSpeed - self.partSpeedVariance) <= 0) ? 1 : self.partSpeed - self.partSpeedVariance, (self.partSpeed + self.partSpeedVariance));
		this.friction = 1 - self.partFriction / 100;
		this.gravity = self.partGravity / 2;
		this.hue = rand(hue - self.hueVariance, hue + self.hueVariance);
		this.brightness = rand(50, 80);
		this.alpha = rand(40, 100) / 100;
		this.decay = rand(10, 50) / 1000;
		this.wind = (rand(0, self.partWind) - (self.partWind / 2)) / 25;
		this.lineWidth = self.lineWidth;
	};

	Particle.prototype.update = function (index) {
		var radians = this.angle * Math.PI / 180;
		var vx = Math.cos(radians) * this.speed;
		var vy = Math.sin(radians) * this.speed + this.gravity;
		this.speed *= this.friction;

		this.coordLast[2].x = this.coordLast[1].x;
		this.coordLast[2].y = this.coordLast[1].y;
		this.coordLast[1].x = this.coordLast[0].x;
		this.coordLast[1].y = this.coordLast[0].y;
		this.coordLast[0].x = this.x;
		this.coordLast[0].y = this.y;

		this.x += vx * self.dt;
		this.y += vy * self.dt;

		this.angle += this.wind;
		this.alpha -= this.decay;

		if (this.alpha < .05) {
			self.particles.splice(index, 1);
		}
	};

	Particle.prototype.draw = function () {
		var coordRand = (rand(1, 3) - 1);
		self.ctx.beginPath();
		self.ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
		self.ctx.lineTo(Math.round(this.x), Math.round(this.y));
		self.ctx.closePath();
		self.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
		self.ctx.stroke();

		if (self.flickerDensity > 0) {
			var inverseDensity = 50 - self.flickerDensity;
			if (rand(0, inverseDensity) === inverseDensity) {
				self.ctx.beginPath();
				self.ctx.arc(Math.round(this.x), Math.round(this.y), rand(this.lineWidth, this.lineWidth + 3) / 2, 0, Math.PI * 2, false)
				self.ctx.closePath();
				var randAlpha = rand(50, 100) / 100;
				self.ctx.fillStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + randAlpha + ')';
				self.ctx.fill();
			}
		}
	};

	/*=============================================================================*/
	/* Create Particles
	/*=============================================================================*/
	self.createParticles = function (x, y, hue) {
		var countdown = self.partCount;
		while (countdown--) {
			self.particles.push(new Particle(x, y, hue));
		}
	};

	/*=============================================================================*/
	/* Update Particles
	/*=============================================================================*/
	self.updateParticles = function () {
		var i = self.particles.length;
		while (i--) {
			var p = self.particles[i];
			p.update(i);
		};
	};

	/*=============================================================================*/
	/* Draw Particles
	/*=============================================================================*/
	self.drawParticles = function () {
		var i = self.particles.length;
		while (i--) {
			var p = self.particles[i];
			p.draw();
		};
	};

	/*=============================================================================*/
	/* Firework Constructor
	/*=============================================================================*/
	var Firework = function (startX, startY, targetX, targetY) {
		this.x = startX;
		this.y = startY;
		this.startX = startX;
		this.startY = startY;
		this.hitX = false;
		this.hitY = false;
		this.coordLast = [
			{ x: startX, y: startY },
			{ x: startX, y: startY },
			{ x: startX, y: startY }
		];
		this.targetX = targetX;
		this.targetY = targetY;
		this.speed = self.fworkSpeed;
		this.angle = Math.atan2(targetY - startY, targetX - startX);
		this.shockwaveAngle = Math.atan2(targetY - startY, targetX - startX) + (90 * (Math.PI / 180));
		this.acceleration = self.fworkAccel / 100;
		this.hue = self.currentHue;
		this.brightness = rand(50, 80);
		this.alpha = rand(50, 100) / 100;
		this.lineWidth = self.lineWidth;
		this.targetRadius = 1;
	};

	Firework.prototype.update = function (index) {
		self.ctx.lineWidth = this.lineWidth;

		vx = Math.cos(this.angle) * this.speed,
			vy = Math.sin(this.angle) * this.speed;
		this.speed *= 1 + this.acceleration;
		this.coordLast[2].x = this.coordLast[1].x;
		this.coordLast[2].y = this.coordLast[1].y;
		this.coordLast[1].x = this.coordLast[0].x;
		this.coordLast[1].y = this.coordLast[0].y;
		this.coordLast[0].x = this.x;
		this.coordLast[0].y = this.y;

		if (self.showTarget) {
			if (this.targetRadius < 8) {
				this.targetRadius += .25 * self.dt;
			} else {
				this.targetRadius = 1 * self.dt;
			}
		}

		if (this.startX >= this.targetX) {
			if (this.x + vx <= this.targetX) {
				this.x = this.targetX;
				this.hitX = true;
			} else {
				this.x += vx * self.dt;
			}
		} else {
			if (this.x + vx >= this.targetX) {
				this.x = this.targetX;
				this.hitX = true;
			} else {
				this.x += vx * self.dt;
			}
		}

		if (this.startY >= this.targetY) {
			if (this.y + vy <= this.targetY) {
				this.y = this.targetY;
				this.hitY = true;
			} else {
				this.y += vy * self.dt;
			}
		} else {
			if (this.y + vy >= this.targetY) {
				this.y = this.targetY;
				this.hitY = true;
			} else {
				this.y += vy * self.dt;
			}
		}

		if (this.hitX && this.hitY) {
			var randExplosion = rand(0, 9);
			self.createParticles(this.targetX, this.targetY, this.hue);
			self.fireworks.splice(index, 1);
		}
	};

	Firework.prototype.draw = function () {
		self.ctx.lineWidth = this.lineWidth;

		var coordRand = (rand(1, 3) - 1);
		self.ctx.beginPath();
		self.ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
		self.ctx.lineTo(Math.round(this.x), Math.round(this.y));
		self.ctx.closePath();
		self.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
		self.ctx.stroke();

		if (self.showTarget) {
			self.ctx.save();
			self.ctx.beginPath();
			self.ctx.arc(Math.round(this.targetX), Math.round(this.targetY), this.targetRadius, 0, Math.PI * 2, false)
			self.ctx.closePath();
			self.ctx.lineWidth = 1;
			self.ctx.stroke();
			self.ctx.restore();
		}

		if (self.showShockwave) {
			self.ctx.save();
			self.ctx.translate(Math.round(this.x), Math.round(this.y));
			self.ctx.rotate(this.shockwaveAngle);
			self.ctx.beginPath();
			self.ctx.arc(0, 0, 1 * (this.speed / 5), 0, Math.PI, true);
			self.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + rand(25, 60) / 100 + ')';
			self.ctx.lineWidth = this.lineWidth;
			self.ctx.stroke();
			self.ctx.restore();
		}
	};

	/*=============================================================================*/
	/* Create Fireworks
	/*=============================================================================*/
	self.createFireworks = function (startX, startY, targetX, targetY) {
		self.fireworks.push(new Firework(startX, startY, targetX, targetY));
	};

	/*=============================================================================*/
	/* Update Fireworks
	/*=============================================================================*/
	self.updateFireworks = function () {
		var i = self.fireworks.length;
		while (i--) {
			var f = self.fireworks[i];
			f.update(i);
		};
	};

	/*=============================================================================*/
	/* Draw Fireworks
	/*=============================================================================*/
	self.drawFireworks = function () {
		var i = self.fireworks.length;
		while (i--) {
			var f = self.fireworks[i];
			f.draw();
		};
	};

	/*=============================================================================*/
	/* Events
	/*=============================================================================*/
	self.bindEvents = function () {
		$(window).on('resize', function () {
			clearTimeout(self.timeout);
			self.timeout = setTimeout(function () {
				self.ctx.lineCap = 'round';
				self.ctx.lineJoin = 'round';
			}, 100);
		});

		$(self.canvas).on('mousedown', function (e) {
			var randLaunch = rand(0, 5);
			self.mx = e.pageX - self.canvasContainer.offset().left;
			self.my = e.pageY - self.canvasContainer.offset().top;
			self.currentHue = rand(self.hueMin, self.hueMax);
			self.createFireworks(self.cw / 2, self.ch, self.mx, self.my);

			$(self.canvas).on('mousemove.fireworks', function (e) {
				var randLaunch = rand(0, 5);
				self.mx = e.pageX - self.canvasContainer.offset().left;
				self.my = e.pageY - self.canvasContainer.offset().top;
				self.currentHue = rand(self.hueMin, self.hueMax);
				self.createFireworks(self.cw / 2, self.ch, self.mx, self.my);
			});

		});

		$(self.canvas).on('mouseup', function (e) {
			$(self.canvas).off('mousemove.fireworks');
		});

	}

	/*=============================================================================*/
	/* Clear Canvas
	/*=============================================================================*/
	self.clear = function () {
		self.particles = [];
		self.fireworks = [];
		self.ctx.clearRect(0, 0, self.cw, self.ch);
	};

	/*=============================================================================*/
	/* Delta
	/*=============================================================================*/
	self.updateDelta = function () {
		var newTime = Date.now();
		self.dt = (newTime - self.oldTime) / 16;
		self.dt = (self.dt > 5) ? 5 : self.dt;
		self.oldTime = newTime;
	}

	/*=============================================================================*/
	/* Main Loop
	/*=============================================================================*/
	self.canvasLoop = function () {
		requestAnimFrame(self.canvasLoop, self.canvas);
		self.updateDelta();
		self.ctx.globalCompositeOperation = 'destination-out';
		self.ctx.fillStyle = 'rgba(0,0,0,' + self.clearAlpha / 100 + ')';
		self.ctx.fillRect(0, 0, self.cw, self.ch);
		self.ctx.globalCompositeOperation = 'lighter';
		self.updateFireworks();
		self.updateParticles();
		self.drawFireworks();
		self.drawParticles();
	};

	self.init();

	var initialLaunchCount = 5;
	while (initialLaunchCount--) {
		setTimeout(function () {
			self.fireworks.push(new Firework(self.cw / 2, self.ch, rand(50, self.cw - 50), rand(50, self.ch / 2) - 50));
		}, initialLaunchCount * 200);
	}

}
