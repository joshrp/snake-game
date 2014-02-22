define(['lib/pixi'], function (PIXI) {
	myTexture = PIXI.Texture.fromImage("/resources/1945.png");

	function Snake () {
		PIXI.DisplayObjectContainer.call(this);
		this.renderable = true;
		this.sprite = new PIXI.Sprite(myTexture);
		this.direction = 'right'
		this.speed = 0;
		this.acceleration = 0.05;
		this.maxSpeed = 5;
		this.initialSpeed = 1;
	}

	Snake.prototype = Object.create(PIXI.DisplayObject.prototype);

	Snake.prototype.getBounds = function (helpers) {
		return {
			x: this.sprite.x,
			y: this.sprite.y,
			w: this.sprite.width,
			h: this.sprite.height
		}
	}

	Snake.prototype.frameUpdate = function (helpers) {
		this.speed += this.acceleration;

		var amount = Math.min(this.speed, this.maxSpeed);

		if (helpers.buttons.isPressed('left') && this.direction != 'right') {
			this.direction = 'left'
			this.speed = this.initialSpeed;
		}

		if (helpers.buttons.isPressed('right') && this.direction != 'left') {
			this.direction = 'right'
			this.speed = this.initialSpeed;
		}

		if (helpers.buttons.isPressed('up') && this.direction != 'down') {
			this.direction = 'up'
			this.speed = this.initialSpeed;
		}

		if (helpers.buttons.isPressed('down') && this.direction != 'up') {
			this.direction = 'down'
			this.speed = this.initialSpeed;
		}

		var newX = this.sprite.position.x,
			newY = this.sprite.position.y;

		switch (this.direction) {
			case 'left':
				newX = this.sprite.position.x - amount;
				break;
			case 'down':
				newY = this.sprite.position.y + amount;
				break;
			case 'right':
				newX = this.sprite.position.x + amount;
				break;
			case 'up':
				newY = this.sprite.position.y - amount;
				break;
		}

		stageSide = helpers.collisionManager.containsInclusive(
			helpers.stageBoundaries,
			{
				x: newX,
				y: newY,
				w: this.sprite.width,
				h: this.sprite.height
			}
		);

		if (stageSide) {
			console.log('Collides with stage ', stageSide);
			this.direction = '';
		} else {
			this.sprite.position.x = newX;
			this.sprite.position.y = newY;
		}


	}


	return new Snake();
});