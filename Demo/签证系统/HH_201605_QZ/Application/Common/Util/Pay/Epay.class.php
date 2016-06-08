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
 * mysql数据库驱动 
 */
class Epay{
	//$config:配置
    private $config;
	//$data:订单信息
	private $data;

	//$data = array('BillNo' => 订单号,'Amount' => 付款金额,'ReturnURL' => 回调函数)
	public function __construct($config,$data){
		$this->config = $config;
		$this->data = $data;
	}
	
	//双乾支付数据提交方法
	public function epaySubmit(){
		//p($this->config);die;
		$data['MD5key'] = $this->config['MD5key'];    //[MD5key]
		$data['MerNo'] = $this->config['MerNo'];    //[商户ID]
		$data['PayType'] = $this->config['PayType'];    //[网银支付]
		$data['MerRemark'] = $this->config['MerRemark'];    //[商户备注信息]
		$data['products'] = $this->config['products'];	//[商户备注信息]

		$data['NotifyURL'] = '';    //[服务端后台支付状态通知]
		$data['PaymentType'] = '';    //[支付银行类型]
		$data['BillNo'] = (string)$this->data['out_trade_no'];	//[商户订单号]
		$data['Amount']	= $this->data['total_fee'];	//[付款金额]
		$data['ReturnURL'] = $this->data['notify_url'];//[商户前台页面跳转通知]
        $data['MD5info'] = $this->getSignature_submit($data['MerNo'], $data['BillNo'], $data['Amount'], $data['ReturnURL'], $data['MD5key']);//[参数加密串]
		$data['status'] = 1;
		$data['epay'] = 1;
		return $data;
	}

	//双乾支付加密函数
	private function getSignature_submit($MerNo, $BillNo, $Amount, $ReturnURL, $MD5key){
		$sign_params  = array(
			'MerNo'       => $MerNo,
			'BillNo'       => $BillNo, 
			'Amount'         => $Amount,   
			'ReturnURL'       => $ReturnURL
		);
	    $sign_str = "";
	    ksort($sign_params);
	    foreach ($sign_params as $key => $val) {
			$sign_str .= sprintf("%s=%s&", $key, $val);                
		}
	   return strtoupper(md5($sign_str. strtoupper(md5($MD5key))));		
	}
}
