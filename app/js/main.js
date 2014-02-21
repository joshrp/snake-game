require.config({
	baseUrl: '/js',

});

require([
	'lib/pixi',
	'objects/plane'
], function (PIXI, plane) {
	var stage = new PIXI.Stage(0x66FF99),
		canvas = document.getElementById("game-canvas"),
		renderer = PIXI.autoDetectRenderer(
			512,
			384,
			canvas
		),
		keysDown = [];

	stage.addChild(plane.sprite);

	function update() {
		var amount = 1.028

		if (keysDown.indexOf(37) != -1) {
			plane.sprite.position.x -= amount;
		}
		if (keysDown.indexOf(39) != -1) {
			plane.sprite.position.x += amount;
		}
		if (keysDown.indexOf(38) != -1) {
			plane.sprite.position.y -= amount;
		}
		if (keysDown.indexOf(40) != -1) {
			plane.sprite.position.y += amount;
		}

		renderer.render(stage);

		requestAnimFrame(update);
	}

	document.body.onkeydown = function(evt) {
		evt = evt || window.event;
		if (keysDown.indexOf(evt.which) == -1)
			keysDown.push(evt.which);
	};

	document.body.onkeyup = function(evt) {
		evt = evt || window.event;
		var index = keysDown.indexOf(evt.which);
		if (index != -1)
			keysDown.splice(index, 1);
	};

	update();
})