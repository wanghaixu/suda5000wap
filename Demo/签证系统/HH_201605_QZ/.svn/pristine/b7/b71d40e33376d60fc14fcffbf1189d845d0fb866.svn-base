// +----------------------------------------------------------------------
// | Description: js表单验证方法， 依赖JQ或zepto
// |              formVerify : 表单验证方法
// |              verifyCb  : 表单验证回调方法
// +----------------------------------------------------------------------
// | Author:  阿莫大侠 <mojiannan@honghaiweb.com>
// +----------------------------------------------------------------------

// 调用实例
// <script>
// var validate = [
//     [$("input[name='vali1']"),"required","必须填写"],
//     [$("input[name='vali2']"),"matches(#matches)","两者必须相同"],
//     [$("input[name='vali3']"),"email(20)","邮箱格式错误"],
//     [$("input[name='vali4']"),"len_min(5)","长度最短5"],
//     [$("input[name='vali5']"),"len_max(5)","长度最长5"],
//     [$("input[name='vali6']"),"len_eq(20)","长度需等于5"],
//     [$("input[name='vali7']"),"gt(20)","需大于20"],
//     [$("input[name='vali8']"),"lt(20)","需小于20"],
//     [$("input[name='vali9']"),"alpha"," a-z,A-Z"],
//     [$("input[name='vali10']"),"alphaNumeric","a-z,A-Z,0-9"],
//     [$("input[name='vali11']"),"alphaDash","a-z,A-Z,0-9,'-','_'"],
//     [$("input[name='vali12']"),"numeric","0-9"],
//     [$("input[name='vali13']"),"regex(/^\-?[0-9]+$/)","自定义正则"],
//     [$("input[name='vali14']"),"decimal","decimal"],
//     [$("input[name='vali16']"),"mobile","mobile"],
//     [$("textarea[name='vali17']"),"emails","存在不正确格式的邮箱"],
// ];
// formVerify(validate)
// </script>

/**
 * 验证表单
 * @param  {array}  validate 验证规则
 * @param  {string} cb_fun   回调方法名称
 */
function formVerify(validate,cb_fun) {
    //正则
    var regex = {
        'numeric' : /^[0-9]+$/,
        'int' : /^\-?[0-9]+$/,
        'intNoZero' : /^\-?[1-9][0-9]+$/,
        'decimal' : /^\-?[0-9]*\.?[0-9]+$/,
        'email' : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        'alpha' : /^[a-z]+$/i,
        'alphaNumeric' : /^[a-z0-9]+$/i,
        'alphaDash' : /^[a-z0-9_\-]+$/i,
        'natural' : /^[0-9]+$/i,
        'naturalNoZero' : /^[1-9][0-9]*$/i,
        'ip' : /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
        'base64' : /[^a-zA-Z0-9\/\+=]/i,
        'numericDash' : /^[\d\-\s]+$/,
        'url' : /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        'date' : /\d{4}-\d{1,2}-\d{1,2}/,
        'mobile': /^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$/,
        'tel' : /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/,
    };
    //处理方法
    var fun = {
        /**
         * 自定义正则
         */
        regex: function(field,regex) {
            var value = field.val();
            if (value=='') return true;
            var regex = eval(regex);
            return (regex.exec(value));
        },

        /**
         * 验证是否为空
         */
        required: function(field) {
            var value = field.val();

            if ((field.attr('type') === 'checkbox') || (field.attr('type') === 'radio')) {
                return (field.checked === true);
            }

            return (value !== null && value !== '');
        },

        /**
         * 验证两者是否一致
         * @param  [string] matchName   元素选择器
         */
        matches: function(field, matchName) {
            var el = $(matchName);

            if (el) {
                return field.val() === el.val();
            }

            return false;
        },

        /**
         * 验证单个邮箱
         */
        email: function(field) {
            var value = field.val();
            if (value=='') return true;
            return regex['email'].test(value);
        },

        /**
         * 验证多个邮箱，以,分割
         */
        emails: function(field) {
            var value = field.val();
            if (value=='') return true;
            var result = value.split(/\s*,\s*/g);
            for (var i = 0, resultLength = result.length; i < resultLength; i++) {
                if (!regex['email'].test(result[i])) {
                    return false;
                }
            }

            return true;
        },

        /**
         * 长度不小于
         * @param  [int/string] length      限制最小的长度
         */
        len_min: function(field, length) {
            var value = field.val();
            if (value=='') return true;

            if (!regex['numeric'].test(length)) {
                return false;
            }

            return (value.length >= parseInt(length, 10));
        },

        /**
         * 长度不大于
         * @param  [int/string] length      限制最大的长度
         */
        len_max: function(field, length) {
            var value = field.val();
            if (value=='') return true;

            if (!regex['numeric'].test(length)) {
                return false;
            }

            return (value.length <= parseInt(length, 10));
        },

        /**
         * 长度必须等于
         * @param  [int/string] length      限制的长度
         */
        len_eq: function(field, length) {
            var value = field.val();
            if (value=='') return true;

            if (!regex['numeric'].test(length)) {
                return false;
            }

            return (value.length === parseInt(length, 10));
        },

        /**
         * 数值大于
         * @param  [numeric]      param       最小值
         */
        gt: function(field, param) {
            var value = field.val();
            if (value=='') return true;

            if (!regex['decimal'].test(value)) {
                return false;
            }

            return (parseFloat(value) > parseFloat(param));
        },

        /**
         * 数值小于
         * @param  [numeric]      param       最大值
         */
        lt: function(field, param) {
            var value = field.val();
            if (value=='') return true;

            if (!regex['decimal'].test(value)) {
                return false;
            }

            return (parseFloat(value) < parseFloat(param));
        },
    }

    //核心处理代码
    var error = [];
    $.each(validate,function(k,v) {
        // 规则
        rules = v[1].split('|');
        v[0].each(function() {
            elm = $(this);
            //遍历验证
            $.each(rules,function(i,j) {
                //处理方法及参数
                var temp_index= j.indexOf('(');
                if (temp_index != -1) {
                    //带参数
                    var rules_fun = j.slice(0,temp_index);
                    var rules_param = j.slice(temp_index+1,-1);
                    var param = rules_param.split(',');
                    param.unshift(elm);
                }else{
                    //不带参数
                    var rules_fun = j;
                    var param = [elm];
                }

                if (fun[rules_fun]) {
                    //存在方法则执行方法验证
                    if (!fun[rules_fun].apply(this,param)){
                        error.push([elm,v[2]]);
                        return false; 
                    };
                }else if (regex[rules_fun]){
                    //不存在方法，存在正则，直接执行正则验证
                    if (!fun['regex'].apply(this,[elm,regex[rules_fun]])){
                        error.push([elm,v[2]]);
                        return false;
                    };
                }else{
                    //不存在方法，不存在正则，提醒
                    console.log(rules_fun+'这个规则没有定义，去问一下大火鸡');
                };
            });
        });
    });
    
    if (error.length==0) return true;
    //调用默认callback函数
    if(!cb_fun||cb_fun=='') var cb_fun="verify_cb";
    // console.log(cb_fun);
     window[cb_fun](error);
    return false;
}

/**
 * 默认callback函数，按提醒方式重写
 * @param  {array} error formVerify 产出的错误数组
 */
// function verify_cb(error) {
//     $.each(error,function(k,v) {
//         console.log(v[0]);
//     })
// }

