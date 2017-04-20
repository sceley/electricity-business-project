define(function  (require, exports, module) {
	var show = (target1) => {
		target1.style.display = "block";
	};
	var hidden = (target1) => {
		target1.style.display = "none";
	};
	exports.show = show;
	exports.hidden = hidden;
});