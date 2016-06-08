var _base = {
	/* 下拉选择器
	* @param obj Object input框对象
	* @param valArr Array 选择的属性
	* @param titleName String 选择的标题
	*/
	picker:function(obj, valArr, titleName){
		obj.picker({
			toolbarTemplate: '<header class="bar bar-nav">\
				<button class="button button-link pull-right close-picker">确定</button>\
				<h1 class="title">'+titleName+'</h1>\
				</header>',
			cols: [{
				textAlign: 'center',
				values: valArr
			}]
		});
	},
	/*
	* 获取select的值
	* @param objId Object select对象
	*/
	getSelArr:function(obj){
		var selArr = [];
		obj.find($('select')).each(function(index, el) {
			var selVal = $.trim($(this).find('option').not(function(){return !this.selected }).val());
			if(selVal!=''){
				selArr[index] = selVal;
			}
		});
		return selArr;
	}
}
			