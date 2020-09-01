//手风琴菜单功能
$(function(){
	$(".sidebar-list").on('click',function(){
		// $(this).find("ul").slideToggle(200);
		$(event.target).find("ul").slideToggle(200).parent('li').siblings().children().slideUp(200);
	});
});
//轮播图功能
$(function(){
	var prev=$('.prev');
	var next=$('.next');
	var scroll_photo=$('.scroll-photo');
	var scroll_button=$('.scroll-button span');
	var index=1;
	var timer;
	var left=parseInt(scroll_photo.css('left'));
	function prevbuttonclick(){
		left=parseInt(scroll_photo.css('left'));
		index-=1;
		showscrollbutton();
		if (left>-1000) {scroll_photo.css('left',-6000);}
		scroll_photo.animate({'left':'+=1000'},300);
	};
	function nextbuttonclick(){
		left=parseInt(scroll_photo.css('left'));
		index+=1;
		showscrollbutton();
		if (left<-5000) {scroll_photo.css('left',0);}
		scroll_photo.animate({'left':'-=1000'},300);
	};
	function showscrollbutton(){
		if (index==7) {index=1;}
		else if (index==0) {index=6;}
		scroll_button.eq(index-1).addClass('button-on').siblings().removeClass('button-on');
	};
	function play(){
		timer=setTimeout(function() {
			nextbuttonclick();
			play();
		}, 3300);
	}
	function stop(){
		clearTimeout(timer);
	}
	scroll_button.each(function(){
		$(this).bind('click',function(){
			if ($(this).attr('class')=='button-on') {return;}
			var OLDLEFT=parseInt(scroll_photo.css('left'));
			var clickindex=parseInt($(this).attr('index'));
			var clickleft=(-1000)*(clickindex-index);
			var NEWLEFT=OLDLEFT+clickleft;
			scroll_photo.animate({'left':NEWLEFT},300);
			var judge=parseInt(scroll_photo.css('left'));
			if (judge>-1000||judge<-6000) {
				scroll_photo.animate({'left':judge%6000},300);
			}
			index=clickindex;
			showscrollbutton();
			// newleft=NEWLEFT;
		});
	});
	play();
	scroll_photo.hover(stop,play);
	prev.on('click',prevbuttonclick);
	next.on('click',nextbuttonclick);
});
//返回顶部功能
$(function(){
	$('.backtop').hide();
	var pageHeight=200;
	var backtoptimer=null;
	var totop=$('.backtop');
	totop.on('click',function(){
		backtoptimer=setInterval(function(){
			var scrolltop=$(window).scrollTop()||$('body').scrollTop();
			var scrollspeed=scrolltop/16;
			$(window).scrollTop(scrolltop-scrollspeed);
			if (scrolltop==0) {
				clearInterval(backtoptimer);
			}
		},10);
	});
	$(window).on('scroll',function(){
		// var scrolltop=$(window).scrollTop()||$('body').scrollTop();
		if ($(window).scrollTop()>pageHeight) {
			totop.fadeIn(pageHeight);
		}
		else{
			totop.fadeOut(pageHeight);
		}
	});
});