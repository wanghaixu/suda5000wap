//define(function (require, exports, module) {
//    var _Public = require('./public');
function Enhance_index() {
    //列表接口地址
    this.listUrl = {
        'sorder': '/sa/saorder/sorderList!doGetListData.action',//销售订单
        'sbilling': '/sa/sale/saleList!doGetListData.action',//销售开单
        'porder': '/pa/paorder/porderList!doGetListData.action',//采购订单
        'pbilling': '/pa/papurchase/ppurchaseList!doGetListData.action'//采购开单
    }
    //添加
    this.billAddUrl = {
        'sorder': '/sa/saorder/sorderEdit!doGetAddnewData.action',//销售订单新增
        'sbilling': '/sa/sale/saleEdit!doGetAddnewData.action',//销售开单新增
        'porder': '/pa/paorder/porderEdit!doGetAddnewData.action',//采购订单新增
        'pbilling': '/pa/papurchase/ppurchaseEdit!doGetAddnewData.action'//采购开单新增
    }
    //保存
    this.billSaveUrl = {
        'sorder': '/sa/saorder/sorderEdit!save.action',//销售订单详情
        'sbilling': '/sa/sale/saleEdit!save.action',//销售开单详情
        'porder': '/pa/paorder/porderEdit!save.action',//采购订单详情
        'pbilling': '/pa/papurchase/ppurchaseEdit!save.action',//采购开单详情
    }
    //编辑
    this.billEditUrl = {
        'sorder': '/sa/saorder/sorderEdit!doGetEditData.action',//销售订单详情
        'sbilling': '/sa/sale/saleEdit!doGetEditData.action',//销售开单详情
        'porder': '/pa/paorder/porderEdit!doGetEditData.action',//采购订单详情
        'pbilling': '/pa/papurchase/ppurchaseEdit!doGetEditData.action',//采购开单详情
    }
    //删除
    this.billDelUrl = {
        'sorder': '/sa/saorder/sorderEdit!Delete.action',//销售订单删除
        'sbilling': '/sa/sale/saleEdit!Delete.action',//销售开单删除
        'porder': '/pa/paorder/porderEdit!Delete.action',//采购订单删除
        'pbilling': '/pa/papurchase/ppurchaseEdit!Delete.action'//采购开单删除
    }
    //billtype
    this.billtype = {
        'sorder': 12,//销售订单
        'sbilling': 14,//销售开单
        'porder': 2,//采购订单
        'pbilling': 4//采购开单
    }
    //modeid
    this.modeid = {
        'sorder': 12,//销售订单
        'sbilling': 14,//销售开单
        'porder': 2,//采购订单
        'pbilling': 4//采购开单
    }
    //列表页名称
    this.listPageName = {
        'sorder': 'order_frame.html',
        'sbilling': 'billing_frame.html',
        'porder': 'order_frame.html',
        'pbilling': 'billing_frame.html'
    }
    //列表详情页名称
    this.detailPageName = {
        'sorder': 'order_edit_frame.html',
        'sbilling': 'billing_edit_frame.html',
        'porder': 'order_edit_frame.html',
        'pbilling': 'billing_edit_frame.html'
    }
    //列表详情页编辑模式名称
    this.detailEditPageName = {
        'sorder': './order_edit_frame.html?action=edit&type=sorder&billId=',
        'sbilling': './billing_edit_frame.html?action=edit&type=sbilling&billId=',
        'porder': './order_edit_frame.html?action=edit&type=porder&billId=',
        'pbilling': './billing_edit_frame.html?action=edit&type=pbilling&billId='
    }
    //列表初始化参数
    this.initData = {
        'sorder': function () {
            return {
                // 'beginDate': _basic.getDates().sDate,
                // 'endDate': _basic.getDates().eDate,
                // 'sdate':  _basic.getDates().sDate,
                // 'edate': _basic.getDates().eDate,
                'filterisOR': 'true',
                'iMoneyHeadType': '0',
                'limit': '20',
                'modId': '2012'
            }
        },
        'sbilling': function () {
            return {
                // 'beginDate': _basic.getDates().sDate,
                // 'endDate': _basic.getDates().eDate,
                // 'sdate':  _basic.getDates().sDate,
                // 'edate': _basic.getDates().eDate,
                'filterisOR': 'true',
                'iMoneyHeadType': '0',
                'limit': '20',
                'modId': '2014'
            }
        },
        'porder': function () {
            return {
                // 'beginDate': _basic.getDates().sDate,
                // 'endDate': _basic.getDates().eDate,
                // 'sdate':  _basic.getDates().sDate,
                // 'edate': _basic.getDates().eDate,
                'filterisOR': 'true',
                'iMoneyHeadType': '0',
                'limit': '20',
                'modId': '2002'
            }
        },
        'pbilling': function () {
            return {
                // 'beginDate': _basic.getDates().sDate,
                // 'endDate': _basic.getDates().eDate,
                // 'sdate':  _basic.getDates().sDate,
                // 'edate': _basic.getDates().eDate,
                'filterisOR': 'true',
                'iMoneyHeadType': '0',
                'limit': '20',
                'modId': '2004'
            }
        }
    }
    //根据请求类型获取主单据标题
    this.detailPageTitle = {
        'sorder': '销售订单',
        'sbilling': '销售开单',
        'porder': '采购订单',
        'pbilling': '采购开单',
    }
    //根据请求类型获取单据列表标题
    this.listPageTitle = {
        'sorder': '销售订单列表',
        'sbilling': '销售开单列表',
        'porder': '采购订单列表',
        'pbilling': '采购开单列表',
    }
    //根据请求类型获取主单据(供应商/客户)标题
    this.getTraderTilte = {
        'sorder': '客户',
        'sbilling': '客户',
        'porder': '供应商',
        'pbilling': '供应商'
    }
    //根据请求类型获取主单据(供应商/客户)标题
    this.getRevDateTitle = {
        'sorder': '发货日期',
        'sbilling': '发货日期',
        'porder': '到货日期',
        'pbilling': '到货日期'
    },
    //根据请求类型获取主单据(本次现收/本次现付)标题
    this.getPaytheodTilte = {
        'sbilling': '本次现收',
        'pbilling': '本次现付'
    }
    //根据请求类型获取主单据(供应商/客户)的筛选条件
    this.getTraderFilter = {
        '': function () {
            return {};
        },
        'sorder': function () {
            //客户筛选条件
            return {
                'viewName': 'qryTrader',
                'filter': '(IsClient=1 and Closed=0 and TraderID>0 ) or (acctrader=1 and Closed=0 and TraderID>0 )',
                'billedit': 'true',
                'isH5': 'true',
                'modeid': '12',
                'likeValue': ''
            }
        },
        'sbilling': function () {
            //客户筛选条件
            return {
                'viewName': 'qryTrader',
                'filter': '(IsClient=1 and Closed=0 and TraderID>0 ) or (acctrader=1 and Closed=0 and TraderID>0 )',
                'billedit': 'true',
                'isH5': 'true',
                'modeid': '14',
                'likeValue': ''
            }
        },
        'porder': function () {
            //供应商筛选条件
            return {
                'viewName': 'qryTrader',
                'filter': '(IsVendor=1 and Closed=0 and TraderID>0 ) or (acctrader=1 and Closed=0 and TraderID>0 )',
                'billedit': 'true',
                'isH5': 'true',
                'modeid': '2',
                'likeValue': ''
            }
        },
        'pbilling': function () {
            //供应商筛选条件
            return {
                'viewName': 'qryTrader',
                'filter': '(IsVendor=1 and Closed=0 and TraderID>0 ) or (acctrader=1 and Closed=0 and TraderID>0 )',
                'billedit': 'true',
                'isH5': 'true',
                'modeid': '4',
                'likeValue': ''
            }
        }
    }
    //筛选初始化参数
    this.filterTypeItem = {
        'sorder': function () {
            return {
                "filterItems[4].id": '473',
                "filterItems[4].index": 'K001',
                "filterItems[4].name": '客户'
            }
        },
        'sbilling': function () {
            return {
                "filterItems[4].id": '473',
                "filterItems[4].index": 'K0022',
                "filterItems[4].name": '供应商'
            }
        },
        'porder': function () {
            return {
                "filterItems[4].id": '477',
                "filterItems[4].index": 'K001',
                "filterItems[4].name": '客户'
            }
        },
        'pbilling': function () {
            return {
                "filterItems[4].id": '477',
                "filterItems[4].index": 'K0022',
                "filterItems[4].name": '供应商'
            }
        }
    }
    //基础资料搜索
    this.searchTraderData = {
        'sorder': function (keyword) {
            //客户筛选条件
            return {
                'viewName': 'qryTrader',
                'filter': "((IsClient=1 and Closed=0 and TraderID>0 ) or (acctrader=1 and Closed=0 and TraderID>0 ))  and (name like '%" + keyword + "%' or code like '%" + keyword + "%')",
                'filter_code': 'true',
                'billedit': 'true',
                'isH5': 'true',
                'modeid': '12',
                'likeValue': keyword
            }
        },
        'sbilling': function (keyword) {
            //客户筛选条件
            return {
                'viewName': 'qryTrader',
                'filter': "((IsClient=1 and Closed=0 and TraderID>0 ) or (acctrader=1 and Closed=0 and TraderID>0 ))  and (name like '%" + keyword + "%' or code like '%" + keyword + "%')",
                'filter_code': 'true',
                'isH5': 'true',
                'modeid': '14',
                'likeValue': keyword
            }
        },
        'porder': function (keyword) {
            //供应商筛选条件
            return {
                'viewName': 'qryTrader',
                'filter': "((IsVendor=1 and Closed=0 and TraderID>0 ) or (acctrader=1 and Closed=0 and TraderID>0 ))  and (name like '%" + keyword + "%' or code like '%" + keyword + "%')",
                'filter_code': 'true',
                'isH5': 'true',
                'modeid': '2',
                'likeValue': keyword
            }
        },
        'pbilling': function (keyword) {
            //供应商筛选条件
            return {
                'viewName': 'qryTrader',
                'filter': "((IsVendor=1 and Closed=0 and TraderID>0 ) or (acctrader=1 and Closed=0 and TraderID>0 ))  and (name like '%" + keyword + "%' or code like '%" + keyword + "%')",
                'filter_code': 'true',
                'isH5': 'true',
                'modeid': '4',
                'likeValue': keyword
            }
        },
    }
    //基础资料参数
    this.baseData = {
        //供应商
        'traderName': function () {
            return {
                'viewName': 'qryTrader',
                'filter': '(IsVendor=1 and Closed=0 and TraderID>0 ) or (acctrader=1 and Closed=0 and TraderID>0)',
                'billedit': 'true',
                'isH5': 'true',
                'likeValue': ''
            }
        },
        //客户
        'customer': function () {
            return {
                'viewName': 'qryTrader',
                'filter': '(IsClient=1 and Closed=0 and TraderID>0 ) or (acctrader=1 and Closed=0 and TraderID>0)',
                'billedit': 'true',
                'isH5': 'true',
                'likeValue': ''
            }
        },
        //部门
        'department': function () {
            return {
                'viewName': 'qryDepartment',
                'filter': 'closed=0',
                'isH5': 'true',
                'likeValue': ''
            }
        },
        //业务员
        'employ': function () {
            var shopid = window.localStorage.getItem('shopID') || '';
            return {
                'viewName': 'qryEmploy',
                'filter': 'closed=0 and isrep=1 and shopid=' + shopid,
                'isH5': 'true',
                'likeValue': ''
            }
        },
        //发票类型
        'noteType': function () {
            return {
                'viewName': 'qryNoteType',
                'filter': '1=1',
                'isH5': 'true',
                'likeValue': ''
            }
        },
        //结算方式
        'ctraderType': function () {
            return {
                'viewName': 'qryPayMethod',
                'filter': '1=1',
                'isH5': 'true',
                'likeValue': ''
            }
        },
        //结算账户
        'settleAccount': function () {
            var shopid = window.localStorage.getItem('shopID') || '';
            return {
                'viewName': 'qryAccount',
                'filter': 'shopid=' + shopid + ' and closed=0',
                'isH5': 'true',
                'likeValue': ''
            }
        },
        //币种
        'moneyName': function () {
            return {
                'viewName': 'qryMoney',
                'isH5': 'true',
            }
        },
        //单据类型(销售)
        'sbilling': function () {
            return {
                'viewName': 'qryBillKind',
                'isH5': 'true',
                'filter': 'kind=6'
            }
        },
        //单据类型(采购)
        'pbilling': function () {
            return {
                'viewName': 'qryBillKind',
                'isH5': 'true',
                'filter': 'kind=3'
            }
        },
        //项目名称
        'project': function () {
            return {
                'viewName': 'qryproject',
                'isH5': 'true',
                'filter': 'closed=0',
                'likeValue': ''
            }
        },
        //货品
        'goods': function () {
            return {
                'viewName': 'qrygoods',
                'filter': '(closed=0 and Kind<8 and Kind <> 5) and (name like \'%%\' or code like \'%%\')',
                'isH5': 'true',
                'likeValue': ''
            }
        }
    }
    //结算单位
    this.getCtraderCompData = {
        'sbilling': function (likeValue) {
            likeValue = likeValue || ''
            return {
                'viewName': 'qryTrader',
                'filter': '(IsClient=1 and Closed=0 and TraderID>0  and IsCashTrader<>1) or (acctrader=1 and Closed=0 and TraderID>0  and IsCashTrader<>1)',
                'isH5': 'true',
                'likeValue': likeValue
            }
        },
        'pbilling': function (likeValue) {
            likeValue = likeValue || ''
            return {
                'viewName': 'qryTrader',
                'filter': '(IsVendor=1 and Closed=0 and TraderID>0  and IsCashTrader<>1) or (acctrader=1 and Closed=0 and TraderID>0  and IsCashTrader<>1)',
                'isH5': 'true',
                'likeValue': likeValue
            }
        },
    },
    //结算单位搜索
    this.searchCtraderCompData = {
        'sbilling': function (keyword, modeid) {
            modeid = modeid || '';
            //结算单位筛选条件
            var dataJson = {
                'viewName': 'qryTrader',
                'filter': "((IsClient=1 and Closed=0 and TraderID>0  and IsCashTrader<>1) or (acctrader=1 and Closed=0 and TraderID>0  and IsCashTrader<>1))  and (name like '%" + keyword + "%' or code like '%" + keyword + "%')",
                'filter_code': 'true',
                'isH5': 'true',
                'likeValue': keyword
            }
            if (modeid != '') {
                dataJson.modeid = modeid;
            }
            return dataJson;
        },
        'pbilling': function (keyword, modeid) {
            modeid = modeid || '';
            //结算单位筛选条件
            var dataJson = {
                'viewName': 'qryTrader',
                'filter': "((IsVendor=1 and Closed=0 and TraderID>0  and IsCashTrader<>1) or (acctrader=1 and Closed=0 and TraderID>0  and IsCashTrader<>1))  and (name like '%" + keyword + "%' or code like '%" + keyword + "%')",
                'filter_code': 'true',
                'isH5': 'true',
                'likeValue': keyword
            }
            if (modeid != '') {
                dataJson.modeid = modeid;
            }
            return dataJson;
        }
    }
    /**
     * [getBaseOptionHtml 基础optionHTML模版]
     * @param  {[json]} json [json数据]
     * @return {[html]}      [HTML模版]
     */
    this.getBaseOptionHtml = {
        //基础(部门、发票类型)
        'base': function (json) {
            return '<option data-id="' + json.id + '" data-code="' + json.code + '">' + json.name + '</option>';
        },
        //单据类型
        'billKind': function (json) {
            if (json.id == 1 || json.id == 2) {
                return '<option data-code="' + json.code + '" data-id="' + json.id + '" data-load="1">' + json.name + '</option>';
            } else {
                // return '<option data-code="' + json.code + '" data-id="' + json.id + '" data-load="1" disabled>' + json.name + '</option>';
            }
        },
        //项目
        'project': function (json) {
            return '<option data-id="' + json.projectid + '">' + json.name + '</option>';
        },
        //业务员
        'employ': function (json) {
            if(json.departmentid==$('#depName').data('id')){
                return '<option data-id="' + json.id + '" data-code="' + json.code + '" data-departmentid="' + json.departmentid + '" data-departmentname="' + json.departmentname + '" selected>' + json.name + '</option>';
            }else{
                return '<option data-id="' + json.id + '" data-code="' + json.code + '" data-departmentid="' + json.departmentid + '" data-departmentname="' + json.departmentname + '">' + json.name + '</option>';
            }
        },
        //结算方式
        'CtraderType': function (json) {
            return '<option data-id="' + json.id + '" data-code="' + json.code + '" data-accountid="' + json.accountid + '" data-accountname="' + json.accountname + '" data-accountshopid="'+json.accountshopid+'">' + json.name + '</option>';
        },

    }
    /**
     * [getTaxrate 根据不同的开单类型获取税率]
     */
    this.getTaxrate = {
        //销售开单
        // @param  {[int]}  notetype [发票类型id]
        'sbilling': function (notetype) {
            if (notetype == 1) {
                //收据
                return 0;
            }
        },
        //采购开单
        // @param  {[int]}  notetype [发票类型id]
        'pbilling': function (notetype) {
            if (notetype == 1 || notetype == 2) {
                //收据or普通发票
                return 0;
            }
        }
    },
    //初始化商品数据模版
    this.goodsData = {
        _data: {},
        set: function (key, val) {
            this._data[key] = val;
        },
        //初始化_data
        init: function () {
            this.set('is__detail__modify', 1);
            this.set('itemno', -1);
            this.set('storeid', "");
            this.set('storecode', null);
            this.set('storename', null);
            this.set('storeshopid', "");
            this.set('goodsid', "");
            this.set('goodscode', "");
            this.set('goodsname', "");
            this.set('specs', "");
            this.set('goodskind', 0);
            this.set('costtype', 0);
            this.set('gcmid', 0);
            this.set('isbatch', 0);
            this.set('brandid', "");
            this.set('brandname', "");
            this.set('shortname', "");
            this.set('barcode', null);
            this.set('barcodeid', "");
            this.set('minpurchaseqty', "");
            this.set('storelist', "");
            this.set('goodstaxrate', null);
            this.set('guserdef1', "");
            this.set('guserdef2', "");
            this.set('guserdef3', "");
            this.set('guserdef4', "");
            this.set('guserdef5', "");
            this.set('guserdef6', "");
            this.set('guserdef7', "");
            this.set('guserdef8', "");
            this.set('guserdef9', "");
            this.set('guserdef10', "");
            this.set('unitid', "");
            this.set('unitname', "");
            this.set('unitrate', 0);
            this.set('unitrate1', 0);
            this.set('unitrate2', 0);
            this.set('unitrate3', 0);
            this.set('unitname1', "");
            this.set('unitname2', "");
            this.set('unitname3', "");
            this.set('baseunitname', "");
            this.set('bunitrate', 1);
            this.set('erate', 1);
            this.set('unitextname', "");
            this.set('quantity', 0);
            this.set('extqty', 0);
            this.set('unitquantity', 0);
            this.set('unitqty1', 0);
            this.set('unitqty2', 0);
            this.set('unitqty3', 0);
            this.set('price', 0);
            this.set('lcprice', 0);
            this.set('aprice', 0);
            this.set('disc', 100);
            this.set('discamt', 0);
            this.set('unitprice', 0);
            this.set('lcunitprice', 0);
            this.set('taxrate', 0);
            this.set('lctaxprice', 0);
            this.set('taxamt', 0);
            this.set('lctaxamt', 0);
            this.set('goodsamt', 0);
            this.set('lcgoodsamt', 0);
            this.set('amount', 0);
            this.set('lcamount', 0);
            this.set('islargess', 0);
            this.set('refercount', 0);
            this.set('referbilltype', null);
            this.set('referbillid', "");
            this.set('referbillcode', null);
            this.set('referbillitemno', null);
            this.set('referqty', 0);
            this.set('referextqty', 0);
            this.set('sumquantity', null);
            this.set('breferid', "");
            this.set('batchcode', null);
            this.set('productdate', null);
            this.set('validdate', 0);
            this.set('remark', null);
            this.set('userdef1', null);
            this.set('userdef2', null);
            this.set('userdef3', null);
            this.set('userdef4', null);
            this.set('userdef5', null);
            this.set('userdef6', null);
            this.set('userdef7', null);
            this.set('userdef8', null);
            this.set('userdef9', null);
            this.set('userdef10', null);
            this.set('userdef11', null);
            this.set('userdef12', null);
            this.set('userdef13', null);
            this.set('userdef14', null);
            this.set('userdef15', null);
            this.set('iscometrader', null);
            this.set('ioqty', 0);
            this.set('validdates', '0');
            this.set('origprice', 0);
            this.set('origtaxprice', 0);
            this.set('taxprice', 0);

            return this._data;
        },
        //获取某个键值
        get: function (key) {
            return this._data[key];
        },
        getFieldValue: function (key, value) {
            if (this.get(key) == '' || this.get(key) == null || this.get(key) == undefined)
                return value;
            else
                return this._data[key];
        },
        //获取_data
        getData: function () {
            return this._data;
        },
        //将_data清空
        clear: function () {
            this._data = {}
        }
    }
}
Enhance_index.prototype = {
    init: (function () {
        $('body').removeClass('uhide');
        if (!localStorage.getItem('sdIP')) {
            layer.closeAll();
            closeToLogin('您没有登陆或长时间没使用,请重新登陆!');
            return false;
        }
    })(),

    useMask: function () {
        $('.focusShade').width($(window).width()).height($(window).height());
        $('.module-input-t1 input').focus(function () {
            $('.focusShade').removeClass('uhide');
            $('body').addClass('forbid-scroll');
        });
        $('.module-input-t1 input').blur(function () {
            $('.focusShade').addClass('uhide');
            $('body').removeClass('forbid-scroll');
        })
    },
    checkType: function (type) {
        var typeArr = ['sorder', 'porder', 'pbilling', 'sbilling'];
        if (typeArr.indexOf(type) == -1) {
            type = '';
        }
        return type;
    },
    accAdd: function(arg1,arg2){   
        var r1,r2,m;   
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}   
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}   
        m=Math.pow(10,Math.max(r1,r2))   
        return (arg1*m+arg2*m)/m   
    }, 
    subtr: function(arg1,arg2){  
        var r1,r2,m,n;  
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}  
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}  
        m=Math.pow(10,Math.max(r1,r2));  
        n=(r1>=r2)?r1:r2;  
        return ((arg1*m-arg2*m)/m).toFixed(n);  
    },
    /**
     * [change_amount 价格改变颜色修改事件]
     * @param  {[type]} amountObj [价格标签对象]
     * @param  {[type]} amount [价格]
     * @return {[type]}        [description]
     */
    change_amount: function (amountObj, amount) {
        if (amount < 0) {
            amountObj.parent().removeClass('tx-bla');
            amountObj.parent().addClass('tx-red');
        } else {
            amountObj.parent().addClass('tx-bla');
            amountObj.parent().removeClass('tx-red');
        }
    },
    /**
     * [setLocalStorage 设置本地存储]
     * @param {[string]} name  [键名]
     * @param {[string]} value [值]
     */
    setLocalStorage: function (name, value) {
        if (this.isJson(value)) {
            value = JSON.stringify(value);
        }
        window.localStorage.setItem(name, value);
    },
    /**
     * [getLocalStorage 获取本地存储]
     * @param {[string]} name  [键名]
     * @return {[string]}      [本地存储数据]
     */
    getLocalStorage: function (name) {
        var ls = window.localStorage.getItem(name);
        //判断是否存在
        if (!ls) {
            ls = '';
        }
        return ls;
    },
    setSessionStorage: function (name, value) {
        if (this.isJson(value)) {
            value = JSON.stringify(value);
        }
        sessionStorage.setItem(name, value);
    },
    extendSessionStorage: function (name, json) {
        if (sessionStorage.getItem(name)) {
            sessionStorage.setItem(name, JSON.stringify($.extend(JSON.parse(sessionStorage.getItem('session_filterJson')), json)));
        }
    },
    /**
     * [readPattern 详情编辑模式]
     */
    readPattern: function () {
        $('input[type="text"]').attr('readonly', 'true');
        $('select').attr('disabled', 'true');
        $('.item-tilte').removeClass('tx-bla');
        $('.item-tilte').addClass('tx-gray');
        $('select').parent().parent().parent().removeClass('bg-f8-active');
        $('select').prev('input').attr('disabled', 'true');
        $('select').parent().after('<div class="ub ub-f1" style="position: absolute;width: 100%;height: 100%;left: 0;"></div>');
        $('input').parent().parent().parent().removeClass('bg-f8-active');
        $('#chooseGoodsBtn').removeClass('bg-f8-active');
    },
    /**
     * [onInputText text输入框可用]
     * @param  {[type]} inputObj [输入框对象]
     */
    onInputText:function(inputObj){
        inputObj.removeAttr('readonly');
        inputObj.parent().parent().parent().attr('tapmode', 'bg-f8-active');
        inputObj.parent().prev('.item-tilte').css('color', '#333!important');
    },
    /**
     * [offDatePicker 屏蔽日期选择器]
     * @param  {[type]} picker [日期选择器对象]
     */
    offDatePicker: function (picker) {
        picker.after('<div class="ub ub-f1" style="position: absolute;width: 100%;height: 100%;left: 0;"></div>');
        picker.parent().parent().parent().removeClass('bg-f8-active');
    },

    onMobiscroll:function(selObj){
        selObj.parent().prev().addClass('tx-bla');
        selObj.parent().prev().removeClass('tx-gray');
        selObj.parent().prev().parent().parent().addClass('bg-f8-active');
        selObj.addClass('hide');
        selObj.removeAttr('disabled');
        selObj.prev('input').removeAttr('disabled');
        selObj.prev('input').removeClass('tx-gray');
        selObj.parent().next().remove();
    },
    offMobiscroll:function(selObj){
        selObj.parent().prev().removeClass('tx-bla');
        selObj.parent().prev().addClass('tx-gray');
        selObj.parent().prev().parent().parent().removeClass('bg-f8-active');
        selObj.addClass('hide');
        selObj.attr('disabled', 'true');
        selObj.prev('input').attr('disabled', 'true');
        selObj.prev('input').addClass('tx-gray');
        selObj.parent().after('<div class="ub ub-f1 sel-dis" style="position: absolute;width: 100%;height: 100%;left: 0;"></div>');
    },
    /**
     * [offSelecter 设置下拉框不可选]
     * @param  {[object]} selObj [下拉框对象]
     */
    offSelecter: function (selObj) {
        selObj.attr('disabled', 'true');
        selObj.parent().prev().removeClass('tx-bla');
        selObj.parent().prev().addClass('tx-gray');
        selObj.parent().prev().parent().parent().removeClass('bg-f8-active');
        selObj.addClass('hide');
        selObj.prev('input').attr('disabled', 'true');
    },
    /**
     * [onSelecter 设置下拉框可选]
       * @param  {[object]} selObj [下拉框对象]
     */
    onSelecter: function (selObj) {
        selObj.removeAttr('disabled');
        selObj.parent().prev().addClass('tx-bla');
        selObj.parent().prev().removeClass('tx-gray');
        selObj.parent().prev().parent().parent().addClass('bg-f8-active');
        selObj.removeClass('hide');
        selObj.prev('input').removeAttr('disabled');
    },
    /**
     * [offSelectPageBtn 设置跳转选择列表按钮不可用]
       * @param  {[object]} btnObj [按钮对象]
     */
    offSelectPageBtn: function (btnObj) {
        btnObj.data('on', '0');
        btnObj.removeClass('bg-f8-active');
        btnObj.children().children('.item-tilte').removeClass('tx-bla');
        btnObj.find('input').addClass('tx-gray');
        btnObj.children().children('.item-tilte').addClass('tx-gray');
    },
    /**
     * [onSelectPageBtn 设置跳转选择列表按钮可用]
     * @param  {[object]} btnObj [按钮对象]
     */
    onSelectPageBtn: function (btnObj) {
        btnObj.data('on', '1');
        btnObj.addClass('bg-f8-active');
        btnObj.children().children('.item-tilte').addClass('tx-bla');
        btnObj.find('input').removeClass('tx-gray');
        btnObj.children().children('.item-tilte').removeClass('tx-gray');

    },
    /**
     * [onSelectPageBtn 设置checkbox按钮可用]
     * @param  {[object]} CheckboxObj [checkbox对象]
     */
    onCheckboxBtn: function (CheckboxObj) {
        CheckboxObj.removeAttr('disabled');
        CheckboxObj.parent().parent().prev().removeClass('tx-gray');
        CheckboxObj.parent().parent().prev().addClass('tx-bla');
    },
    /**
     * [onSelectPageBtn 设置checkbox按钮不可用]
     * @param  {[object]} CheckboxObj [checkbox对象]
     */
    offCheckboxBtn: function (CheckboxObj) {
        CheckboxObj.attr('disabled', 'true');
        CheckboxObj.parent().parent().prev().addClass('tx-gray');
        CheckboxObj.parent().parent().prev().removeClass('tx-bla');

    },
    /**
     * [getSelectedAttr 获取下拉框被选中的属性]
       * @param  {[object]} selObj [下拉框对象]
     * @return {[string]}        [下拉框被选中的option的属性名称]
     */
    getSelectedAttr: function (selObj, attrName) {
        // return selObj.children('option:checked').attr(attrName);
        return selObj.find("option").not(function () { return !this.selected }).attr(attrName);
    },
    /**
     * [setSelectedText 获取下拉框被选中的text]
       * @param  {[object]} selObj [下拉框对象]
     * @return {[string]}        [下拉框被选中的option的text]
     */
    getSelectedText: function (selObj) {
        return selObj.find("option").not(function () { return !this.selected }).val();
        // return selObj.children('option:checked').val();
    },
    /**
     * [getNewDay 在日期加上指定天数]
     * @param  {[type]} dateTemp [日期]
     * @param  {[type]} days     [天数]
     * @return {[type]}          [description]
     */
    getNewDay: function(dateTemp, days) {
        var nDate = new Date(dateTemp);
        var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
        var rDate = new Date(millSeconds); 
        var year = rDate.getFullYear();  
        var month = rDate.getMonth() + 1;
        if (month < 10) month = "0" + month;  
        var date = rDate.getDate();  
        if (date < 10) date = "0" + date;  
        return (year + "-" + month + "-" + date);  
    },
    /**
     * [isJson 判断是否为JSON格式]
     * @param  {[var]}  obj [变量]
     * @return {boolean}     [是否为JSON格式]
     */
    isJson: function (obj) {
        var bool = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        return bool;
    },
    isEmptyJson: function (obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    },
    /**
     * [layerMsg 弹窗提示]
     * @param  {[string]} content [提示信息]
     */
    layerMsg: function (content) {
        layer.open({
            content: content,
            className: 'layerMobile',
            time: 2
        });
    },
    /**
    * [layerJumpLogin 弹窗提示并跳转到登录页]
    * @param  {[string]} content [提示信息]
    */
    layerJumpLogin: function (content) {
        layer.open({
            content: content,
            className: 'layerMobile',
            time: 2,
            end: function () {
                setTimeout(function () {
                    window.location.href = '../login/en_login.html';
                }, 3000);
            }
        });
    },
    /**
     * [getOneParam 根据URL获取传递的参数]
     * @param  {[string]} href 	[地址]
     * @return   {[json]}	param [传递的键和值]	
     */
    getOneParam: function (href) {
        var len = href.length;//获取url的长度
        var offset = href.indexOf("?");//设置参数字符串开始的位置
        var newsidinfo = href.substr(offset + 1, len)//取出参数字符串 这里会获得类似“id=1”这样的字符串
        var paramArray = newsidinfo.split("=");//对获得的参数字符串按照“=”进行分割
        //得到参数值
        var name = paramArray[0];
        var value = paramArray[1];
        return param = {
            'name': name,
            'value': value
        }
    },
    //静态页面传值，Url传值解析
    getPageParams: function (key) {
        var keyList = [];
        var valueList = [];
        var hrefStr = decodeURIComponent(window.location.href);
        var strArray = hrefStr.split("?");
        var paramStr = strArray[1];
        if (paramStr != null && paramStr != "") {
            var paramArray = paramStr.split("&");
            for (var i = 0; i < paramArray.length; i++) {
                var param = paramArray[i];
                valueList.push(param.substr(param.indexOf("=") + 1));
                keyList.push(param.substr(0, param.indexOf("=")));
            }
            for (var j = 0; j < keyList.length; j++) {
                if (key == keyList[j]) {
                    return valueList[j];
                }
            }
        }
    },
    /**
     * [DataCommand 数据请求]
     * @param {[string]}	url		[请求地址]
     * @param {[string]}	type 	[请求类型]
     * @param {[json]}	data 	[请求参数]
     */
    DataCommand: function (url, type, data) {
        return {
            url: url,		//请求地址
            type: type,		//请求类型
            data: data || {},		//请求参数
            initData: $.extend({}, data || ''),
            pageSize: 5,	//显示数量
            start: 0,	//开始序号
            pageNum: 0,	//页码
            nowPageNum: 1,	//当前页码
            beginDate: '',	//开始日期
            endDate: '',	//结束日期
            filterItems: {},	//筛选参数
            /**
             * [init 初始化参数]
             * @return {json} dataJson [请求参数]
             */
            init: function (retCallback, errCallback) {
                showLoading();
                var dataJson = {
                    'type': this.type,
                    'url': this.url,
                    'dataType': 'json',
                    'data': this.data || {}
                }
                // console.log(JSON.stringify(dataJson));
                Get_ajax(dataJson, retCallback, errCallback);
            },
            /**
             * [setData 设置参数]
             * @param {[json]} data [json参数]
             */
            setData: function (data) {
                this.data = $.extend({}, this.initData);
                this.nowPageNum = 1;
                this.data.pageSize = this.pageSize;
                this.data.start = this.start = 0;
                // this.data = $.extend({}, data || '');
            },
            /**
             * [setPageSize 设置显示列表元素数量]
             * @param {[int]}	pageSize [数量]
             */
            setPageSize: function (pageSize) {
                this.data.pageSize = this.pageSize = pageSize;
            },
            /**
             * [setPageNum 设置页码]
             * @param {[int]}	pageNum 	[页码]
             */
            setPageNum: function (pageNum) {
                this.data.start = this.start;
                this.pageNum = pageNum;
            },
            /**
             * [addNowPageNum 设置当前页码+1]
             */
            addNowPageNum: function () {
                this.nowPageNum += 1;
            },
            /**
             * [getPageNum 获取页码]
             * @return {int} [页码]
             */
            getPageNum: function () {
                return this.pageNum;
            },
            /**
             * [setStart 设置列表元素开始序号]
             * @param {[int]}	start 	[开始序号]
             */
            setStart: function (start) {
                this.start = start;
            },
            /**
             * [refreshPage 刷新]
             * @param {[function]} 	retCallback 	[请求成功函数]
             * @param {[function]} 	errCallback 	[请求错误函数]
             */
            refreshPage: function (retCallback, errCallback) {
                // this.data = $.extend({}, this.initData);
                this.nowPageNum = 1;
                this.data.pageSize = this.pageSize;
                this.data.start = this.start = 0;
                this.init(retCallback, errCallback);
            },
            /**
             * [nextPage 下一页]
             * @param {[function]} 	retCallback 	[请求成功函数]
             * @param {[function]} 	errCallback 	[请求错误函数]
             */
            nextPage: function (retCallback, errCallback) {
                if (this.nowPageNum < this.pageNum) {
                    this.init(retCallback, errCallback);
                } else {
                    layer.open({
                        content: '已加载全部',
                        className: 'layerMobile',
                        time: 2
                    });
                }
            },
            /**
             * [setNextData 设置下一页]
             */
            setNextData: function () {
                if (this.pageNum > 0) {
                    this.start = this.start + this.pageSize;
                    this.data.start = this.start;
                    this.data.pageSize = this.pageSize;
                }
            },
            /**
             * [searchData 搜索]
             * @param {[string]} 		text 			[搜索内容]
             * @param {[function]} 	retCallback 	[请求成功函数]
             * @param {[function]} 	errCallback 	[请求错误函数]
             */
            sendSearch: function (text, retCallback, errCallback) {
                this.data.start = this.start = 0;
                this.nowPageNum = 1;
                this.filterItems['filterisOR'] = 'true';
                this.filterItems['filterItems[0].value'] = text;
                this.filterItems['filterItems[1].value'] = text;
                this.filterItems['filterItems[2].value'] = text;
                this.filterItems['filterItems[3].value'] = text;
                this.filterItems['filterItems[4].value'] = text;
                this.filterItems['filterItems[5].value'] = text;
                this.filterItems['filterItems[6].value'] = text;
                $.extend(this.data, this.filterItems);
                this.init(retCallback, errCallback);
            },
            /**
             * [initSearchData 初始化搜索参数]
             */
            initSearchData: function (filterItem) {
                this.filterItems = {
                    'iMoneyHeadType': '0',
                    "filterItems[0].fieldType": 'ft_ListStr',
                    "filterItems[0].id": '432',
                    "filterItems[0].index": 'CG0001',
                    "filterItems[0].name": '业务员',
                    "filterItems[0].operatertitle": '包含',
                    "filterItems[1].fieldType": 'ft_Str',
                    "filterItems[1].id": '460',
                    "filterItems[1].index": '',
                    "filterItems[1].name": '单据编号',
                    "filterItems[1].operatertitle": '包含',
                    "filterItems[2].fieldType": 'ft_ListStr',
                    "filterItems[2].id": '471',
                    "filterItems[2].index": '1',
                    "filterItems[2].name": '分支机构',
                    "filterItems[2].operatertitle": '包含',
                    "filterItems[3].fieldType": 'ft_ListStr',
                    "filterItems[3].id": '476',
                    "filterItems[3].index": 'null',
                    "filterItems[3].name": '',
                    "filterItems[3].operatertitle": '包含',
                    "filterItems[4].fieldType": 'ft_ListStr',
                    "filterItems[4].operatertitle": '包含',
                    "filterItems[5].fieldType": 'ft_ListStr',
                    "filterItems[5].id": '474',
                    "filterItems[5].index": '1',
                    "filterItems[5].name": '制单人',
                    "filterItems[5].operatertitle": '包含',
                    "filterItems[6].fieldType": 'ft_ListStr',
                    "filterItems[6].id": '475',
                    "filterItems[6].index": '1',
                    "filterItems[6].name": '审核人',
                    "filterItems[6].operatertitle": '包含'
                }
                $.extend(this.filterItems, filterItem);
            },
            /**
             * [initSearchBaseData 初始化搜索基础资料模块]
             * @param  {[json]} baseFilterItem [搜索参数]
             */
            sendSearchBaseData: function (baseFilterItem, retCallback, errCallback) {
                this.data.start = this.start = 0;
                this.nowPageNum = 1;
                this.data = $.extend({}, baseFilterItem);
                this.init(retCallback, errCallback);
            },
            /**
             * [setFiterItem 设置筛选参数]
             * @param {[Json]} filterItem [筛选参数]
             */
            setFiterItem: function (filterItem) {
                $.extend(this.filterItems, filterItem);
            },
            /**
             * [filterData 过滤请求]
             * @param  {[json]} dataJson    [过滤参数]
             * @param  {[function]} retCallback [请求成功回调]
             * @param  {[function]} errCallback [请求失败回调]
             */
            filterData: function (dataJson, retCallback, errCallback) {
                //清空历史筛选条件
                this.filterItems = $.extend({}, this.initData);
                var itemIndex = -1;//条件序号

                //币种
                if (dataJson.moneyId != '') {
                    itemIndex += 1;
                    var moneyItem = {
                        'filterItems[0].fieldType': 'ft_Str',
                        'filterItems[0].id': '217',
                        'filterItems[0].index': dataJson.moneyId,
                        'filterItems[0].name': '币种名称',
                        'filterItems[0].operatertitle': '等于',
                        'filterItems[0].value': dataJson.moneyName
                    }
                    var moneyItem = {};
                    moneyItem['filterItems[' + itemIndex + '].fieldType'] = 'ft_Str';
                    moneyItem['filterItems[' + itemIndex + '].id'] = '217';
                    moneyItem['filterItems[' + itemIndex + '].index'] = dataJson.moneyId;//币种id
                    moneyItem['filterItems[' + itemIndex + '].name'] = '币种名称';
                    moneyItem['filterItems[' + itemIndex + '].operatertitle'] = '等于';
                    moneyItem['filterItems[' + itemIndex + '].value'] = dataJson.moneyName;//币种名称
                    $.extend(this.filterItems, moneyItem);
                    this.filterItems['filterisOR'] = 'false';
                }

                //供应商/客户
                if (dataJson.traderId != '') {
                    itemIndex += 1;
                    var traderItem = {};
                    traderItem['filterItems[' + itemIndex + '].fieldType'] = 'ft_ListStr';
                    traderItem['filterItems[' + itemIndex + '].id'] = dataJson.filterTraderId;
                    traderItem['filterItems[' + itemIndex + '].index'] = dataJson.traderId;//供应商id/客户id
                    traderItem['filterItems[' + itemIndex + '].name'] = dataJson.filterTraderName;
                    traderItem['filterItems[' + itemIndex + '].operatertitle'] = '等于';
                    traderItem['filterItems[' + itemIndex + '].value'] = dataJson.traderName;//供应商名称/客户名称
                    $.extend(this.filterItems, traderItem);
                    this.filterItems['filterisOR'] = 'false';
                }
                //货品
                if (dataJson.goodsCode != '') {
                    itemIndex += 1;
                    var goodsItem = {};
                    goodsItem['filterItems[' + itemIndex + '].fieldType'] = 'ft_ListStr';
                    goodsItem['filterItems[' + itemIndex + '].id'] = '8';
                    goodsItem['filterItems[' + itemIndex + '].index'] = dataJson.goodsCode;
                    goodsItem['filterItems[' + itemIndex + '].name'] = '货品名称';
                    goodsItem['filterItems[' + itemIndex + '].operatertitle'] = '等于';
                    goodsItem['filterItems[' + itemIndex + '].value'] = dataJson.goodsName;
                    $.extend(this.filterItems, goodsItem);
                    this.filterItems['filterisOR'] = 'false';
                }

                //初始化数据
                this.data = $.extend({}, this.initData);
                this.data.start = this.start = 0;
                this.nowPageNum = 1;
                this.data.beginDate = dataJson.beginDate;//开始时间
                this.data.endDate = dataJson.endDate;//结束时间
                $.extend(this.data, this.filterItems);
                this.init(retCallback, errCallback);
            }
        }
    },
    /**
     * [judgCompForBase 判断权限设置参数(供应商/客户/结算单位)]
     * @param  {[type]} filterJson [请求参数]
     * @return {[type]}            [请求参数]
     */
    judgCompForBase: function(filterJson){
        var shopid = localStorage.getItem('shopID');
        var shopAccount = localStorage.getItem('shopAccount');
        var opid = localStorage.getItem('opID');
        var shopTrader = localStorage.getItem('shopTrader');
        // alert(typeof(shopid) + ' ' + typeof(shopAccount) + ' ' + typeof(opid) + ' ' + typeof(shopTrader));
        // alert(shopid + ' ' + shopAccount + ' ' + opid + ' ' + shopTrader);
        // alert(shopid!='0');
        // alert(shopTrader=='0');
        // alert(shopid!='0' && shopTrader=='0');
        // alert(shopid=='0');
        // alert(shopAccount=='1');
        // alert(opid!='0');
        // alert(shopid=='0' && shopAccount=='1'&& opid!='0');
        if((shopid=='0' && shopAccount=='1'&& opid!='0') || (shopid!='0' && shopTrader=='0')){
            filterJson.filter = '(' + filterJson.filter +') and shopid='+shopid;
        }
        // alert(filterJson.filter);
        return filterJson;
    },
    /**
     * [HtmlCommand HTML设置]
     * @param {[string]} html [HTML模板]
     */
    HtmlCommand: function (html) {
        return {
            htmls: '',
            set: function (json) {
                this.htmls += html(json);
            },
            /**
             * [appendIn 追加元素]
             * @param  {[obj]} obj [需要添加的父节点对象]
             */
            appendIn: function (obj) {
                obj.append(this.htmls);
                this.htmls = '';
                hideProgress();
            },
            /**
             * [clearConFrom 清空节点]
             * @param  {[obj]} obj [需要清空的父节点对象]
             */
            clearConFrom: function (obj) {
                obj.children().remove();
            },
            /**
             * [setNoDataImg 设置缺省图]
             * @param {[obj]} obj [设置缺省图的父节点对象]
             */
            setNoDataImg: function (obj) {
                obj.html('<div class="none-icon"><img src="../../images/none.png"><div class="tx-gray">暂无数据</div></div>');
                hideProgress();
            }
        }
    },
    /**
     * [countPageNum 获取页码]
     * @param {[int]} 	count 		[元素总数]
     * @param {[int]}	pageSize	[显示数量]
     * @return  {int} 	pageNum 	[页码]
     */
    countPageNum: function (count, pageSize) {
        var pageNum = Math.floor(count / pageSize);
        if (count % pageSize > 0) {
            pageNum += 1;
        }
        return pageNum;
    },
    /**
     * [setDetailFromTaxrate 根据税率变动单据明细的函数]
     * @param {[type]} goodObj [货品所在标签对象]
     * @param {[type]} taxrate [税率]
     */
    setDetailFromTaxrate: function (goodObj, taxrate) {
        var goodsData = JSON.parse(goodObj.attr('data-json'));
        goodsData['taxrate'] = taxrate;
        // console.log('taxrate:'+taxrate);
        var origprice = goodsData['origprice'];//获取原始价格
        var unitquantity = goodsData['unitquantity'];//获取业务数量(在页面显示的数量)
        var unitprice = goodsData['unitprice'];//获取业务单价(要显示的单价)
        var disc = goodsData['disc'];//获取折扣
        //计算原始含税单价
        var origtaxprice = origprice * (1 + taxrate / 100);
        goodsData['origtaxprice'] = origtaxprice;
        var taxprice = origtaxprice;//计算含税单价
        goodsData['taxprice'] = taxprice;
        var lctaxprice = taxprice;
        goodsData['lctaxprice'] = lctaxprice;
        var amount = taxprice * unitquantity;//计算总额(需要显示)
        goodsData['amount'] = amount.toFixed(2);
        var taxamt = unitquantity * (taxprice - unitprice);//计算税额(需要显示)
        goodsData['taxamt'] = taxamt;
        var goodsamt = amount - taxamt;//计算货品价格 不含税的
        goodsData['goodsamt'] = goodsamt;
        var discamt = origtaxprice * (1 - disc / 100) * unitquantity;//计算折扣
        goodsData['discamt'] = discamt;
        var lcgoodsamt = goodsamt;//lc开头的都是不需要显示的
        goodsData['lcgoodsamt'] = lcgoodsamt;
        var lctaxamt = taxamt;
        goodsData['lctaxamt'] = lctaxamt;
        var lcamount = goodsamt + taxamt;
        goodsData['lcamount'] = lcamount;

        goodObj.attr('data-json', JSON.stringify(goodsData));
        goodObj.find('.goodsTaxrate').text(taxrate);//税率
        goodObj.find('.goodsTaxprece').text(amount.toFixed(2));//售价
        return amount;
    },
    /**
     * [setText 设置标签元素的text]
     * @param {[object]} dom [dom对象]
     * @param {[string]}	text  [内容]
     */
    setText: function (dom, text) {
        if (dom) {
            if (typeof (text) != 'null') {
                dom.text(text);
            }
        }
    },
    /**
     * [setValue 设置表单元素的value]
     * @param {[object]} dom [dom对象]
     * @param {[string]}	value  [内容]
     */
    setValue: function (dom, value) {
        if (dom) {
            if (typeof (value) != 'null' && value != 'null') {
                dom.val(value);
            }
        }
    },
    /**
     * [initMobiscroll 初始化下拉选择]
     */
    initMobiscroll: function () {
        $('select').mobiscroll().select({
            theme: 'mobiscroll',
            lang: 'zh',
            display: 'bottom',
            mode: 'selectBasic'
        });
    },
    change_select: function (selObj) {
        selObj.prev('input').val(selObj.val());
        var selectId = selObj.find("option").not(function () { return !this.selected }).data('id');
        selObj.prev('input').data('id', selectId);
        selObj.data('id', selectId);
    },
    /**
     * [setValue 设置mobiscroll的value]
     * @param {[object]} obj [jquery对象]
     * @param {[string]}    value  [内容]
     */
    setMobiscrollId: function (obj, attrValue) {
        if (obj) {
            if (typeof (attrValue) != 'null' && attrValue != 'null') {
                obj.data('id', attrValue);
                obj.attr('real-id', attrValue);
                console.log('real-id：' + obj.attr('real-id'));
            }
        }
    },
    /**
     * [setValue 设置mobiscroll的value]
     * @param {[object]} obj [jquery对象]
     * @param {[string]}	value  [内容]
     */
    setMobiscrollValue: function (obj, value) {
        if (obj) {
            if (typeof (value) != 'null' && value != 'null') {
                obj.attr('value', value);
                obj.mobiscroll().select({
                    theme: 'mobiscroll',
                    lang: 'zh',
                    display: 'bottom',
                    mode: 'selectBasic'
                });
                obj.prev('input').val(value);
                obj.prev('input').attr('value', value);
                obj.attr('real-value', value);
            }
        }
    },
    getMobiscrollValue: function (obj) {
        if (obj && obj.prev('input')) {
            return obj.prev('input').val();
        } else {
            return '';
        }
    },
    /**
     * [getBillCodeByDate 通过日期获取单号]
     * @param  {[type]} billObj  [单号输入框对象]
     * @param  {[type]} dataJson [请求数据]
     */
    getBillCodeByDate:function(billObj, dataJson){
        var billCode = '';
        var dataStr = {
            'url': 'http://' + window.localStorage.getItem('sdIP') + '/common/bill/billpublic!doGetBillCode.action',
            'method': 'post',
            'data': {
                param: JSON.stringify(dataJson)
            }
        }
        Get_ajax(dataStr, function(ret){
            if(ret.errNo){
                //提示错误信息弹窗
                // _basic.closeTologin(ret.errMsg);
            }else{
                billObj.val(ret.resultData.newCode);
            }
        }, function(ret){
            _basic.toastMsg(ret.errMsg);
        });
    },
    /**
     * [getBaseData 获取基础资料(选择框)]
     * @param  {[dom]} selObj [选择框对象]
     * @param  {[string]} base   [基础资料对象字符串]
     */
    getBaseData: function (selObj, base, htmlModeName) {
        var isLoad = selObj.data('load') || '';
        if (isLoad == '') {
            var dataJson = {
                'url': 'http://' + window.localStorage.getItem('sdIP') + '/lookupdm/lookupdata.action',
                'method': 'post',
                'data': this.baseData[base]() || ''
            }
            var htmlMode = this.getBaseOptionHtml[htmlModeName];//初始化HTML模版
            Get_ajax(dataJson, function (ret) {
                if (ret.errNo) {
                    //提示错误信息弹窗
                    closeToLogin(ret.errMsg);
                } else {
                    var optionHtml = '';
                    for (var k in ret.listData) {
                        optionHtml += htmlMode(ret.listData[k]);
                    }
                    selObj.append(optionHtml);
                    selObj.mobiscroll().select({
                        theme: 'mobiscroll',
                        lang: 'zh',
                        display: 'bottom',
                        mode: 'selectBasic'
                    });
                    // selObj.prev('input').val(selObj.attr('value'));
                    // console.log(selObj.find("option").not(function () { return !this.selected }).data('id'));
                    selObj.data('id', selObj.find("option").not(function () { return !this.selected }).data('id'));
                    var realValue = selObj.attr('real-value') || '';
                    // console.log('realValue:' + realValue);
                    if (realValue != '') {
                        selObj.prev('input').val(selObj.attr('real-value'));
                        // console.log('real_id:' + selObj.attr('real-id'));
                        selObj.data('id', selObj.attr('real-id'));
                    }
                }
            }, function (ret) {
                layerMsg(ret.errMsg);
            });
        }
    },
    /**
     * [tempSessionStorage 单据修改临时缓存]
     */
    tempSessionStorage: function () {
        if (sessionStorage.getItem('session_billDataJson')) {
            ret = JSON.parse(sessionStorage.getItem('session_billDataJson'));
            if (sessionStorage.getItem('session_temp_billDataJson')) {
                ret = JSON.parse(sessionStorage.getItem('session_temp_billDataJson'));
            }
            $('select').each(function () {
                var keyName = $(this).attr('data-kname') || '';
                var keyId = $(this).attr('data-kid') || '';
                if (keyName != '') {
                    // console.log(keyName + ':' + ret.master[keyName]);
                    ret.master[keyName] = $(this).prev('input').val();
                    // console.log(keyName + ':' + ret.master[keyName]);
                }
                if (keyId != '') {
                    // ret.master[keyId] = $(this).find("option:selected").attr('data-id');
                    ret.master[keyId] = $(this).data('id');
                    // console.log($(this).data('id') + '  dsfdsfdsfdsfs');
                }
            });
            $('input').each(function () {
                var keyName = $(this).attr('data-kname') || '';
                var keyId = $(this).attr('data-kid') || '';
                if (keyName != '') {
                    // console.log(keyName + ':' + ret.master[keyName]);
                    ret.master[keyName] = $(this).val();
                }
                if (keyId != '') {
                    // console.log(keyId + ':' + $(this).data('id'));
                    ret.master[keyId] = $(this).data('id');
                }
            });
            sessionStorage.setItem('session_wasChange', true);
            //临时缓存最新货品数据
            // $('.goodsItem').each(function(index){
            //     var goodsJson = JSON.parse($(this).attr('data-json'));
            //     ret.detail1 = $.extend([], []);
            //     ret.detail1.push(goodsJson);
            // });
            sessionStorage.setItem('session_temp_billDataJson', JSON.stringify(ret));
        }
    },
    //删除商品处理
    deleteGoods: function (id) {
        //获取单据详情页面货品列表
        var session_billDataJson = JSON.parse(sessionStorage.getItem('session_temp_billDataJson'));
        var detail = session_billDataJson.detail1;
        var length = detail.length;

        //找出index
        var index = -1;
        for (var i = 0; i < length; i++) {
            if (detail[i].log_id == id) {
                index = i;
            }
        }

        if (index == -1) {
            layerMsg('索引商品失败');
            return false;
        }
        //逻辑判断 避免对数据造成破坏
        if (detail[index].log_oldGoods == true) {
            //原有的商品 将attr设置成del,但是不会删除
            session_billDataJson.detail1[index].log_attr = 'del';
            sessionStorage.setItem('session_temp_billDataJson', JSON.stringify(session_billDataJson));
        }
        else
            //不是原有的商品 直接删除
            session_billDataJson.detail1.splice(index, 1);

        sessionStorage.setItem('session_temp_billDataJson', JSON.stringify(session_billDataJson));
        this.countAmount();
        return true;
    },

    //增加商品处理
    addGoods: function (data) {
        //获取单据详情页面货品列表
        var session_billDataJson = JSON.parse(sessionStorage.getItem('session_temp_billDataJson'));
        var detail = session_billDataJson.detail1;
        var length = detail.length;
        var maxid = 0;
        //设置一些参数
        for (var i = 0; i < length; i++) {
            if (detail[i].log_id > maxid)
                maxid = detail[i].log_id;
        }
        data.log_id = maxid + 1;
        //设置attr
        data.log_attr = 'new';
        data.log_oldGoods = false;
        //向缓存里面添加信息并且保存
        session_billDataJson.detail1.splice(0, 0, data);
        sessionStorage.setItem('session_temp_billDataJson', JSON.stringify(session_billDataJson));
        this.countAmount();
        return true;
    },

    //编辑商品处理
    /*
    id 商品标识符
    data 商品数据
    */
    editGoods: function (id, data) {
        //获取单据详情页面的货品列表
        var session_billDataJson = JSON.parse(sessionStorage.getItem('session_temp_billDataJson'));
        var detail = session_billDataJson.detail1;
        var length = session_billDataJson.detail1.length;
        var index = -1;
        for (var i = 0; i < length; i++) {
            if (detail[i].log_id == id) {
                index = i;
            }
        }
        if (index == -1) {
            layerMsg('索引商品失败');
            return false;
        }

        //设置索引
        data.log_id = id;

        //逻辑判断,避免对数据造成破坏
        //判断是否是原有的商品
        if (detail[index].log_oldGoods == true) {
            data.log_oldGoods = 'true';
            //为商品增加attr-edit的属性
            data.log_attr = 'edit';
        }
        else {
            data.log_oldGoods = false;
            //为商品增加attr-new属性
            data.log_attr = 'new';
        }

        //替换原有的数据
        session_billDataJson.detail1.splice(index, 1, data);
        //保存数据
        sessionStorage.setItem('session_temp_billDataJson', JSON.stringify(session_billDataJson));
        this.countAmount();
        return true;
    },
    //计算总价
    countAmount: function () {
        var session_billDataJson = JSON.parse(sessionStorage.getItem('session_temp_billDataJson'));
        var detail = session_billDataJson.detail1;
        var amount = 0;
        for (var i = 0; i < detail.length; i++) {
            if (detail[i].log_attr != 'del') {
                var a;
                a = parseFloat(detail[i].amount);
                amount += a;
            }
        }
        session_billDataJson.master.amount = amount;
        sessionStorage.setItem('session_temp_billDataJson', JSON.stringify(session_billDataJson));
    },
    /*
     * 获取开单类的master数据
     */
    getBilling_master: function (master, type) {
        var master_backup = {};
        master_backup['billId'] = master['billid'];
        master_backup['master.amount'] = master['amount'];
        master_backup['master.billcode'] = master['billcode'];
        master_backup['master.billdate'] = master['billdate'];
        master_backup['master.billkind'] = master['billkind'];
        master_backup['master.hadexported'] = master['hadexported'] || 0;
        master_backup['master.billstate'] = master['billstate'] || 0;
        master_backup['master.closeinvoice'] = master['closeinvoice'] || 0;//--
        master_backup['master.contactfax'] = master['contactfax'] || "";
        master_backup['master.contactphone'] = master['contactphone'] || "";
        master_backup['master.departmentid'] = master['departmentid'];
        master_backup['master.disc'] = master['disc'] || 100;
        master_backup['master.exrate'] = master['exrate'] || 1;
        master_backup['master.iscashtrader'] = master['iscashtrader'] || "";
        master_backup['master.lcamount'] = master['lcamount'];
        master_backup['master.lcpayamt'] = master['lcpayamt'];
        master_backup['master.lcreferamt'] = master['lcreferamt'] || 0;
        master_backup['master.linkman'] = master['linkman'] || "";
        master_backup['master.moneyid'] = master['moneyid'];
        master_backup['master.notetype'] = master['notetype'];
        master_backup['master.opid'] = master['opid'];
        master_backup['master.opname'] = master['opname'];
        master_backup['master.payamt'] = master['payamt'];
        master_backup['master.paydate'] = master['paydate'] || "";
        master_backup['master.referamt'] = master['referamt'] || 0;
        master_backup['master.refercount'] = master['refercount'] || 0;
        master_backup['master.scamt'] = master['scamt'] || "";
        master_backup['master.sflag'] = master['sflag'] || 0;
        master_backup['master.shopid'] = localStorage.getItem('shopID');
        master_backup['master.shopname'] = localStorage.getItem('shopName');
        master_backup['master.taxrate'] = master['taxrate'] || 0;
        master_backup['master.termdays'] = master['termdays'] || 0;
        master_backup['master.traderid'] = master['traderid'];
        master_backup['master.accountid'] = master['accountid'];
        master_backup['master.paymethodid'] = master['paymethodid'];
        master_backup['master.invoiceamt'] = master['invoiceamt'] || 0;
        master_backup['master.invoiceamt'] = master['invoiceamt'] || 0;
        master_backup['master.invoicetype'] = master['invoicetype'] || 0;
        if (type == 'sbilling') {
            //销售开单

            master_backup['master.point'] = master['point'] || 0;
            master_backup['master.ishqstore'] = master['ishqstore'] || 0;
        }
        if (master['a00oldjsonvalue']) {
            //假如单据为已有的情况，则a00oldjsonvalue要赋值
            master_backup['master.a00oldjsonvalue'] = master['a00oldjsonvalue'];
        }
        return master_backup;
    },
    /*
     *判断是否为字符串
     */
    isString: function (val) {
        if (typeof val == "string") {
            return true;
        } else {
            return false;
        }
    },
    /*
     *字符串转为数字类型
     */
    parseTonum: function (val) {
        if (this.isString(val)) {
            val = val * 1;
        }
        return val;
    },
    /*
    *判断数值是否为null,如果为null的话则返回空字符串'' 否则返回本身
    */
    checkNull: function (str) {
        if (str == null || str == 'null')
            return '';
        else
            return str;
    },
    /*
     * 获取订单类的master数据
     */
    getOrder_master: function (master, type) {
        var master_backup = {};
        master_backup['master.ackappr'] = master['ackappr'] || 0;
        master_backup['master.amount'] = master['amount'];
        master_backup['master.billcode'] = master['billcode'];
        master_backup['master.billdate'] = master['billdate'];
        master_backup['master.billkind'] = master['billkind'] || 1;
        master_backup['master.hadexported'] = master['hadexported'] || 0;
        master_backup['master.billstate'] = master['billstate'] || 0;
        master_backup['master.billstatus'] = master['billstatus'] || 0;
        master_backup['master.closed'] = master['closed'];
        master_backup['master.contactfax'] = master['contactfax'] || "";
        master_backup['master.contactphone'] = master['contactphone'] || "";
        master_backup['master.departmentid'] = master['departmentid'];
        master_backup['master.distributorid'] = master['distributorid'];
        master_backup['master.exrate'] = master['exrate'] || 1;
        master_backup['master.forwardamt'] = master['forwardamt'] || 0;
        master_backup['master.iscashtrader'] = master['iscashtrader'] || "";
        master_backup['master.lcamount'] = master['lcamount'];
        master_backup['master.lcforwardamt'] = master_backup['master.forwardamt'];
        master_backup['master.linkman'] = master['linkman'] || "";
        master_backup['master.moneyid'] = master['moneyid'];
        master_backup['master.opid'] =  master['opid'];
        master_backup['master.opname'] = master['opname'];
        master_backup['master.paymethodid'] = master['paymethodid'];
        master_backup['master.referamt'] = master['referamt'] || 0;
        master_backup['master.refercount'] = master['refercount'] || 0;
        master_backup['master.revdate'] = master['revdate'];
        master_backup['master.sflag'] = master['sflag'] || 0;
        master_backup['master.shopid'] = localStorage.getItem('shopID');
        master_backup['master.shopname'] = localStorage.getItem('shopName');
        master_backup['master.traderid'] = master['traderid'];
        master_backup['master.ctraderid'] = master['traderid'];
        master_backup['master.validdate'] = master['validdate'];
        master_backup['master.remark'] = master['remark'];
        master_backup['master.empid'] = master['empid'];
        master_backup['master.projectid'] = master['projectid'];
        if (type == 'porder') {
            //采购订单
            master_backup['master.uploaded'] = master['uploaded'];
            master_backup['master.dsorder'] = master['dsorder'];
        } else {
            //销售订单
            master_backup['master.empid'] = master['empid'];
        }
        if (master['a00oldjsonvalue']) {
            //假如单据为已有的情况，则a00oldjsonvalue要赋值
            master_backup['master.a00oldjsonvalue'] = master['a00oldjsonvalue'];
        }
        return master_backup;
    },
    /*
     * 获取开单类的detail数据
     * type=='sbilling'
     * detail_type:删除时，为"deletedetail1";编辑或新增时，为"detail1"
     * hasOld判断是否要传a00OldJsonValue字段，当新增的单据时，则无该字段
     * isAdd:判断detail是否新增
     */
    getBilling_detail: function (detail_backup, detail, index, type, detail_type, hasOld, isAdd) {
        //alert('detail:'+$api.jsonToStr(detail));
        detail_backup[detail_type + '[' + index + '].billid'] = detail['billid'] || -9999;
        detail_backup[detail_type + '[' + index + '].amount'] = detail['amount'];
        detail_backup[detail_type + '[' + index + '].aprice'] = detail['aprice'];
        detail_backup[detail_type + '[' + index + '].batchcode'] = detail['batchcode'];
        detail_backup[detail_type + '[' + index + '].breferid'] = this.checkNull(detail['breferid']);
        detail_backup[detail_type + '[' + index + '].baseunitname'] = detail['baseunitname'];
        detail_backup[detail_type + '[' + index + '].costtype'] = detail['costtype'];
        detail_backup[detail_type + '[' + index + '].disc'] = detail['disc'];
        detail_backup[detail_type + '[' + index + '].discamt'] = detail['discamt'];
        detail_backup[detail_type + '[' + index + '].erate'] = detail['erate'];
        detail_backup[detail_type + '[' + index + '].extqty'] = detail['extqty'];
        detail_backup[detail_type + '[' + index + '].goodsamt'] = detail['goodsamt'];
        detail_backup[detail_type + '[' + index + '].goodscode'] = detail['goodscode'];
        detail_backup[detail_type + '[' + index + '].goodsid'] = this.checkNull(detail['goodsid']);
        detail_backup[detail_type + '[' + index + '].goodskind'] = detail['goodskind'];
        detail_backup[detail_type + '[' + index + '].goodsname'] = detail['goodsname'];
        detail_backup[detail_type + '[' + index + '].goodstaxrate'] =this.checkNull(detail['goodstaxrate']);
        detail_backup[detail_type + '[' + index + '].ioqty'] = detail['ioqty'];
        detail_backup[detail_type + '[' + index + '].is__detail__modify'] = detail['is__detail__modify'];
        detail_backup[detail_type + '[' + index + '].isbatch'] = detail['isbatch'];
        detail_backup[detail_type + '[' + index + '].islargess'] = detail['islargess'];
        detail_backup[detail_type + '[' + index + '].itemno'] = detail['itemno'] || '';
        detail_backup[detail_type + '[' + index + '].lcamount'] = this.parseTonum(detail['amount']);
        detail_backup[detail_type + '[' + index + '].lcgoodsamt'] = this.parseTonum(detail['goodsamt']);
        detail_backup[detail_type + '[' + index + '].lcprice'] = detail['price'];
        detail_backup[detail_type + '[' + index + '].lctaxamt'] = detail['taxamt'];
        detail_backup[detail_type + '[' + index + '].lctaxprice'] = detail['taxprice'];
        detail_backup[detail_type + '[' + index + '].lcunitprice'] = this.parseTonum(detail['unitprice']);
        detail_backup[detail_type + '[' + index + '].origprice'] = detail['origprice'];
        detail_backup[detail_type + '[' + index + '].origtaxprice'] = detail['origtaxprice'];
        detail_backup[detail_type + '[' + index + '].price'] = detail['price'];
        detail_backup[detail_type + '[' + index + '].quantity'] = detail['quantity'];
        detail_backup[detail_type + '[' + index + '].refercount'] = detail['refercount'];
        detail_backup[detail_type + '[' + index + '].referextqty'] = detail['referextqty'];
        detail_backup[detail_type + '[' + index + '].referqty'] = detail['referqty'];
        detail_backup[detail_type + '[' + index + '].specs'] = detail['specs'];
        detail_backup[detail_type + '[' + index + '].storecode'] = detail['storecode'];
        detail_backup[detail_type + '[' + index + '].storeid'] = this.checkNull(detail['storeid']);
        detail_backup[detail_type + '[' + index + '].storename'] = detail['storename'];
        detail_backup[detail_type + '[' + index + '].storeshopid'] = this.checkNull(detail['storeshopid']);
        detail_backup[detail_type + '[' + index + '].sumquantity'] = detail['sumquantity'] || 0;
        detail_backup[detail_type + '[' + index + '].taxamt'] = detail['taxamt'];
        detail_backup[detail_type + '[' + index + '].taxprice'] = this.parseTonum(detail['taxprice']);
        detail_backup[detail_type + '[' + index + '].taxrate'] = detail['taxrate'] || 0;
        detail_backup[detail_type + '[' + index + '].unitid'] = this.checkNull(detail['unitid']);
        detail_backup[detail_type + '[' + index + '].unitname'] = detail['unitname'];
        detail_backup[detail_type + '[' + index + '].unitname1'] = detail['unitname1'];
        detail_backup[detail_type + '[' + index + '].unitprice'] = this.parseTonum(detail['unitprice']);
        detail_backup[detail_type + '[' + index + '].unitqty1'] = detail['unitqty1'];
        detail_backup[detail_type + '[' + index + '].unitqty2'] = detail['unitqty2'];
        detail_backup[detail_type + '[' + index + '].unitqty3'] = detail['unitqty3'];
        detail_backup[detail_type + '[' + index + '].unitquantity'] = this.parseTonum(detail['unitquantity']);
        detail_backup[detail_type + '[' + index + '].unitrate'] = detail['unitrate'];
        detail_backup[detail_type + '[' + index + '].unitrate1'] = detail['unitrate1'];
        detail_backup[detail_type + '[' + index + '].unitrate2'] = detail['unitrate2'];
        detail_backup[detail_type + '[' + index + '].unitrate3'] = detail['unitrate3'];
        detail_backup[detail_type + '[' + index + '].validdates'] = detail['validdates'];
        detail_backup[detail_type+'['+index+'].productdate']=detail['productdate'];
        detail_backup[detail_type+'['+index+'].validdate']=detail['validdate'];
        detail_backup[detail_type + '[' + index + '].barcode'] = detail['barcode'] || '';
        detail_backup[detail_type + '[' + index + '].barcodeid'] = this.checkNull(detail['barcodeid']);
        if (type == 'sbilling') {
            //销售开单
            detail_backup[detail_type + '[' + index + '].allotqty'] = detail['allotqty'];
            detail_backup[detail_type + '[' + index + '].invoiceamt'] = detail['invoiceamt'] || 0;
            detail_backup[detail_type + '[' + index + '].invoiceqty'] = detail['invoiceqty'] || 0;
            detail_backup[detail_type + '[' + index + '].isallot'] = detail['isallot'] || 0;
            detail_backup[detail_type + '[' + index + '].iscometrader'] = detail['iscometrader'];
            detail_backup[detail_type + '[' + index + '].margin'] = detail['margin'];
            detail_backup[detail_type + '[' + index + '].point'] = detail['point'] || 0;
            detail_backup[detail_type + '[' + index + '].unitname2'] = detail['unitname2'];
            detail_backup[detail_type + '[' + index + '].unitname3'] = detail['unitname3'];
            detail_backup[detail_type + '[' + index + '].iscometrader'] = detail['iscometrader'] || 0;
            detail_backup[detail_type + '[' + index + '].referbilltype'] = detail['referbilltype'] || 0;
        } else {
            //采购开单
            detail_backup[detail_type + '[' + index + '].alreadyapt'] = detail['alreadyapt'] || 0;
            if(detail['breferid']==-9999)
                detail_backup[detail_type+'['+index+'].breferid']='';
        }
        if (hasOld) {
            detail_backup[detail_type + '[' + index + '].a00oldjsonvalue'] = detail['a00oldjsonvalue'];
        } else {
            detail_backup[detail_type + '[' + index + '].a00oldjsonvalue'] = '';
        }
        if (isAdd) {
            detail_backup[detail_type + '[' + index + '].itemno'] = (index + 1) * (-1);
            detail_backup[detail_type + '[' + index + '].sumquantity'] = 0;
        }
    },
    /*
     * 获取订单类的detail数据
     * isAdd判断单据是否新增
     */
    getOrder_detail: function (detail_backup, detail, index, type, detail_type, hasOld, isAdd) {
        detail_backup[detail_type + '[' + index + '].billid'] = detail['billid'] || -9999;
        detail_backup[detail_type + '[' + index + '].amount'] = detail['amount'];
        detail_backup[detail_type + '[' + index + '].aprice'] = detail['aprice'];
        detail_backup[detail_type + '[' + index + '].baseunitname'] = detail['baseunitname'];
        detail_backup[detail_type + '[' + index + '].chargedate'] = detail['chargedate'];
        detail_backup[detail_type + '[' + index + '].closed'] = detail['closed'] || 0;
        detail_backup[detail_type + '[' + index + '].costtype'] = detail['costtype'];
        detail_backup[detail_type + '[' + index + '].disc'] = detail['disc'];
        detail_backup[detail_type + '[' + index + '].discamt'] = detail['discamt'];
        detail_backup[detail_type + '[' + index + '].erate'] = detail['erate'];
        detail_backup[detail_type + '[' + index + '].extqty'] = detail['extqty'];
        detail_backup[detail_type + '[' + index + '].gcmid'] = this.checkNull(detail['gcmid']);
        detail_backup[detail_type + '[' + index + '].goodsamt'] = detail['goodsamt'];
        detail_backup[detail_type + '[' + index + '].goodscode'] = detail['goodscode'];
        detail_backup[detail_type + '[' + index + '].goodsid'] = this.checkNull(detail['goodsid']);
        detail_backup[detail_type + '[' + index + '].goodskind'] = detail['goodskind'];
        detail_backup[detail_type + '[' + index + '].goodsname'] = detail['goodsname'];
        detail_backup[detail_type + '[' + index + '].goodstaxrate'] =this.checkNull(detail['goodstaxrate']);
        detail_backup[detail_type + '[' + index + '].ioqty'] = detail['ioqty'];
        detail_backup[detail_type + '[' + index + '].is__detail__modify'] = detail['is__detail__modify'];
        detail_backup[detail_type + '[' + index + '].isbatch'] = detail['isbatch'];
        detail_backup[detail_type + '[' + index + '].islargess'] = detail['islargess'];
        detail_backup[detail_type + '[' + index + '].itemno'] = detail['itemno'] || '';
        detail_backup[detail_type + '[' + index + '].lcamount'] = detail['amount'];
        detail_backup[detail_type + '[' + index + '].lcgoodsamt'] = detail['goodsamt'];
        detail_backup[detail_type + '[' + index + '].lcprice'] = detail['price'];
        detail_backup[detail_type + '[' + index + '].lctaxamt'] = detail['taxamt'];
        detail_backup[detail_type + '[' + index + '].lctaxprice'] = detail['taxprice'];
        detail_backup[detail_type + '[' + index + '].lcunitprice'] = detail['unitprice'];
        detail_backup[detail_type + '[' + index + '].origprice'] = detail['origprice'];
        detail_backup[detail_type + '[' + index + '].origtaxprice'] = detail['origtaxprice'];
        detail_backup[detail_type + '[' + index + '].price'] = detail['price'];
        //detail_backup[detail_type+'['+index+'].purrequestqty']=detail['purrequestqty'];
        detail_backup[detail_type + '[' + index + '].quantity'] = detail['quantity'];
        detail_backup[detail_type + '[' + index + '].refercount'] = detail['refercount'];
        detail_backup[detail_type + '[' + index + '].referextqty'] = detail['referextqty'];
        detail_backup[detail_type + '[' + index + '].referqty'] = detail['referqty'];
        detail_backup[detail_type + '[' + index + '].specs'] = detail['specs'];
        detail_backup[detail_type + '[' + index + '].sumquantity'] = detail['sumquantity'] || 0;
        detail_backup[detail_type + '[' + index + '].taxamt'] = detail['taxamt'];
        detail_backup[detail_type + '[' + index + '].taxprice'] = detail['taxprice'];
        detail_backup[detail_type + '[' + index + '].taxrate'] = detail['taxrate'];
        detail_backup[detail_type + '[' + index + '].unitid'] = this.checkNull(detail['unitid']);
        detail_backup[detail_type + '[' + index + '].unitname'] = detail['unitname'];
        detail_backup[detail_type + '[' + index + '].unitname1'] = detail['unitname1'];
        detail_backup[detail_type + '[' + index + '].unitprice'] = detail['unitprice'];
        detail_backup[detail_type + '[' + index + '].unitqty1'] = detail['unitqty1'];
        detail_backup[detail_type + '[' + index + '].unitqty2'] = detail['unitqty2'];
        detail_backup[detail_type + '[' + index + '].unitqty3'] = detail['unitqty3'];
        detail_backup[detail_type + '[' + index + '].unitquantity'] = this.parseTonum(detail['unitquantity']);
        detail_backup[detail_type + '[' + index + '].unitrate'] = detail['unitrate'];
        detail_backup[detail_type + '[' + index + '].unitrate1'] = detail['unitrate1'];
        detail_backup[detail_type + '[' + index + '].unitrate2'] = detail['unitrate2'];
        detail_backup[detail_type + '[' + index + '].unitrate3'] = detail['unitrate3'];
        detail_backup[detail_type + '[' + index + '].validdates'] = detail['validdates'];
        detail_backup[detail_type + '[' + index + '].iscometrader'] = detail['iscometrader'] || 0;
        detail_backup[detail_type + '[' + index + '].referbilltype'] = detail['referbilltype'] || 0;
        detail_backup[detail_type + '[' + index + '].barcode'] = detail['barcode'] || '';
        detail_backup[detail_type + '[' + index + '].barcodeid'] = this.checkNull(detail['barcodeid']);
        //alert('quantity:'+detail['quantity']+",unitquantity:"+detail['unitquantity']+",unitrate:"+detail['unitrate']);
        if (type == 'porder') {
            //采购订单

        } else {
            //销售订单
            detail_backup[detail_type + '[' + index + '].purrequestqty'] = detail['purrequestqty'] || 0;
        }
        if (hasOld) {
            detail_backup[detail_type + '[' + index + '].a00oldjsonvalue'] = detail['a00oldjsonvalue'];
        }
        if (isAdd) {
            detail_backup[detail_type + '[' + index + '].itemno'] = (index + 1) * (-1);
        }
    }
}
function Get_ajax(data, retCallback, errCallback) {
    $.ajax({
        type: data['type'],
        url: data['url'],
        dataType: 'json',
        data: data['data'],
        timeout: 3000,
        success: function (data, xhr) {
            retCallback(data, xhr);
        },
        error: function (xhr, type) {
            errCallback(xhr, type);
        }
    });
}
function closeToLogin(str) {
    if (str.indexOf('请重新登陆') > 0 || str.indexOf('请重新登录') > 0) {
        //清除report模块缓存
        localStorage.removeItem("href");
        localStorage.removeItem("filter");
        layer.open({
            content: str,
            className: 'layerMobile',
            time: 2,
            end: function () {
                window.location = '../login/en_login.html';
            }
        })
    } else {
        layer.open({
            content: str,
            className: 'layerMobile',
            time: 1
        })
    }
}
/*
* 弹出提示框,默认样式为layerMobile
* str:提示内容的内容
* param:一些参数,默认为空
*/
function layerMsg(str, param) {
    var p = {
        content: str,
        className: 'layerMobile',
        time: 3
    }
    if (param)
        $.extend(p, param);
    layer.open(p);
}
/*
* 加载框,默认样式为layerMobile
*/

function showLoading() {
    //清除report模块缓存
    localStorage.removeItem("href");
    localStorage.removeItem("filter");
    layer.open({
        type: 2,
        shadeClose: false
    });
}
/*
* 隐藏加载框
*/
function hideProgress() {
    layer.closeAll();
}
//enhance_index.prototype.constructor = enhance_index;
//module.exports = new enhance_index();
//})