(function () {
	let canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d'),
			width = canvas.width = innerWidth,
			height = canvas.height = innerHeight,
			particles = [],
			properties = {
				bgColor: 'rgba(17, 17, 19, 1)',
				particleColor: 'rgba(255, 40, 40, 1)',
				particleCount: 60,
				particleRadius: 3,
				particleMaxVelocity: 0.5,
				lineLength: 130,
				lifeTime: 10
			}

	class Particle {
		constructor() {
			this.x = Math.random() * width;
			this.y = Math.random() * height;
			this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
			this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
			this.life = Math.random() * properties.lifeTime * 60;
		}

		changePosition() {
			(this.x + this.velocityX > width && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0) ? 
				this.velocityX *= -1 :
				this.velocityX;
			(this.y + this.velocityY > width && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0) ? 
				this.velocityY *= -1 :
				this.velocityY;
			this.x += this.velocityX;
			this.y += this.velocityY;
		}

		reDraw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.fillStyle = properties.particleColor;
			ctx.fill();
		}

		reCalculateLife() {
			if(this.life < 1) {
				this.x = Math.random() * width;
				this.y = Math.random() * height;
				this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
				this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
				this.life = Math.random() * properties.lifeTime * 60;
			}
			this.life--;
		}
	}

	document.querySelector('body').appendChild(canvas);

	window.onresize = function() {
		width = canvas.wigth = innerWidth;
		height = canvas.height = innerHeight;
	}

	function reDrawParticles() {
		for(let i in particles) {
			particles[i].changePosition();
			particles[i].reDraw();
			particles[i].reCalculateLife();
		}
	}

	function reDrawBackground() {
		ctx.fillStyle = properties.bgColor;
		ctx.fillRect(0, 0, width, height);
	}

	function drawLines() {
		let x1, x2, y1, y2, length, opacity;
		for(let i in particles) {
			for(let j in particles) {
				x1 = particles[i].x;
				y1 = particles[i].y;
				x2 = particles[j].x;
				y2 = particles[j].y;
				length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
				if (length < properties.lineLength) {
					opacity = 1 - length / properties.lineLength;
					ctx.lineWidth = '0,5',
					ctx.strokeStyle = `rgba(255, 40, 40, ${opacity})`;
					ctx.beginPath();
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2);
					ctx.closePath();
					ctx.stroke();
				}
			}
		}
	}

	function loop() {
		reDrawBackground();
		reDrawParticles();
		drawLines();
		requestAnimationFrame(loop);
	}

	function start() {
		for (let i = 0; i < properties.particleCount; i++) {
			particles.push(new Particle);
		}
		loop();
	}

	start();
}())