define(['lib/pixi'], function (PIXI) {
	myTexture = PIXI.Texture.fromImage("/resources/food_static.png");

	function Food () {
		PIXI.DisplayObjectContainer.call(this);
		this.renderable = true;
		this.sprite = new PIXI.Sprite(myTexture);
	}

	Food.prototype = Object.create(PIXI.DisplayObject.prototype);

	Food.prototype.getBounds = function (helpers) {
		return {
			x: this.sprite.x,
			y: this.sprite.y,
			w: this.sprite.width,
			h: this.sprite.height
		}


	}

	Food.prototype.frameUpdate = function (helpers) {

	}

	Food.prototype.newPosition = function(w,h) {
		this.sprite.x = Math.floor(Math.random() * (w - this.sprite.width));
		this.sprite.y = Math.floor(Math.random() * (h - this.sprite.height));
	};

	return Food
});