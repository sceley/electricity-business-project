define((require, exports, module) => {
	style = (target, target2, color) => {
		target.style[target2] = color;
	};
	exports.style = style;
});