define(function  (require, exports, module) {
	 var SH = require("./showHidden");
	 var Ch = require("./change");
	 window.onload = function  () {
	 	var show_LR = document.getElementById("show_LR");
	 	var LR = document.getElementById("LR");
	 	var land = document.getElementById("land");
	 	var register = document.getElementById("register");
	 	var land_content = document.getElementById("land_content");
	 	var cancel = document.getElementById("cancel");
	 	var detail_1 = document.getElementById("detail_1");
	 	var fourth = document.getElementById("fourth");
	 	var p1 = document.getElementById("p1");
	 	var p2 = document.getElementById("p2");
	 	land.onclick = () => {
	 		SH.show(land_content);
	 		SH.hidden(register_content);
	 		Ch.style(land, "color", "black");
	 		Ch.style(land, "backgroundColor", "white");
	 		Ch.style(register, "color", "white");
	 		Ch.style(register, "backgroundColor", "black");
	 	};
	 	register.onclick = () => {
	 		SH.show(register_content);
	 		Ch.style(register, "color", "black");
	 		Ch.style(register, "backgroundColor", "white");
	 		SH.hidden(land_content);
	 		Ch.style(land, "color", "white");
	 		Ch.style(land, "backgroundColor", "black");
	 	};
	 	show_LR.onclick = () => {
	 		if(LR.style.display == "none")
	 		{
	 			SH.show(LR);
	 		}
	 		else 
	 		{
	 			SH.hidden(LR);
	 		}
	 	}
	 	cancel.onclick = () => {
	 		SH.hidden(LR);
	 	};
	 	p1.onclick = () => {
	 		SH.hidden(fourth);
	 		SH.show(detail_1);
	 		Ch.style(p1, "backgroundColor", "#5E5E60");
	 		Ch.style(p2, "backgroundColor", "#000");
	 	};
	 	p2.onclick = () => {
	 		SH.hidden(detail_1);
	 		SH.show(fourth);
	 		Ch.style(p1, "backgroundColor", "#000");
	 		Ch.style(p2, "backgroundColor", "#5E5E60");
	 	};
	 };
});