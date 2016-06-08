 /**
   * [成功提醒框]
   * @author  king
   * @param  [string] msg     [提醒消息]
   * @param  [string] url     [跳转路径]
   */
function _success(msg,url){
	layer.msg(msg,{icon:1,time:2000});
	if(url){
		window.location.href = url;
	}else{
		window.location.reload();
	}
}

/**
   * [失败提醒框]
   * @author  king
   * @param  [string] msg     [提醒消息]
   * @param  [string] url     [跳转路径]
   */
function _error(msg,url){
	layer.msg(msg,{icon:0,time:2000});
	if(url){
		setTimeout(function(){
			window.location.href = url;
		},2000);
	}else{
		setTimeout(function(){
			window.location.reload();
		},2000);
	}
}

/**
   * [弹窗]
   * @author  king
   * @param  [string] title     [弹窗标题]
   * @param  [int] width     [弹窗高宽度]
   * @param  [int] height     [弹窗高度]
   * @param  [string] url     [弹窗页面路径]
   */
function _alert(title,width,height,url){
	var index = layer.open({
	  type: 2,
	  title: title,
	  shadeClose: true,
	  shade: 0.8,
	  area: [width+'px', height+'px'],
	  content: url //iframe的url
	});
	return index;
}