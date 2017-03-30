// JavaScript Document
/*
* powered by wacke
*/
(function ($) {
    $.fn.aTabs = function (options) {
        $.fn.aTabs.defaults = {
            firstOn: 0,
            className: 'selected',
            eventName: 'all',           //click,mouserover,all
            loadName: '加载中...',     //ajax等待字符串
            fadeIn: 'normal',
            autoFade: false,
			removeAttr : true,
			panel: 'panel',
            autoFadeTime: 3
        };
        var opts = $.extend({}, $.fn.aTabs.defaults, options);
 
        return this.each(function () {
            var target = $(this);
            var div = target.children().not("ul,span");  //所有的tabs显示体div
            var tabs = target.find('ul:eq(0) li');   //所有的tabs头部索引
            function Tabs() {
                if ($(this).hasClass(opts.className)) {
                    return false;
                }
                tabsShow(div, $(this));
                return false;
            }
 
            function tabsShow(div, li, index) {
                div.stop(true, true).hide();
                //自动轮换用
                if (typeof (index) == "number") {
                    if (li.find("a").attr("rel")) ajax(div, li);
                    $(div[index]).stop(true,true).fadeIn(opts.fadeIn);
                    tabs.stop(true, true).removeClass(opts.className);
                    $(tabs[index]).stop(true, true).addClass(opts.className);
                }
                //非自动轮换
                else {
                   // var tabBody = div.filter(li.find("a").attr("href"));
                    if (li.find("a").attr("rel")) ajax(div, li);
                  //  tabBody.stop(true,true).fadeIn(opts.fadeIn);
                    tabs.stop(true, true).removeClass(opts.className);
                    li.stop(true, true).addClass(opts.className);
                }
            }
 
            function ajax(div, li) {
               // var href = li.find("a").attr("href");
                var rel = li.find("a").attr("rel");     //ajax请求url
				var postdata = li.find("a").attr("msg");
				//alert("this="+rel);
//				alert("href="+href);
                //var i = div.filter(href);                 //当前div
				//var i = $("#"+href);
				var i = $("#"+opts.panel);
                if (rel) {                                      //如果ajax请求url不为空，只ajax一次
                    i.html(opts.loadName);
                    $.ajax({
                        url: rel,
                        cache: false,
						data:{msg:postdata},
                        success: function (html) {
                            i.html(html);
                        },
                        error: function () {
                            i.html('加载错误，请重试！');
                        }
                    });
					//alert(opts.removeAttr);
					if(opts.removeAttr)
					{
						//alert("rem");
                    li.find("a").removeAttr("rel");  //只ajax一次
					}
					
                }
            }
            if (opts.autoFade) {
                var index = opts.firstOn + 1;
                setInterval(function () {
                    if (index >= div.length) {
                        index = 0;
                    }
                    tabsShow(div, $(this), index++);
                }, opts.autoFadeTime * 1000);
            }
 
            tabs.bind(opts.eventName == 'all' ? 'click mouseover' : opts.eventName, Tabs)   //绑定事件
                .filter(':first').trigger(opts.eventName == 'all' ? 'click' : opts.eventName);          //自动触发事件
        });
    };
})(jQuery);
