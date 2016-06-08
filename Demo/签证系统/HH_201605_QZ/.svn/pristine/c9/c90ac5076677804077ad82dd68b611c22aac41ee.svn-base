<?php
	namespace Common\Util\Login;
	class Alogin {
		private $config;
		private $data;
		//$data:array('return_url' => '回调地址')
		public function __construct($config,$data){
			//支付宝配置
			//$config = C("OAuthLogin.alipay");
			$this->config = $config;
			$this->config['sign_type'] = strtoupper('MD5');
			$this->config['input_charset'] = strtolower('utf-8');
			$this->config['cacert'] = getcwd().'\\Common\\Util\\login\\alipay\\cacert.pem';
			$this->config['transport'] = 'http';

			$this->data = $data;
		}

		/**
		 * 支付宝登陆
		 * @param  [string] $return_url            [跳转的URL地址]
		 * 
		 * @return [string] $html_text             [跳转页面HTMl]
		 */
		public function zLogin(){

			//构造要请求的参数数组，无需改动
			$parameter = array(
				"service" => "alipay.auth.authorize",
				"partner" => trim($this->config['partner']),
				"target_service"    => "user.auth.quick.login",
				"return_url"    => $this->data['return_url'],
				"anti_phishing_key" => "",
				"exter_invoke_ip"   => get_client_ip(),
				"_input_charset"    => trim(strtolower($this->config['input_charset']))
			);
			//建立请求
			import('Common.Util.Login.alipay.lib.alipay_submit');
			$alipaySubmit = new \AlipaySubmit($this->config);
			$html_text = $alipaySubmit->buildRequestForm($parameter,"post", "请稍候，正在跳转至付款页面");
			return $html_text;  
		}


		/**
		 * 支付宝登陆回调验证
		 * 
		 * @return [bool]
		 */
		public function alipayLoginReturn() {
			import('Common.Util.Login.alipay.lib.alipay_notify');
			$alipayNotify = new \AlipayNotify($this->config);
			$verify_result = $alipayNotify->verifyReturn();
			if($verify_result) {
				return true;
			}else{
				return false;
			}
		}
	}
?>