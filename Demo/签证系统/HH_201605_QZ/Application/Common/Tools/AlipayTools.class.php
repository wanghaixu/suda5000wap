<?php
namespace Common\Tools;
class AlipayTools{
    private $config = array();
    public function __construct(){
        $this->config = array(
            //合作身份者id，以2088开头的16位纯数字
            'partner'       => C("alipay.partner"),
            //安全检验码，以数字和字母组成的32位字符
            'key'           => C("alipay.key"),
            //签名方式 不需修改
            'sign_type'     => strtoupper('MD5'),
            //字符编码格式 目前支持 gbk 或 utf-8
            'input_charset' => strtolower('utf-8'),
            //ca证书路径地址，用于curl中ssl校验
            //请保证cacert.pem文件在当前文件夹目录中
            'cacert'        => getcwd().'\\ThinkPHP\\Library\\Org\\Alipay\\cacert.pem',
            //访问模式,根据自己的服务器是否支持ssl访问，若支持请选择https；若不支持请选择http
            'transport'     => 'http'
        );
    }


    /**
     * 支付操作
     * @param  [array]  $data 				   [订单信息]
     *                  $data['out_trade_no']  [商户订单号]
     *                  $data['subject']	   [订单名称]
     *                  $data['total_fee']	   [付款金额]
     *                  $data['body']		   [订单描述]
     *                  $data['show_url']	   [商品展示地址]
     * @param  [string] $return_url            [跳转的URL地址]
     * @param  [string] $notify_url            [服务器异步通知页面路径]
     * 
     * @return [string] $html_text             [跳转页面]
     */
    public function pay($data, $return_url='', $notify_url=''){
        //构造要请求的参数数组，无需改动
        $parameter = array(
            "service"          => "create_direct_pay_by_user",
            "partner"          => trim($this->config['partner']),
            "payment_type"     => 1,                                 //支付类型
            "return_url"       => $return_url,                       //页面跳转同步通知页面路径
            "notify_url"       => $notify_url,                       //服务器异步通知页面路径
            "seller_email"     => C("alipay.seller_email"),          //卖家支付宝帐户
            "seller_id"        => trim($this->config['partner']),    
            "out_trade_no"     => $data['out_trade_no'],          //商户订单号
            "subject"          => $data['subject'],               //订单名称
            "total_fee"        => $data['total_fee'],             //付款金额
            "body"             => $data['body'],                  //订单描述
            "show_url"         => $this->host.$data['show_url'],  //商品展示地址
            "anti_phishing_key"=> '',                                //防钓鱼时间戳
            "exter_invoke_ip"  => get_client_ip(),                   //客户端的IP地址
            "_input_charset"   => trim(strtolower($this->config['input_charset']))
        );
        //建立请求
        import('Org.Util.Alipay.lib.alipay_submit');
        $alipaySubmit = new \AlipaySubmit($this->config);
        $html_text = $alipaySubmit->buildRequestForm($parameter,"post", "请稍候，正在跳转至付款页面");
        return $html_text;  
    }

    // public function alipay_notify(){
    //     //计算得出通知验证结果
    //     import('Org.Util.Alipay.lib.alipay_notify');
    //     $alipayNotify = new \AlipayNotify($this->config);
    //     $verify_result = $alipayNotify->verifyNotify();
    //     if($verify_result) {//验证成功
    //         /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //         //商户订单号
    //         $out_trade_no   = $_POST['out_trade_no'];
    //         //支付宝交易号
    //         $trade_no       = $_POST['trade_no'];
    //         //交易状态
    //         $trade_status   = $_POST['trade_status'];
    //         if($_POST['trade_status'] == 'TRADE_FINISHED') {

    //         }
    //         else if ($_POST['trade_status'] == 'TRADE_SUCCESS') {

    //         }

    //         echo "success";        //请不要修改或删除

    //         /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //     }
    //     else {
    //         //验证失败
    //         echo "fail";

    //     }
    // }


    /**
     * 支付回调函数
     * 
     * @return [array] 
     *          body            订单描述
     *          buyer_email     付款支付宝账号
     *          buyer_id        
     *          exterface
     *          is_success
     *          notify_id
     *          notify_time
     *          notify_type
     *          out_trade_no    网站订单ID 
     *          payment_type
     *          seller_email    收款支付宝
     *          seller_id
     *          subject         订单名称
     *          total_fee       支付金额
     *          trade_no        支付宝交易号
     *          trade_status    支付状态
     *          sign
     *          sign_type
     * 
     */
    public function alipay_return($get){
        //计算得出通知验证结果
        import('Org.Util.Alipay.lib.alipay_notify');
        $alipayNotify = new \AlipayNotify($this->config);
        $verify_result = $alipayNotify->verifyReturn();
        if($verify_result) {//验证成功
            if($get['trade_status'] == 'TRADE_FINISHED' || $get['trade_status'] == 'TRADE_SUCCESS') {
                return true;    
            }else{
                return false;
            }
        }else{
           return false;
        }
    }


    /**
     * 网银支付操作
     * @param  [array]  $data                  [订单信息]
     *                  $data['out_trade_no']  [商户订单号]
     *                  $data['subject']       [订单名称]
     *                  $data['total_fee']     [付款金额]
     *                  $data['body']          [订单描述]
     *                  $data['show_url']      [商品展示地址]
     * @param  [string] $return_url            [跳转的URL地址]
     * @param  [string] $notify_url            [服务器异步通知页面路径]
     * 
     * @return [string] $html_text             [跳转页面]
     */
    public function bank_pay($data, $return_url='', $notify_url='', $defaultbank=''){
		//如果银行简码为空，默认使用配置文件的银行简码
		if(!$defaultbank){
			$defaultbank = C("alipay.defaultbank");
		}
        //构造要请求的参数数组，无需改动
        $parameter = array(
            "service"          => "create_direct_pay_by_user",
            "partner"          => trim($this->config['partner']),
            "seller_email"     => C("alipay.seller_email"),       //卖家支付宝帐户
            "payment_type"     => 1,                              //支付类型
            "return_url"       => $return_url,                    //页面跳转同步通知页面路径
            "notify_url"       => $notify_url,                    //服务器异步通知页面路径
            "out_trade_no"     => $data['out_trade_no'],          //商户订单号
            "subject"          => $data['subject'],               //订单名称
            "total_fee"        => $data['total_fee'],             //付款金额
            "body"             => $data['body'],                  //订单描述
            "paymethod"        => "bankPay",                      //默认支付方式        
            "defaultbank"      => $defaultbank,					  //默认银行【简码】，参考接口技术文档
            "show_url"         => $this->host.$data['show_url'],  //商品展示地址
            "anti_phishing_key"=> '',                             //防钓鱼时间戳
            "exter_invoke_ip"  => get_client_ip(),                //客户端的IP地址
            "_input_charset"   => trim(strtolower($this->config['input_charset']))
        );
        //建立请求
        import('Org.Util.Alipay.lib.alipay_submit');
        $alipaySubmit = new \AlipaySubmit($this->config);
        $html_text = $alipaySubmit->buildRequestForm($parameter,"get", "确认");
        return $html_text;
    }

}