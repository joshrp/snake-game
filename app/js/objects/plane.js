define(['lib/pixi'], function (PIXI) {
	myTexture = PIXI.Texture.fromImage("/resources/1945.png");

	function Plane () {
		this.sprite = new PIXI.Sprite(myTexture);
	}

	Plane.prototype = {
		movementUpdate: function (handler) {

		}
	}

	return new Plane();
});