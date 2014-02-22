require.config({
	baseUrl: '/js',

});

require([
	'lib/pixi',
	'objects/snake',
	'objects/food',
	'buttonHelper',
	'collisionManager'
], function (PIXI, snake, Food, buttonHelper, collisionManager) {
	var stageWidth = 800,
		stageHeight = 600,
		stage = new PIXI.Stage(0x66FF99),
		canvas = document.getElementById("game-canvas"),
		renderer = PIXI.autoDetectRenderer(stageWidth, stageHeight, canvas),
		frameCount = 0,
		foods = [],
		pauseAnimation = false,
		beginningFood = 4,
		stageObjects = [],
		loader = new PIXI.AssetLoader([
			"/resources/1945.png",
			"/resources/food_static.png"
		]),
		addToStage = function (object) {
			stage.addChild(object.sprite);
			stageObjects.push(object)
		}

	loader.onComplete = start;

	loader.load()

	function start() {
		addToStage(snake);

		for (var i=0; i<beginningFood; i++) {
			newFood = new Food();
			newFood.newPosition(stageWidth, stageHeight);
			addToStage(newFood);
			foods.push(newFood);
		}

		animate();
	}

	function animate() {
		frameCount++;

		var objectHelper = {
			buttons: buttonHelper,
			stageObjects: stageObjects,
			frameCount: frameCount,
			stageBoundaries: {
				x: 0,
				y: 0,
				w: stageWidth,
				h: stageHeight
			},
			collisionManager: collisionManager
		};

		hitFood = false;

		for (i in foods) {
			var food = foods[i];

			if (collisionManager.touches(snake.getBounds(), food.getBounds())) {
				hitFood = food;
				break;
			}
		}


		if (hitFood !== false) {
			//snake.eatFood(hitFood);
			hitFood.newPosition(stageWidth, stageHeight);
		}

		stageObjects.forEach(function (obj, i) {
			obj.frameUpdate(objectHelper);
		});

		renderer.render(stage);
		if (!pauseAnimation)
			requestAnimFrame(animate);
	}

	document.body.onkeydown = function(evt) {
		evt = evt || window.event;
		buttonHelper.keyDown(evt);
	};

	document.body.onkeyup = function(evt) {
		evt = evt || window.event;
		buttonHelper.keyUp(evt);
	};

	document.getElementById('pauseButton').onclick = function () {
		pauseAnimation = !pauseAnimation;
		requestAnimFrame(animate);
	}

	console.log(snake)
})