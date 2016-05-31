define(function (require, exports, module) {
    var _Public = require('./public');
    var enhance_index = new Enhance_index();
    function save_order() {

    }
    save_order.prototype = {
        /**
		 * [setLocalStorage 设置本地存储]
		 * @param {[string]} name  [键名]
		 * @param {[string]} value [值]
		 */
        masterSave:function(master_backup,type){
            if(type=='sbilling'||type=='pbilling'){
                //开单类
                master_backup['master.amount']=$('#amount').text();
                master_backup['master.lcamount']=$('#amount').text();//lcamount和amount一样
                master_backup['master.billcode']=$('#billCode').val();
                master_backup['master.billdate']=$('#billDate').val();
                master_backup['master.moneyid']=$('#moneyName').data('id');
                if($('#payMent').val()==''){
                    master_backup['master.payamt']=0;
                    master_backup['master.lcpayamt']=0;
                }else{
                    master_backup['master.payamt']=$('#payMent').val();
                    master_backup['master.lcpayamt']=master_backup['master.payamt'];
                }
                master_backup['master.remark']=$('#remark').val() || "";
                //单据类型
                master_backup['master.billkind']=$('#billkindName').data('id');
                //供应商
               // console.log('ss:'+$('#traderName').data('id'));
                master_backup['master.iscashtrader']=$('#traderName').data('iscashtrader') || "";
                master_backup['master.traderid']=$('#traderName').data('id') || "";

                master_backup['master.shiptype']=$('#traderName').data('shiptype') || '';
                master_backup['master.contactphone']=$('#traderName').data('tel1') || "";
                master_backup['master.contactfax']=$('#traderName').data('fax') || "";
                master_backup['master.tradertaxrate']=$('#traderName').data('taxrate') || "";
                master_backup['master.billto']=$('#traderName').data('billto') || "";
                master_backup['master.scamt']=$('#traderName').data('scamt') || 0;
                master_backup['master.linkman']=$('#traderName').data('contactor') || "";
                master_backup['master.termdays']=$('#traderName').data('termdays') || 0;
                master_backup['master.chargeterm']=$('#traderName').data('termdays') || "";
                master_backup['master.paydate']=$('#traderName').data('paydate') || "";
                master_backup['master.vipid']=$('#traderName').data('vipid') || "";
                master_backup['master.lastpoint']=$('#traderName').data('lastpoint') || "";
                master_backup['master.updatetime']=_Public.getDates().sDate;
                //发票类型
                master_backup['master.notetype']=$('#notetypeName').data('id');
                //结算方式
                master_backup['master.paymethodid']=$('#ctraderType').data('id');
                //结算账户
                master_backup['master.accountid']=$('#settleAccount').data('id');
                //结算单位
                master_backup['master.ctraderid']=$('#ctraderComp').data('id');
                //项目
                master_backup['master.projectid']=$('#projectName').data('id');
                //部门
                master_backup['master.departmentid']=$('#depName').data('id');
                //业务员/员工
                master_backup['master.empid']=$('#empName').data('id') || "";
                if(master_backup['master.payamt']==0){
                    //如果本次现付/本次现收为0，paymethodid（结算方式），accountid （结算账户），不传，accountname，paymethodname传的是""。
                    delete master_backup['master.paymethodid'];
                    delete master_backup['master.accountid'];
                    master_backup['master.accountname']="";
                    master_backup['master.paymethodname']="";
                }
            }else{
                //订单类
                master_backup['master.amount'] = $('#amount').text() || 0;
                master_backup['master.lcamount'] = $('#amount').text() || 0;//lcamount和amount一样
                master_backup['master.billcode'] = $('#billCode').val();
                master_backup['master.billdate'] = $('#billDate').val();
                master_backup['master.revdate'] = $('#revDate').val();
                master_backup['master.moneyid'] = $('#moneyName').attr('data-id') || 0;
                master_backup['master.remark'] = $('#remark').val() || "";
                //部门
                master_backup['master.departmentid'] = $('#depName').data('id');
                //供应商
                master_backup['master.traderid'] = $('#traderName').data('id');
                master_backup['master.ctraderid'] = master_backup['master.traderid'];
                master_backup['master.tradertaxrate'] = $('#traderName').data('taxrate') || "";
                master_backup['master.iscashtrader'] = $('#traderName').data('iscashtrader') || 0;
                master_backup['master.billto'] = $('#traderName').data('billto') || "";
                master_backup['master.shiptype'] = $('#traderName').data('shiptype') || '';
                master_backup['master.scamt'] = $('#traderName').data('scamt') || 0;
                master_backup['master.linkman'] = $('#traderName').data('contactor') || "";
                master_backup['master.contactphone'] = $('#traderName').data('tel1') || "";
                master_backup['master.contactfax'] = $('#traderName').data('fax') || "";
                master_backup['master.termdays'] = $('#traderName').data('termdays') || 0;
                master_backup['master.chargeterm'] = $('#traderName').data('termdays') || "";
                master_backup['master.paymethodid'] = $('#traderName').data('paymethodid') || "";
                master_backup['master.distributorid'] = $('#traderName').data('distributorid') || "";
                master_backup['master.vipid']=$('#traderName').data('vipid') || "";
                master_backup['master.lastpoint']=$('#traderName').data('point') || "";
                master_backup['master.updatetime'] = _Public.getDates().sDate;
                //项目
                master_backup['master.projectid'] = $('#projectName').data('id');
                //员工
                master_backup['master.empid'] = $('#empName').data('id');
                //中止
                if ($('#closed').is(':checked')) {
                    master_backup['master.closed'] = 1;
                } else {
                    master_backup['master.closed'] = 0;
                }
            }
        },
         /*
         *单据保存处理
         */
        save:function(dataJson,listUrl){
           // alert(5656);
            //console.log(dataJson);
            $.ajax({
                type: 'POST',
                url: dataJson['url'],
                dataType: 'json',
                data: dataJson['data'],
                timeout: 3000,
                success: function (ret) {
                    console.log(ret);
                    _Public.hideProgress();
                    if (ret.errNo == 0) {
                        _Public.layerMsg("保存成功！",{ time:1 });
                        setTimeout(function(){
                            window.location='./'+listUrl+'.html';
                        },2000);
                    } else if (ret.errNo == 1) {
                        _Public.layerMsg(ret.errMsg,{ time:2 });
                    } else if (ret.errNo == 500) {
                        _Public.confirmLayer(ret.errMsg,function(){
                            //确认
                            _Public.showLoading();
                            dataJson['data']['checkStep'] = 500;
                            $.ajax({
                                type: 'POST',
                                url: dataJson['url'],
                                dataType: 'json',
                                data: dataJson['data'],
                                timeout: 3000,
                                success: function (ret) {
                                    _Public.hideProgress();
                                    if (ret.errNo == 0) {
                                       _Public.layerMsg("保存成功！",{ time:1 });
                                       setTimeout(function(){
                                            window.location='./'+listUrl+'.html';
                                        },2000);
                                    }else if (ret.errNo == 1) {
                                        _Public.layerMsg(ret.errMsg,{ time:2 });
                                    }
                                },error:function(){
                                    _Public.hideProgress();
                                }
                            });
                        },function(){
                            //取消
                        });
                    }

                },
                error: function (err) {
                    console.log(err);
                   _Public.hideProgress();
                }
            });
        }    

    }
    save_order.prototype.constructor = save_order;
    module.exports = new save_order();
})