// JavaScript Document

/*左侧点击下拉效果*/
$(document).on("click",".third-left ul li",function() {
	var myThis = $(this);
	$.ajax({
		url:'content.html',
		dataType:"text",
		success:function(e){
			if($(myThis).next().hasClass("ajax-div")){
				$(myThis).next(".ajax-div").remove();
				$(myThis).removeClass('current-li');
				$(myThis).find(".append-right").remove();
			} else {
				$(myThis).addClass('current-li');
				$(myThis).append('<img class="append-right" src="images/right.png"/>');
			    myThis.after(e);
			}
		}
	});
})

/*左侧下拉项，hover后显示弹出框*/
var position;
var t=null;
$(document).on("mouseenter",".ajax-div dl:first-child img",function(){
	position = $(this).position();
	popMyDiv();	
	if(t!=null){
		clearTimeout(t);
		t=null;
	}
})
$(document).on("mouseenter",".ajax-div dl:nth-child(2) img",function(){
	position = $(this).position();
	popMyDiv();	
	if(t!=null){
		clearTimeout(t);
		t=null;
	}
})
function popMyDiv(){
	$.ajax({
		url:'hover.html',
		dataType:'text',
		success:function(e){
			$(document.body).append(e);
			$(".hover").css({"top":position.top + "px","left":193 + "px"});
		}
	});
}
$(document).on("mouseleave",".ajax-div dl:first-child img",function() {
   t=setTimeout("pushMyDiv()",500);
})
$(document).on("mouseleave",".ajax-div dl:nth-child(2) img",function() {
   t=setTimeout("pushMyDiv()",500);
})
$(document).on("mouseenter",".hover",function(){
	$(".hover").css("display","");
	if(t!=null){
		clearTimeout(t);
		t=null;
	}					  
})
$(document).on("mouseleave",".hover",function(){
    pushMyDiv();
})
function pushMyDiv(){	
    $(".hover").remove();  
}


/*左侧整体点击后隐藏、展开*/
$(document).on("click",".left-click",function(){
	if($(".left").css('margin-left') == '0px'){
		$(".left").animate({marginLeft:"-185px"},1000);
		$(this).attr("src","images/left-click0.png");
	} else {
		$(".left").animate({marginLeft:0},1000);
		$(this).attr("src","images/left-click.png");
	}
})


/*头部的scroll鼠标点击滚动*/
$(document).on("click",".scrollControl",function(e){
	var positionX = e.originalEvent.x  || e.originalEvent.layerX || 0;
	if(positionX > 58 && positionX < 99){
		if($(".scrollControl img").css("margin-left") == '0px'){
			$(".scrollControl img").css("margin-left",34);
			$(".right-word").css("color","#0d7cc1");
			$(".left-word").css("color","#707070");
		} else {
			$(".scrollControl img").css("margin-left",0);
			$(".right-word").css("color","#707070");
			$(".left-word").css("color","#0d7cc1");
		}
	}
})

/* 导航icon上点击下拉效果 */
var clickThis;
$(document).on("mouseenter",".has-dropdown",function(){
    var mag_position = $(this).position();	
	clickThis = $(this);
	$(".common-dropdown").css({"position":"absolute","top":mag_position.top + 50 + "px","left":mag_position.left + "px"});
	$(".common-dropdown").slideDown(300);
	if(t!=null){
		clearTimeout(t);
		t=null;
	}
})
$(document).on("mouseleave",".has-dropdown",function(){
	t=setTimeout("shutdown()",500);
})
$(document).on("mouseenter",".common-dropdown",function(){
	$(".common-dropdown").css("display","");
	$.addBackground();
	show_img()
	if(t!=null){
		clearTimeout(t);
		t=null;
	}
})
$(document).on("mouseleave",".common-dropdown",function(){
	$.removeBackground();
	hide_img()
	shutdown();
})
function shutdown(){
	$(".common-dropdown").css("display","none");
}


/* 鼠标经过icon上添加背景 */
$.addBackground = function(){
	clickThis.css({"background":"url(images/icon7.png) left top no-repeat"});
}
$.removeBackground = function(){
	clickThis.css({"background":""});
}
$(document).on("mouseenter",".hasBackground",function(){
	clickThis = $(this);
	$.addBackground();
})
$(document).on("mouseleave",".hasBackground",function(){
	clickThis = $(this);
	$.removeBackground();
})


/*鼠标经过 底层图片更换*/
$(document).on("mouseenter",".show-img",function(){
	clickThis = $(this);
	show_img();
})
$(document).on("mouseleave",".show-img",function(){
	clickThis = $(this);
	hide_img();
})
function show_img(){
	clickThis.find(".img").find("img").css("display","block");
}
function hide_img(){
	clickThis.find(".img").find("img").css("display","none");
}


/*左侧下拉方格*/
$(document).on("mouseenter",".show-child",function(){
	clickThis = $(this);
	common_line1();
})
$(document).on("mouseleave",".show-child",function(){
	t=setTimeout(shut_dropdown,1000);
})
$(document).on("mouseenter",".dropdown-square",function(){
	if(t!=null){
		clearTimeout(t);
		t=null;
	}
	show_img()		
	$(".dropdown-square").css("display","");	
})
$(document).on("mouseleave",".dropdown-square",function(){
	shut_dropdown();
	hide_img();
})

function common_line1(){
	var line_position = clickThis.offset();	
	$(".dropdown-square").css({"top":line_position.top + 50,"left":line_position.left-44});
	$(".dropdown-square").slideDown(50);
	$(".square div").css("border","2px solid #3c4347");
	if(t!=null){
		clearTimeout(t);
		t=null;
	}
}
function shut_dropdown(){
	$(".dropdown-square").css("display","none");
}


/*左侧下拉框中鼠标经过正方形区域框框高亮*/
$(document).on("mouseenter",".square div",function(e){
	var current_value = $(this).data("value");
	var cur_int = parseInt(current_value/4);
	var cur_left = current_value%4;
	$(".square div").css("border","2px solid #3c4347");
	if(cur_left == 0){
		for (i = 1; i <= current_value; i++){
		    $(".square div[data-value = " + i + "]").css("border","2px solid #216eb8");
		}
	} else {
		for (i = 1; i <= current_value; i++){
		    if(i%4 <= cur_left && i%4 !=0){
			    $(".square div[data-value = " + i + "]").css("border","2px solid #216eb8");
		    }		
	    }
	}   	
})






















