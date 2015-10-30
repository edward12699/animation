
function a(a){
		alert("assd")
		if(typeof a!=='number')throw new TypeError();//构造函数首字母要大写
		else throw({
				'name':'b'
		})
		return a*a;
}(1);
try{a("3");}
catch(ex){
		if(ex.name=='a')alert("s");
		if(ex.name=='b')alert("sd")
		console.log(ex);
}
function b(){
		a:1;
			b:2
}























/**
 * Created by xiaoxiang on 2015/10/14.
 * 页面上拉到底以后的过程，此时article的个数已经知道
 * 页面采取清空article的方式，所以初加载的时候直接把内容先放到本地存储，再从本地存储放到页面上
 * 理想方式是后台修改HTML CSS JS文件，不知道分成几份和整成一份性能和修改难易度。
 * 页面只放3个article，因为有页面背景啊，不然就可以用一个article。
 */
var content=new Array();//存放H5代码，加载完成后复制给本地存储，这里直接把内容先写死。
var count=0;//需要页面的index（index从0开始，计数从1开始）
var start;
var touchL;
var mn=-1;
var n=2;//article计数
var scw=screen.height;
content=[
		"<div class='crying b1'><img src='../image/crying.png'></div><div class='crying b2'><img src='../image/crying.png'></div><div class='crying b3'><img src='../image/crying.png'></div><div class='crying b4'><img src='../image/crying.png'></div><div  class='mg' ><div class='man man1'><img src='../image/man.png'></div><div class='girl girl1'><img src='../image/girl.png'></div></div><span class='arrow'></span>"
	,'<div class="crying1"><img src="../image/crying.png" class="c1"><img src="../image/arrow_yellow.png" class="c2"><img src="../image/girl.png" class="c3"><img src="../image/girl.png" class="c4"><img src="../image/girl.png"class="c5"><img src="../image/girl.png"class="c6"><img src="../image/girl.png"class="c7"><img src="../image/girl.png"class="c8"><img src="../image/girl.png"class="c9"></div>'
]
localStorage.content=content;//从AJAX读取存放以后本来应该再转成数组，这里省略这一步。
(function(window) {
		function getClientsize() {
				if (document.compatMode == "BackCompat")
						return {
								height: document.body.clientHeight,
								width: document.body.clientWidth
						}
				else return{
						height: document.documentElement.clientHeight,
						width: document.documentElement.clientWidth
				}
		}
		window.getClientsize = getClientsize;
})(window);

(function(window){function getStart(ev){
		 if(ev.targetTouches.length==1){
				 start= ev.targetTouches[0].clientY;
				 ev.preventDefault();
		 }
}window.getStart=getStart;})(window);

(function(window){
		function getTouch(ev){
		if(ev.targetTouches.length==1){
				touchL=ev.targetTouches[0].clientY-start;
				ev.preventDefault();
		}

}
		window.getTouch=getTouch;
})(window);

(function(window){
		function getEnd(ev,mn) {
				console.log(ev.target);
				var that=this;
				//pull up
				if (touchL <- 10) {
						count = count + 1;
						$(that).empty();
						body.style.transform = "translateY(-" + count * screen.height + "px)";
//如果已经到页面底部了，记载的内容就变成第一页
						if (count >= n) {
								count = 0;
						}
						$("article:eq(2)").append(content[count]);//猜测：这里是在transform执行的时候进行还是完成transform事件以后进行。所以能看到动画
						//增加第三个article，删除第一个article，设置动画，掩盖变化的痕迹
						$("body").css({
								"transition":"transform 0s linear",
								"transform":"translateY(-"+scw+"px)"
						})
						$("article:eq(0)").remove();
						$("body").append("<article></article>");
						$("article:eq(2)").bind("touchend",getEnd);
						//还原
						$("article").css("width",screen.width+"px");
						$("article").css("height",screen.height+"px");
						$("body").css({
								"transition":"transform 0.5s linear"
						})
				}
				//pull down
				else if (touchL>10) {
						count = count - 1;
						$(that).empty();
						body.style.transform = "translateY(" + count * screen.height + "px)";
//如果已经到页面顶部了，记载的内容就变成最后一页
						if (count < 0) {
								count = n-1;
						}
						$("article:eq(0)").append(content[count]);//猜测：这里是在transform执行的时候进行还是完成transform事件以后进行。所以能看到动画
						//增加第1个article，删除第3个article，设置动画，掩盖变化的痕迹
						$("body").css({
								"transition":"transform 0s linear",
								"transform":"translateY(-"+scw+"px)"
						})
						$("article:eq(2)").remove();
						$("body").prepend("<article></article>");
						$("article:eq(0)").bind("touchend",getEnd);
						$("article").css("width",screen.width+"px");
						$("article").css("height",screen.height+"px");
						$("body").css({
								"transition":"transform 0.5s linear"
						})
				}
				ev.stopPropagation();
		}
		window.getEnd=getEnd;//这样就可以在全局中引用这个函数了。而这个函数中的变量却不会污染外部
})(window)
window.onload=function()
{
		var client = getClientsize();
		$("article").css("width",screen.width+"px");
		$("article").css("height",screen.height+"px");
		body=document.body;
		$("body").css("transform","translateY(-"+scw+"px)")
		body.addEventListener("touchstart",getStart,false);
		body.addEventListener("touchmove",getTouch,false);
		$("article").bind("touchend",getEnd);
		$(".clickme").click(function(){
var article=document.createElement("article");
				article.appendChild(document.createTextNode("sddfwe\n\n\n"));
				var first=document.body.firstChild;//得到页面的第一个元素
				document.body.insertBefore(article,first);
				body.style.transform="translateY(-54px)";

		})
}


//								for (var i = 0; i < 9; i++) {
//										$(".crying1 img:eq(" + i + ")").addClass("c" + (i + 1))
//								}
//								$(".crying").removeClass("b1").removeClass("b2").removeClass("b3").removeClass("b4")

//						else{
//								count=0;
//								body.style.transform = "translateY(-" + count * screen.height + "px)";
//								$(".man").addClass("man1");
//								$(".girl").addClass("girl1")
//								for (var i = 0; i < 9; i++) {
//										var j = 'c' + (i + 1);
//										$(".crying1 img:eq(" + i + ")").removeClass(j);
//
//								}
//								for (var i = 0; i < 4; i++) {
//										$(".crying:eq(" + i + ")").addClass("b" + (i + 1));
//								}
//						}
//				}