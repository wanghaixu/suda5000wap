 /**
   * [日历插件]
   * @author  king
   * @param  [string] elem     [需显示日期的元素选择器]
   * @param  [boolen] istime     [是否开启时间选择]
   * @param  [json] extend     [扩展参数]
   */
   /*{event:触发事件,
	  format:日期格式,
	  isclear:是否显示清空,
	  istoday:是否显示今天,
	  issure:是否显示确认,
	  festival:是否显示节日,
	  min:最小日期,
	  max:最大日期,
	  start:开始日期,
	  fixed:是否固定在可视区域,
	  zIndex:css z-index,
	  func:日期选好后的回调函数
	 }*/
function calendar(elem,istime,extend){
	if(!extend.format){
		if(istime){
			extend.format = 'YYYY-MM-DD hh:mm:ss';
		}else{
			extend.format = 'YYYY-MM-DD';
		}
	}
	var data = {
		elem: elem, //需显示日期的元素选择器
        event: extend.event, //触发事件
        format: extend.format, //日期格式
        istime: istime, //是否开启时间选择
        isclear: extend.isclear, //是否显示清空
        istoday: extend.istoday, //是否显示今天
        issure: extend.issure, //是否显示确认
        festival: extend.festival, //是否显示节日
        min: extend.min, //最小日期
        max: extend.max, //最大日期
        start: extend.start,    //开始日期
        fixed: extend.fixed, //是否固定在可视区域
        zIndex: extend.zIndex, //css z-index
		choose: extend.func
	};
	laydate(data);
}