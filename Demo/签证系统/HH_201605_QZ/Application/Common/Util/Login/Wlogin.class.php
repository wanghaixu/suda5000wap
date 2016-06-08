<?php
	namespace Common\Util\Login;
	class Wlogin {
		private $config;
		private $data;
		public function __construct($config,$data){
			$this->config = $config;    //传递配置
			$this->data = $data;		//传递数据
		}

		public function wechatOAuthLogin(){
			$appid= $this->config['appid'];
			// $appsecret=$config['appsecret'];

			$query = array(
				'appid'         => $this->config['appid'],
				'redirect_uri'  => $this->data['return_url'],
				//'redirect_uri'  => 'http://'.C('SITE_INFO.domain').U('Public/wechatOAuthLoginReturn'),
				'response_type' => 'code',
				'scope'         => 'snsapi_login',
			);
			$query = http_build_query($query);
			//p($query);die;
			$requestCodeURL ='https://open.weixin.qq.com/connect/qrconnect';
			$url = "{$requestCodeURL}?{$query}#wechat_redirect";
			//echo $url;die;
			//跳转到授权页面
			redirect($url);
		}

		public function wechat_return($code){
			$appid= $this->config['appid'];
			$appsecret=$this->config['appsecret'];
			// return array ('status'=>0,'info'=>$appid.','.$appsecret);

			empty($code) && $this->error('参数错误');
			import('Common.Util.Login.wechat.WechatAuth');
			$sns = new \Common\Util\Login\wechat\WechatAuth($appid,$appsecret);
			$data['token'] = $sns->getAccessToken('code',$code);
			//$token = $token['access_token'];
			$data['info'] = $sns->getUserInfo($appid);
			return $data;
		}
	}
?>