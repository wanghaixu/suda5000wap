//判断手机号码格式
 function validatemobile(phone,type)
{
    var s='1';
    var phone_num=phone.val();
	var myreg = /^1[3|4|5|7|8]\d{9}$/;
    if(phone_num.length==0)
    {
		if(!type){
			layer.msg('请输入联系电话',{icon:0});
			phone.focus();
			s='0';
		}
    }    
    else if(phone_num.length!=11)
    {
        layer.msg('请输入有效的联系电话',{icon:0});
        phone.val('').focus();
        s='0';
    }      
    else if(!myreg.test(phone_num)){
        layer.msg('请输入有效的联系电话',{icon:0});
        phone.val('').focus();
        s='0';
     }
     return s;
}
//判断输入框是否为空
 function isnull(phone,str)
{
    var s='1';
    var phone_num=$.trim(phone.val());
     if(phone_num==''){
        s='0';
        phone.focus();
        layer.msg(str,{icon:0});
     }
     return s;
}
//判断卡号
 function checkedCard(card)
{
    var s='0';
    var nocode = /[^a-zA-Z0-9]/;    //查找不符合要求的字符
    var card_num=$.trim(card.val());
    // if(card_num.length==0)
    // {
    //    layer.msg('请输入卡号！');
    //     card.focus();
    // }else if(card_num.length==13){
    //     if (!nocode.test(card_num)) { 
    //         s='1';
    //     }else{
    //        layer.msg('卡号只能是数字或英文！');
    //         card.focus();
    //     }
    // }else{
    //      layer.msg('请输入13位卡号！');
    //       card.focus();
    // }
     if(card_num.length==0)
    {
       layer.msg('请输入卡号',{icon:0});
        card.focus();
    }else{
         if(!nocode.test(card_num)) { 
            s='1';
        }else{
           layer.msg('卡号只能是数字或英文',{icon:0});
           card.val('').focus();
        }
    }
    return s;
}

//判断金额
function is_money(money,type,msg){
	var s = 1;
	var myreg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
	if(money.val()==''){
		if(!type){
			layer.msg('请输入'+msg,{icon:0});
			money.focus();
			s='0';
		}
	}
    else if(!myreg.test(money.val())){
        layer.msg('请输入有效的'+msg,{icon:0});
        money.val('').focus();
        s='0';
	}
	return s;
}

//判断日期
function is_date(dateObj,type){
	var s = 1;
	var myreg = /^([1-2]\d{3})[\/|\-](0?[1-9]|10|11|12)[\/|\-]([1-2]?[0-9]|0[1-9]|30|31)$/;
	if(dateObj.val()==''){
		if(!type){
			layer.msg('请输入日期',{icon:0});
			dateObj.focus();
			s='0';
		}
	}
    else if(!myreg.test(dateObj.val())){
        layer.msg('请输入有效的日期',{icon:0});
        dateObj.val('').focus();
        s='0';
	}
	return s;
}

//判断QQ号
function is_qq(obj,type){
	var s = 1;
	var myreg = /^[1-9][0-9]{4,9}$/;
	if(obj.val()==''){
		if(!type){
			layer.msg('请输入QQ号',{icon:0});
			obj.focus();
			s='0';
		}
	}
    else if(!myreg.test(obj.val())){
        layer.msg('请输入有效的QQ号',{icon:0});
        obj.val('').focus();
        s='0';
	}
	return s;
}

//判断登录账号
function check_username_pwd(obj,msg){	
	var s = 1;
	var myreg = /^[0-9a-zA-Z_]{6,20}$/;
	if(obj.val()==''){
		layer.msg('请输入登录'+msg,{icon:0});
		obj.focus();
		s='0';
	}else if(!myreg.test(obj.val())){
         layer.msg('请输入有效的登录'+msg,{icon:0});
         obj.val('').focus();
         s='0';
	}
	return s;
}

//判断非0正整数
function isnum(obj){
	var s = 1;
	var myreg = /^\+?[1-9][0-9]*$/;
	if(obj.val()==''){
		layer.msg('请输入次数',{icon:0});
		obj.focus();
		s='0';
	}else if(!myreg.test(obj.val())){
         layer.msg('请输入有效的次数',{icon:0});
         obj.val('').focus();
         s='0';
	}
	return s;
	
}