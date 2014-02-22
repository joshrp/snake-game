define(['lib/pixi'], function (PIXI) {
	myTexture = PIXI.Texture.fromImage("/resources/1945.png");

	function Snake () {
		PIXI.DisplayObjectContainer.call(this);
		this.renderable = true;
		this.sprite = new PIXI.Sprite(myTexture);
		this.direction = 'right'
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
		var amount = 3

		if (helpers.buttons.isPressed('left') && this.direction != 'right') {
			this.direction = 'left'
			this.speed = 0;
		}

		if (helpers.buttons.isPressed('right') && this.direction != 'left') {
			this.direction = 'right'
			this.speed = 0;
		}

		if (helpers.buttons.isPressed('up') && this.direction != 'down') {
			this.direction = 'up'
			this.speed = 0;
		}

		if (helpers.buttons.isPressed('down') && this.direction != 'up') {
			this.direction = 'down'
			this.speed = 0;
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


		collision = helpers.doesCollide(newX, newY, this.sprite.width, this.sprite.height);

		if (collision) {
			console.log('Collides with: ', collision);
			this.direction = '';
			if (collision.type = 'stage') {

			}
		} else {
			this.sprite.position.x = newX;
			this.sprite.position.y = newY;
		}


	}


	return new Snake();
});