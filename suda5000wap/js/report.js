define(function(require,exports,module){
	var _Public = require('./public');
	var selNum = 0;
	var filter = JSON.parse(localStorage.getItem('filter'));
	//接口地址
	var url_suffix = localStorage.getItem('sdIP');
	function _report(){};
	/*
	 * 设置筛选默认条件
	 * filType 筛选页面类型，'bill'表示单据筛选,'credit'表示财务汇总筛选,'product'表示货品筛选
	 */
	function defaultFilter(filType,selNum){
		var arg = [];
		//筛选条件显示个数（币种除外）
		var num = 2;
		if (filType == 'bill') {
			arg = ['supplier','client','goods'];
		} else if(filType == 'credit') {
			arg = ['supplier','client','contact'];
		} else {
			arg = ['filt_stock','filt_storeType','filt_product'];
			num = 3
		}
		//加载滚动选择插件
		if (selNum == num) {
			if((filter != null) && (filter.select.length != 0)) {
				var select,val;
				//设置筛选条件
				for (var i = 0; i < filter.select.length; i++) {
					select = document.getElementById(filter.select[i]._dom);
					val = filter.select[i]._val;
					for (var j = 0; j<select.length; j++) {
						if(select[j].value == val){
							select[j].selected = true;
							break;
						}
					};
				};
			}
			for (var i = 0; i < arg.length; i++) {
				$('#'+ arg[i]).mobiscroll().select({
					theme: 'mobiscroll',
					lang: 'zh',
					display: 'bottom',
					mode: 'selectBasic'
				});
			};
			setTimeout(function(){layer.closeAll();}, 1000);
			selNum = 0;
		}
	}
	_report.prototype={
		/*
		 * 报表页面数据获取拼接函数
		 * modId 页面获取数据id
		 * html 获取数据成功html拼接代码
		 * errHtml 获取数据失败html拼接代码
		 * type 报表页面类型，list: 单据页面；collect：财务汇总; product: 货品库存
		 * url 接口地址
		 */
		addData: function(modId, html, type, url){
			var filter = JSON.parse(localStorage.getItem('filter'));
			var sDate,eDate;
			//参数
			var postData={
			  'modId': modId,
			  'iMoneyHeadType': 1,
			  'limit': 10000000,
			  'pageSize': 10000,
			  'start': 0,
			};
			if (type == 'list') {
				postData['calcQtySum'] = 1;
				postData['cmbMoney'] = 0;
			} else if (type == 'product') {
				postData['StockCmb']= 0;
				postData['calcQtySum']= 1;
				postData['bStartEnd']= 0;
				postData['bHappen']= 0;
				postData['iMoneyHeadType']= 0;
			} else {
				postData['cmbMoney'] = 0;
			}
			//判断是否有过滤条件缓存
			if ((filter == null) || (filter.length == 0)) {
				var dataArg = _Public.getDates();
				sDate = dataArg.eDate;
				eDate = dataArg.sDate;
			} else {
				sDate = filter.sDate;
				eDate = filter.eDate;
				var select = filter.select;
				//添加过滤输入参数
				for (var i = 0; i < select.length; i++) {
					if (select[i]._id == '17') {
						postData['StockCmb'] = select[i]._index * 1;
					} else {
						postData['filterItems['+i+'].fieldType'] = 'ft_ListStr';
						postData['filterItems['+i+'].id'] = select[i]._id;
						postData['filterItems['+i+'].operatertitle'] = '等于';
						postData['filterItems['+i+'].value'] = select[i]._val;
						postData['filterItems['+i+'].index'] = select[i]._index;
					}
				};
				if (type != 'product') {
					postData['cmbMoney'] = filter.codeId;
				};
			}
			postData['beginDate'] = sDate;
			postData['sdate'] = sDate;
			postData['endDate'] = eDate;
			postData['edate'] = eDate;
			$.ajax({
				type: 'post',
				url: 'http://'+url_suffix+ url,
				dataType: 'json',
				data: postData,
				timeout: 3000,
				success: function(data){
					var tip;
					//定义货币符号
					var moneyC;
					//判断是否有过滤条件缓存
					if ((filter == null) || (filter.length == 0)) {
						moneyC = '￥';
						tip = '最近一个月内无数据';
					} else {
						moneyC = filter.mCode;
						if (moneyC == '-1') {
							moneyC = '';
						}
						tip = '暂无数据';
					}
					var arg = {
						tip: tip,
						moneyC: moneyC,
						data: data
					}
					html(arg);
				},
				error: function(xhr, type){
					if(xhr.statusText=='timeout'){
						_Public.layerMsg('网络连接超时');
					}else{
						_Public.layerMsg(xhr.statusText);
					}
					layer.closeAll();
				}
			});
		},
		/*
		 * 加载过滤条件的数据
		 * dom 该过滤条件select的id
		 * filt 该过滤条件filter值（每个过滤条件值固定）
		 * type 该过滤条件viewName值（每个过滤条件值固定）
		 * filType 筛选页面类型，'bill'表示单据筛选,'credit'表示财务汇总筛选,'product'表示货品筛选
		 */
		selectData:function(dom,fil,type,filType) {
			var data = {
				'viewName': type,
				'filter':fil,
				'likeValue':'',
				'pageSize': 100000,
				'start': 0,
				'filterH5Type': 1
			}
			$.ajax({
				type: 'post',
				url: 'http://'+ url_suffix +'/lookupdm/lookupdata.action',
				dataType: 'json',
				data: data,
				timeout: 3000,
				success: function(data){
					if (data.errNo) {
						layer.closeAll();
						_Public.closeTologin(data.errMsg);
					} else {
						var list = data.listData;
						var str = '';
						for (var i = 0; i < list.length; i++) {
							str += '<option data-name="'+ list[i].code +'" value="'+ list[i].name +'">'+ list[i].name +'</option>';
						};
						dom.append(str);
						selNum = selNum + 1;
						defaultFilter(filType,selNum);
					}
				},
				error: function(xhr, type){
					if(xhr.statusText=='timeout'){
						_Public.layerMsg('网络连接超时');
					}else{
						_Public.layerMsg(xhr.statusText);
					}
					layer.closeAll();
				}
			});
		},
		/*
		 * 获取货币过滤条件数据
		 * dom 货币select 节点
		 * filType 筛选页面类型,'credit'表示财务汇总筛选,'product'表示货品筛选
		 */
		moneyCode:function(dom) {
			var data = {
				'iMoneyHeadType': '1',
				'viewName':'qryMoneyRpt',
				'filter': '1=1',
				'likeValue':'',
				'pageSize': 100000,
				'start': 0,
			}
			$.ajax({
				type: 'post',
				url: 'http://'+url_suffix+'/lookupdm/lookupdata.action',
				dataType: 'json',
				data: data,
				timeout: 3000,
				success: function(data){
					if (data.errNo) {
						layer.closeAll();
						_Public.closeTologin(data.errMsg);
					} else {
						var list = data.listData;
						var str = '';
						for (var i = 0; i < list.length; i++) {
							str += '<option data-name="'+ list[i].code +'" value="'+ list[i].id +'">'+ list[i].name +'</option>';
						};
						dom.append(str);
						var codeName;
						if ((filter != null) && (filter.length != 0)) {
							coddName = filter.CodeName
						} else {
							coddName = '人民币';
						}
						dom.find('option').each(function () {
							if($(this).text().indexOf(coddName) == 0){
								$(this).attr("selected",true)
							}
						});
						dom.mobiscroll().select({
							theme: 'mobiscroll',
							lang: 'zh',
							display: 'bottom',
							mode: 'selectBasic'
						});
					}
				},
				error: function(xhr, type){
					if(xhr.statusText=='timeout'){
						_Public.layerMsg('网络连接超时');
					}else{
						_Public.layerMsg(xhr.statusText);
					}
					layer.closeAll();
				}
			});
		},
		/*
		 * 获取往来类型，货品类型过滤条件数据
		 * dom 货币select 节点
		 * postData 输入参数
		 */
		selectContact:function(dom, postData,filType) {
			$.ajax({
				type: 'post',
				url: 'http://'+url_suffix+'/rpt/basefilter!doGetFilterItemsData.action',
				dataType: 'json',
				data: postData,
				timeout: 3000,
				success: function(data){
					if (data.errNo) {
						layer.closeAll();
						_Public.closeTologin(data.errMsg);
					} else {
						var list = data.filterItems;
						var str = '';
						for (var i = 0; i < list.length; i++) {
							str += '<option data-name="'+ list[i].code +'" value="'+ list[i].lcode +'">'+ list[i].name +'</option>';
						};
						dom.append(str);
						selNum = selNum + 1;
						defaultFilter(filType,selNum);
					}
				},
				error: function(xhr, type){
					if(xhr.statusText=='timeout'){
						_Public.layerMsg('网络连接超时');
					}else{
						_Public.layerMsg(xhr.statusText);
					}
					layer.closeAll();
				}
			});
		},
		/*
		 * 获取筛选条件
		 * arg 筛选条件select 节点
		 * 返回值result 数组包含过滤条件值value、显示名称text
		 */
		values:function(arg){
			var result= [];
			var v,t,index,dom;
			var arry;
			for (var i = 0; i < arg.length; i++) {
				dom = $('#'+arg[i]);
				v = dom.val();
				t = dom.find('option:selected').text();
				index = dom.find('option:selected').attr('data-name');
				if (v != 'null') {
					arry = {
						_dom: arg[i],
						_id: $('#'+arg[i]).attr('data-id'),
						_val: v,
						_index: index,
						_text: t,
					};
					result.push(arry);
				}
			};
			return result;
		},
		/*
		 * 报表页面添加过滤条件
		 */
		setfilterName:function(){
			var filter = JSON.parse(localStorage.getItem('filter'));
			$('.filtCondition').remove();
			if ((filter != null) && (filter.length != 0)) {
				var str_fil = '';
				str_fil += '<span class="filtCondition">'+filter.sDate+'~'+filter.eDate+'</span>';
				if (typeof(filter.CodeName) != 'undefined') {
					str_fil += '<span class="filtCondition">'+filter.CodeName+'</span>';
				}
				var select = filter.select
				if (select.length !=0) {
					for (var i = 0; i < select.length; i++) {
						str_fil += '<span class="filtCondition">'+select[i]._text+'</span>';
					};
				}
				$('.filterArea').append(str_fil);
				$('.filterArea').show();
			}
		},
		/*
		 * 设置默认时间
		 * start 开始时间input节点
		 * end   结束时间input节点
		 */
		setTimes:function(start,end){
			var data = _Public.getDates();
			var startTime = data.eDate;
			var endTime = data.sDate;
			if((filter != null) && (filter.length != 0)) {
				startTime = filter.sDate;
				endTime = filter.eDate;
			}
			//初始化日历插件
			/*startDate 开始日期*/
			_Public.selectDates(start,startTime);
			/*endDate 结束日期*/
			_Public.selectDates(end,endTime);
		}
	}
	_report.prototype.constructor=_report;
	module.exports=new _report();
});