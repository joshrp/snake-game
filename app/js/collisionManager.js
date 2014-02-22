define(function () {
	var methods = {
		// Does a entirely contain b
		// {x,y,w,h}, {x,y,w,h}
		containsInclusive: function (a, b) {
			if (b.x < a.x)
				return 'left';

			if (b.y < a.y)
				return 'top';

			if (b.y + b.h > a.h)
				return 'bottom';

			if (b.x + b.w > a.w)
				return 'right';

			return false;
		}
	}

	return methods;
});