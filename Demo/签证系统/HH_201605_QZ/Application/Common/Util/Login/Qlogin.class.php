<?php
	namespace Common\Util\Login;
	class Qlogin {
		private $config;
		private $data;
		public function __construct($config,$data){
			$this->config = $config;    //传递配置
			$this->data = $data;		//传递数据
		}

		public function qqOAuthLogin() {
			import('Common.Util.Login.qq.ThinkOauth');
			$sns = \ThinkOauth::getInstance('QQ');
			//跳转到授权页面
			redirect($sns->getRequestCodeURL());
		}

		public function qq_return($code) {
			$type = "QQ";
			empty($code) && $this->error('参数错误');
			import('Common.Util.Login.qq.ThinkOauth');
			$sns = \ThinkOauth::getInstance($type);

			//腾讯微博需传递的额外参数
			$tokenArr = $sns->getAccessToken($code);
			return $tokenArr;
		}

	}
?>