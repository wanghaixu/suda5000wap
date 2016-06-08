<?php
	// 支付配置
	$pay_config = array(

	    //支付宝支付配置
	    'alipay'=>array(
	        'partner'=>'2088021169646540',
	        'key'=>'lua0khwpcii1b0ngt4n5scrlknforyku',
	        'seller_email' => '3102100056@qq.com',
	        'defaultbank'=> 'BOCB2C'
	    ),

		//双乾支付配置
		'epay' => array(
			'MerNo' => '183663',//商户ID
			'MD5key' => 'OGOA_u^E',//MD5key
			'PayType' => 'CSPAY',//网银支付
			'MerRemark' => '广州顿可食品有限公司',//商户备注信息
			'products' => '顿可商城订单'//商品备注信息
		),
		
		//微信支付配置
		'WxPayConf_pub'=>array(
	        'APPID' => 'wx7dc92a4561681586',
	        'MCHID' => '1230364602',
	        'KEY' => 'gPrUKOtHTYTooDuP17G3CugKaaQjht5eXlslUnICaNT',
	        'APPSECRET' => 'b17f01d454cbf018e426d89a4d313f38',
	        'JS_API_CALL_URL' => WEB_HOST.'/Wap/Test/jsApiCall',
	        //'SSLCERT_PATH' => WEB_HOST.'/ThinkPHP/Library/Vendor/WxPayPubHelper/cacert/apiclient_cert.pem',
	        //'SSLKEY_PATH' => WEB_HOST.'/ThinkPHP/Library/Vendor/WxPayPubHelper/cacert/apiclient_key.pem',
	        'NOTIFY_URL' =>  WEB_HOST.'/Wap/Test/notify',
	        'CURL_TIMEOUT' => 30
	    )
	);
	// 外部接口配置
	$lib_config = array(

		// 微信公众号配置
	    'wechat' => array(
	        'appid'     =>  'wx7e1968965d532af9',       // 公众号appid
	        'appsecret' =>  '49dd14f02eb817bd16d0ebc48d38952a',   // 公众号appsecret
	    ),
	);
return array_merge($pay_config,$lib_config);
