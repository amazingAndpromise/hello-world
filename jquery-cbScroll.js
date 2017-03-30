(function (a) {
	a.fn.tabToggle = function (c) {
		var e = {
			btnCon: a(".tab_btn"),
			btnLeave: a(".slideTxtBox"),
			btnIn: a(".less"),
			btnOut: a(".more"),
			smallBtn: a(".img_btn"),
			imgShow: a("#img_con"),
			btnHg: 100,
			btnSee: 4,
			autoplay: true,
			dir: "up",
			playTime: 3000,
			fdTime: 1000,
			t: "",
			atNum: 3
		};
		var d = a.extend(e, c, {});
		var b = {
			click: function () {
				d.btnCon.on("click", "li", function () {
					var h = a(this);
						h.children().css("border","1px solid #f39a0f").parent().siblings().children().css("border","1px solid #fff");
					var g = h.find("img").attr("src");
					d.imgShow.css("display", "none").attr("src", g).fadeIn(d.fdTime);
				})
			},
			Up: function () {
				var g = parseInt(d.btnCon.css("marginTop"));
				g -= d.btnHg;
				var f = d.btnCon.children("li").first();
				d.btnCon.stop(true, true).animate({
					marginTop: g + "px"
				}, function () {
					f.remove();
					d.btnCon.append(f);
					d.btnCon.css({
						marginTop: 0
					});
					var i = d.btnCon.children("li").first().children().css({
						border: "1px solid #f39a0f"
					}).attr("src");
					d.btnCon.children("li").first().siblings().children().css({
						border: "1px solid #fff"
					});
					d.imgShow.css("display", "none").attr("src", i).fadeIn(d.fdTime)
				});
				
			},
			Down: function () {
				var g = parseInt(d.btnCon.css("marginTop"));
				var f = d.btnCon.children("li").last();
				g += d.btnHg;
				d.btnCon.stop(true, true).animate({
					marginTop: g + "px"
				}, function () {
					f.remove();
					d.btnCon.prepend(f);
					d.btnCon.css({
						marginTop: 0
					})
				});
				var i = d.btnCon.children("li").first().children().css({
						border: "1px solid #f39a0f"
					}).attr("src");
				d.btnCon.children("li").first().siblings().children().css({
					border: "1px solid #fff"
				});
				d.imgShow.css("display", "none").attr("src", i).fadeIn(d.fdTime)
			},
			autoPlay: function () {
				d.t = setInterval(f, d.playTime);
				function f() {
					if (d.dir == "up") {
						d.btnIn.click()
					} else {
						d.btnOut.click()
					}
				}
			},
			pause: function () {
				clearInterval(d.t)
			}
		};
		if (d.btnCon.children("li").length > d.atNum && d.autoplay == true) {
			b.autoPlay()
		}
		b.click();
		d.btnIn.click(function () {
			b.Up()
		});
		d.btnOut.click(function () {
			b.Down()
		});
		d.btnLeave.mouseenter(function () {
			b.pause()
		});
		d.btnLeave.mouseleave(function () {
			d.btnCon.children("li").first().children().css("border","1px solid #f39a0f").parent().siblings().children().css("border","1px solid #fff");
			var s = d.btnCon.children("li").first().children().attr("src");
			d.imgShow.css("display", "none").attr("src", s).fadeIn(d.fdTime);
			if (d.btnCon.children("li").length > d.atNum && d.autoplay == true) {
				b.autoPlay()
			}
		})
	}
})(jQuery);
