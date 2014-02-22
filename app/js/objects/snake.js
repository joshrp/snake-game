define(['lib/pixi'], function (PIXI) {
	myTexture = PIXI.Texture.fromImage("/resources/1945.png");

	function Snake () {
		PIXI.DisplayObjectContainer.call(this);
		this.renderable = true;
		this.sprite = new PIXI.Sprite(myTexture);
		this.direction = 'right'
		this.speed = 0;
		this.acceleration = 0.2;
		this.maxSpeed = 7;
		this.defaultSpeed = 2;
		this.friction = 0.4;
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

		this.speed -= this.friction;

		if (helpers.buttons.isPressed('left') && this.direction != 'right') {
			if (this.direction == 'left') {
				this.speed += this.acceleration + this.friction;
			} else {
				this.speed = this.defaultSpeed;
			}
			this.direction = 'left'
		}

		if (helpers.buttons.isPressed('right') && this.direction != 'left') {
			if (this.direction == 'right') {
				this.speed += this.acceleration + this.friction;
			} else {
				this.speed = this.defaultSpeed;
			}
			this.direction = 'right'
		}

		if (helpers.buttons.isPressed('up') && this.direction != 'down') {
			if (this.direction == 'up') {
				this.speed += this.acceleration + this.friction;
			} else {
				this.speed = this.defaultSpeed;
			}
			this.direction = 'up'
		}

		if (helpers.buttons.isPressed('down') && this.direction != 'up') {
			if (this.direction == 'down') {
				this.speed += this.acceleration + this.friction;
			} else {
				this.speed = this.defaultSpeed;
			}
			this.direction = 'down'
		}


		this.speed = Math.min(this.speed, this.maxSpeed);
		this.speed = Math.max(this.speed, this.defaultSpeed);

		var newX = this.sprite.position.x,
			newY = this.sprite.position.y;

		switch (this.direction) {
			case 'left':
				newX = this.sprite.position.x - this.speed;
				break;
			case 'down':
				newY = this.sprite.position.y + this.speed;
				break;
			case 'right':
				newX = this.sprite.position.x + this.speed;
				break;
			case 'up':
				newY = this.sprite.position.y - this.speed;
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