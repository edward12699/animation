
var content=new Array();//存放H5代码，加载完成后复制给本地存储，这里直接把内容先写死。
var count=0;//需要页面的index（index从0开始，计数从1开始）
var start;
var touchL;
var mn=-1;
var n=2;//article计数
var scw=screen.height;
var count=0;
var body;
localStorage.content=content;//从AJAX读取存放以后本来应该再转成数组，这里省略这一步。
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
function getStart(ev){
		 if(ev.targetTouches.length==1){
				 start= ev.targetTouches[0].clientY;
				// ev.preventDefault();
		 }
}
function getTouch(ev){
		if(ev.targetTouches.length==1){
				touchL=ev.targetTouches[0].clientY-start;
				//ev.preventDefault();
		}

}
function getEnd(ev,mn) {
		console.log(ev.target);
		var that=this;
		//pull up
				if (touchL <- 10) {
                    count = count + 1;
                    if(count<=1) {
                        count=1;
                        body.style.transform = "translateY(-" + count * screen.height + "px)";
                    }
				}
				//pull down
				 else if (touchL>10) {
						count = count - 1;
                    if(count>=0){
					count=0;	body.style.transform = "translateY(" + count * screen.height + "px)";
				}}
}
window.onload=function()
{
	    $(".crying").bind("webkitAnimationEnd",function(){
            $(this).removeClass("b1").addClass("a");
        })
		var client = getClientsize();
		$("article").css("width",screen.width+"px");
		$("article").css("height",screen.height+"px");
		body=document.body;
		body.addEventListener("touchstart",getStart,false);
		body.addEventListener("touchmove",getTouch,false);
		$("article").bind("touchend",getEnd);
    $(".scaleout").click(function(){
        alert("s")
        $(".img img:nth-child(1)").fadeIn();
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