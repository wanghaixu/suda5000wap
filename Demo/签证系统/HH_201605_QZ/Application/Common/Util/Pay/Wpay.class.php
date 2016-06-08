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
class Wpay{
	//$config:配置
    private $config;
	//$data:支付数据
	private $data;

	//$data = array('openid' => 用户openid,'body' => 商品描述,'out_trade_no' => 订单号,'total_fee' => 金额,'notify_url' => 回调地址)
	public function __construct($config,$data){
		$this->config = $config;
		$this->data = $data;
	}

	//微信支付
	public function orderPay(){
		//pre($this->data);die;
		//引入WxPayPubHelper
		require('WxPayPubHelper/WxPayPubHelper.php');
        //使用jsapi接口
        $jsApi = new \JsApi_pub();
		//=========步骤1：获取用户openid============
		//$openid = $_SESSION['open_id'];
		//=========步骤2：使用统一支付接口，获取prepay_id============
        //使用统一支付接口
        $unifiedOrder = new \UnifiedOrder_pub();

		$orderNum = htmlspecialchars($this->data['orderNum']);
		//pre($this->data);die;
		$unifiedOrder->setParameter("openid",$this->data['openid']);//用户openid
        $unifiedOrder->setParameter("body",$this->data['body']);//商品描述
        $unifiedOrder->setParameter("out_trade_no",$this->data['out_trade_no']);//商户订单号
        $unifiedOrder->setParameter("total_fee",($this->data['total_fee']*100));//总金额
		$unifiedOrder->setParameter("notify_url",$this->data['notify_url']);//通知地址
        $unifiedOrder->setParameter("trade_type","JSAPI");//交易类型

		$prepay_id = $unifiedOrder->getPrepayId();
		 //=========步骤3：使用jsapi调起支付============
        $jsApi->setPrepayId($prepay_id);        
        $jsApiParameters = $jsApi->getParameters();
        return $jsApiParameters;
	}

	public function notify(){
		//引入WxPayPubHelper
		vendor('WxPayPubHelper.WxPayPubHelper');
        //使用通用通知接口
        $notify = new \Notify_pub();
        
        //存储微信的回调
        $xml = $GLOBALS['HTTP_RAW_POST_DATA'];
        $notify->saveData($xml);
        
        //验证签名，并回应微信。
        //对后台通知交互时，如果微信收到商户的应答不是成功或超时，微信认为通知失败，
        //微信会通过一定的策略（如30分钟共8次）定期重新发起通知，
        //尽可能提高通知的成功率，但微信不保证通知最终能成功。
        if($notify->checkSign() == FALSE){
            $notify->setReturnParameter("return_code","FAIL");//返回状态码
            $notify->setReturnParameter("return_msg","签名失败");//返回信息
        }else{
            $notify->setReturnParameter("return_code","SUCCESS");//设置返回码
        }
        $returnXml = $notify->returnXml();

        echo $returnXml;

        //==商户根据实际情况设置相应的处理流程，此处仅作举例=======
        
        //以log文件形式记录回调信息
 //         $log_ = new Log_();
        $log_name= __ROOT__."/Public/notify_url.log";//log文件路径
        
        //log_result($log_name,"【接收到的notify通知】:\n".$xml."\n");
        
        if($notify->checkSign())
        {

            if ($notify->data["return_code"] == "FAIL") {
                //此处应该更新一下订单状态，商户自行增删操作
                //log_result($log_name,"【通信出错】:\n".$xml."\n");
				return array('status' => 0,'obj' => $notify);
            }
            elseif($notify->data["result_code"] == "FAIL"){
                //此处应该更新一下订单状态，商户自行增删操作
                //log_result($log_name,"【业务出错】:\n".$xml."\n");
				return array('status' => 0,'obj' => $notify);
            }
            else{
				//A('Common/Pay','Model')->point($notify->data['out_trade_no'],$notify->data['transaction_id'],'微信支付');
				return array('status' => 1,'obj' => $notify);
            }
        }

    }
}