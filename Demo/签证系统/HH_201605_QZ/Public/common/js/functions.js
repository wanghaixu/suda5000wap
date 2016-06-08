/**
 * 通用AJAX提交
 * @param  {string} url    表单提交地址
 * @param  {string} formObj    待提交的表单对象或ID
 */
function commonAjaxSubmit(url,formObj){
    if(!formObj||formObj==''){
        var formObj="form";
    }
    if(!url||url==''){
        var url=document.URL;
    }
    $(formObj).ajaxSubmit({
        url:url,
        type:"POST",
        success:function(data, st) {
            if(data.status==1){
				layer.msg(data.info,{time: 2000,icon: 1});
            }else{
				layer.msg(data.info,{time: 2000,icon: 0});
            }
            setTimeout(function(){
                if(data.url&&data.url!=''){
                    top.window.location.href=data.url;
                }else{
                    top.window.location.reload();
                }
            },2000); 
        }
    });
    return false;
}
/**
 * 检测字符串是否是电子邮件地址格式
 * @param  {string} value    待检测字符串
 */
function isEmail(value){
    var Reg =/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return Reg.test(value);
}

/**
 * 检测字符串是否是手机格式
 * @param  {string} value    待检测字符串
 */
function isMobile(value){
    var Reg =/^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$/;
    return Reg.test(value);
}

/**
 * input 筛选 select 框
 * @param  {object} obj 一般写this即可
 * @param  {string} elm select框的选择器
 * @example  在input加上 onchange="searchSelect(this,'#g_select')" 
 * @author 阿莫大侠
 */
function searchSelect(obj,elm) {
    var keywork = $(obj).val();
    $(elm).val('');
    $(elm).find('option').each(function(k,v) {
        if ($(v).html().indexOf(keywork)==-1) {
            $(v).hide();
        }else{
            $(v).show();
        }
    })
}