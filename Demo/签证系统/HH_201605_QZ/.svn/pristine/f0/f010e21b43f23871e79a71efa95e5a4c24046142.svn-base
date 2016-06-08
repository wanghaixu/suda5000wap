/* ===============================================================================
************   Validate:表单验证   ************
=============================================================================== */
function Validate(){
    //（变量）正则表达式
    var phoneNum = /^1[3|4|5|7|8][0-9]{9}$/;//手机号码
    var idCard = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;//身份证号码
    var idCode = /^[0-9a-zA-Z]{8}\-[0-9a-zA-Z]$/;//组织机构代码（八位本体码加一位校验码，L1234B57-8）
    var numAlp = /[a-zA-Z0-9]*/;//数字和字母
    /*
    *  （方法）验证正则
    *   @param regVar String/VarName 正则变量
    *   @param str String 需要被验证的字符串
    */
    var isReg = function(regVar, str){
        if(typeof(regVar)!='string'){
            //正则变量
            return regVar.test(str);
        }else if(regVar.indexOf(",") != -1){
            //以‘，’分割的多个正则变量字符串
            var s = regVar.split(",");
            for(var i=0; i<s.length; i++){
                var reg = $.trim(s[i]);
                if(eval(reg).test(str)){
                    return true;
                }
            }
        }else{
            //单个正则变量字符串
            return eval(regVar).test(str);
        }
    }
    /*
    *   （方法）对表单进行校验
    *   @param obj Object 包含表单的父元素对象
    */
    this.checkInputText = function(obj){
        var bool = false;
        obj.find($('input, select')).each(function(index){
            // console.log('input %d is: %o', index, this);
            var inputVal = $.trim($(this).val().replace(/\s+/g, ""));//获取input的value（去除所有空格）
            // var dataReg = eval($.trim($(this).attr('data-reg')));//获取input的正则表达式
            var dataReg = $.trim($(this).attr('data-reg'));//获取input的正则表达式
            var dataLen = $.trim($(this).attr('data-len'));//获取input的指定长度
            //获取提示的文字
            var tripAttr = 'placeholder';
            if($(this).attr('data-trip')!=null){
                tripAttr = 'data-trip';
            }
            //表单校验
            if( inputVal.length==0 ){
                //验证是否为空
                $.toast($(this).attr(tripAttr));
                bool = false;
                return false;
            }else if( dataLen!='' && inputVal.length!=Number(dataLen) ){
                //验证长度
                $.toast('您输入的‘' + inputVal + '’长度不正确');
                bool = false;
                return false;
            }else if(  dataReg!='' && !isReg(dataReg, inputVal) ){
                //验证是否合法
                $.toast('您输入的‘' + $(this).val() + '’不合法');
                bool = false;
                return false;
            }else{
                bool = true;
            }
        });
        return bool;
    }
}