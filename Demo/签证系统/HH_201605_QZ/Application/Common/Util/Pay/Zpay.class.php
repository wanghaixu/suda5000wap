<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2014 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

//namespace Think\Db\Driver;
namespace Common\Util\Pay;

/**
 * 支付宝支付
 */
class Zpay{
	//$config:配置
    private $config;
	//$orderNum:订单号
	private $orderNum;
	//$amount:支付金额
	private $amount;
	//$data:支付数据
	private $data;

	public function __construct($config,$data){
		$this->config = array(
			//合作身份者id，以2088开头的16位纯数字
            'partner'       => $config["partner"],
            //安全检验码，以数字和字母组成的32位字符
            'key'           => $config["key"],
            //签名方式 不需修改
            'sign_type'     => strtoupper('MD5'),
            //字符编码格式 目前支持 gbk 或 utf-8
            'input_charset' => strtolower('utf-8'),
            //ca证书路径地址，用于curl中ssl校验
            //请保证cacert.pem文件在当前文件夹目录中
			//Application/Common/Util/Pay
            'cacert'        => getcwd().'\\Application\\Common\\Util\\Pay\\Alipay\\cacert.pem',
            //访问模式,根据自己的服务器是否支持ssl访问，若支持请选择https；若不支持请选择http
            'transport'     => 'http'	
		);
		$this->data = $data;
	}
	//$data = array('out_trade_no' => 商户订单号,'subject' => 订单名称,'total_fee' => 付款金额,'body' => 订单描述,'show_url' => 商品展示地址,'return_url' => 回调函数,'notify_url' => 通知函数,'defaultbank' => 银行代码)
	public function alipay(){
		if($this->data['defaultbank'] == 'pay'){
        	$html = $this->pay($this->data);
		}else{
			$html = $this->bank_pay($this->data);
		}
		return array('status'=>1,'info'=>$html);
	}

	 public function pay($data){
        //构造要请求的参数数组，无需改动
        $parameter = array(
            "service"          => "create_direct_pay_by_user",
            "partner"          => trim($this->config['partner']),
            "payment_type"     => 1,                                 //支付类型
            "return_url"       => $this->data['return_url'],                       //页面跳转同步通知页面路径
            "notify_url"       => $this->data['notify_url'],                       //服务器异步通知页面路径
            "seller_email"     => $this->config["seller_email"],          //卖家支付宝帐户
            "seller_id"        => trim($this->config['partner']),    
            "out_trade_no"     => $this->data['out_trade_no'],          //商户订单号
            "subject"          => $this->data['subject'],               //订单名称
            "total_fee"        => $this->data['total_fee'],             //付款金额
            "body"             => $this->data['body'],                  //订单描述
            "show_url"         => $this->host.$this->data['show_url'],  //商品展示地址
            "anti_phishing_key"=> '',                                //防钓鱼时间戳
            "exter_invoke_ip"  => get_client_ip(),                   //客户端的IP地址
            "_input_charset"   => trim(strtolower($this->config['input_charset']))
        );
        //建立请求
		//require('/ThinkPHP/Library/Org/Util/Pay/WxPayPubHelper/WxPayPubHelper.php');
		//Application/Common/Util/Pay
		
        require('Alipay/lib/alipay_submit.class.php');
        $alipaySubmit = new \AlipaySubmit($this->config);
        $html_text = $alipaySubmit->buildRequestForm($parameter,"post", "请稍候，正在跳转至付款页面");
        return $html_text;  
    }

    public function alipay_notify(){
   
    }


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
        require('Alipay/lib/alipay_notify.class.php');
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
    public function bank_pay($data){
		//如果银行简码为空，默认使用配置文件的银行简码
		if(!$defaultbank){
			$defaultbank = $this->config["defaultbank"];
		}
        //构造要请求的参数数组，无需改动
        $parameter = array(
            "service"          => "create_direct_pay_by_user",
            "partner"          => trim($this->config['partner']),
            "seller_email"     => $this->config["seller_email"],       //卖家支付宝帐户
            "payment_type"     => 1,                              //支付类型
            "return_url"       => $this->data['return_url'],                    //页面跳转同步通知页面路径
            "notify_url"       => $this->data['notify_url'],                    //服务器异步通知页面路径
            "out_trade_no"     => $this->data['out_trade_no'],          //商户订单号
            "subject"          => $this->data['subject'],               //订单名称
            "total_fee"        => $this->data['total_fee'],             //付款金额
            "body"             => $this->data['body'],                  //订单描述
            "paymethod"        => "bankPay",                      //默认支付方式        
            "defaultbank"      => $this->data['defaultbank'],					  //默认银行【简码】，参考接口技术文档
            "show_url"         => $this->host.$this->data['show_url'],  //商品展示地址
            "anti_phishing_key"=> '',                             //防钓鱼时间戳
            "exter_invoke_ip"  => get_client_ip(),                //客户端的IP地址
            "_input_charset"   => trim(strtolower($this->config['input_charset']))
        );
        //建立请求
        require('Alipay/lib/alipay_submit.class.php');
        $alipaySubmit = new \AlipaySubmit($this->config);
        $html_text = $alipaySubmit->buildRequestForm($parameter,"get", "确认");
        return $html_text;
    }
}
