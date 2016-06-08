var win_height; //窗口高度
var win_width; //窗口宽度
var main_height;//列表高度
var form_height;//表单高度
var page_length;//判断分页是否存在
var logo_width; //logo宽度
var admin_width; //管理员清单区域宽度
var menu_width; //顶部菜单宽度

var t_left_height;//滚动列表右边表格高度
var t_right_height;//滚动列表右边表格高度
var t_scrolltop; //滚动列表滚动条距顶部高度
$(function(){
	init();
	$(window).resize(function(){
		init();
	});
});

//页面高度、宽度自适应
function init(){
	//列表内容和表单高度调整
	win_height = $(window).height();
	win_width = $(window).width();
	if(win_width < 768){
		main_height = win_height - 200;
	}else{
		main_height = win_height - 270;
	}
	form_height = main_height + 60;
	$(".form").height(form_height);
	$("#tablelist").height(main_height);
	$(".t_left").height(main_height - 20);
	$(".t_right").height(main_height);
	
	//顶部导航宽度调整
	logo_width = $(".navbar-header").width();
	admin_width = $(".navbar-right").width();
	menu_width = win_width - (logo_width + admin_width + 60);
	$(".menu-nav").width(menu_width);
}

//列表滚动模板
function tableScroll(){
	t_scrolltop = $(".t_right").scrollTop();
	$(".t_left").scrollTop(t_scrolltop);
}

//获取小屏幕弹窗宽度
function getLayerWidth(bodyW){
	var win_width;
	if(bodyW > 640){
		win_width = 650 + 'px';
	}
	else{
		win_width = bodyW + 'px';
	}
	return win_width;
}