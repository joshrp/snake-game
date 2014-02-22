require.config({
	baseUrl: '/js',

});

require([
	'lib/pixi',
	'objects/snake',
	'buttonHelper',
	'collisionManager'
], function (PIXI, snake, buttonHelper, collisionManager) {
	var stageWidth = 800,
		stageHeight = 600,
		countStageBoundaries = true,
		stage = new PIXI.Stage(0x66FF99),
		canvas = document.getElementById("game-canvas"),
		renderer = PIXI.autoDetectRenderer(
			stageWidth,
			stageHeight,
			canvas
		),
		frameCount = 0,
		stageObjects = [];

	stage.addChild(snake.sprite);
	stageObjects.push(snake);

	function doesCollide (x,y,w,h) {
		// Check stage bondaries
		var collision = {};

		stageSide = collisionManager.containsInclusive({
			x: 0,
			y: 0,
			w: stageWidth,
			h: stageHeight
		}, {
			x: x,
			y: y,
			w: w,
			h: h
		});

		if (stageSide != false) {
			collision.type = 'stage'
			collision.side = stageSide;
			return collision;
		}


	}

	function update() {
		frameCount++;

		var objectHelper = {
			buttons: buttonHelper,
			stageObjects: stageObjects,
			frameCount: frameCount,
			doesCollide: doesCollide
		};

		stageObjects.forEach(function (obj, i) {
			obj.frameUpdate(objectHelper);
		});

		renderer.render(stage);

		requestAnimFrame(update);
	}

	document.body.onkeydown = function(evt) {
		evt = evt || window.event;
		buttonHelper.keyDown(evt);
	};

	document.body.onkeyup = function(evt) {
		evt = evt || window.event;
		buttonHelper.keyUp(evt);
	};

	update();
	console.log(snake)
})