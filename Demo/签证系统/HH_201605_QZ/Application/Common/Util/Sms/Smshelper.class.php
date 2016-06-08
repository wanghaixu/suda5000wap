<?php
	namespace Common\Util\Sms;
	class Smshelper {
		private $config;
		private $data;
		//$data:array('mobile' => '电话','msg' => '信息内容');
		public function __construct($config,$data){
			$this->config = $config;    //传递配置
			$this->data = $data;		//传递数据
		}
		/**
		 * 发送短信
		 *
		 * @param string $needstatus 是否需要状态报告
		 * @param string $product 产品id，可选
		 * @param string $extno   扩展码，可选
		 */
		public function sendSMS($needstatus = 'false', $product = '', $extno = '') {
			//创蓝接口参数
			$postArr = array (
				'account' => $this->config['api_account'],
				'pswd' => $this->config['api_password'],
				'msg' => $this->data['msg'],
				'mobile' => $this->data['mobile'],
				'needstatus' => $needstatus,
				'product' => $product,
				'extno' => $extno
			);
			
			$result = $this->curlPost( $this->config['api_send_url'] , $postArr);
			$result = $this->execResult($result);
			return $result;
		}
		
		/**
		 * 查询额度
		 *
		 *  查询地址
		 */
		public function queryBalance() {
			//查询参数
			$postArr = array ( 
				'account' => $this->config['api_account'],
				'pswd' => $this->config['api_password'],
			);
			$result = $this->curlPost($this->config['api_balance_query_url'], $postArr);
			return $result;
		}

		/**
		 * 处理返回值
		 * 
		 */
		public function execResult($result){
			$result=preg_split("/[,\r\n]/",$result);
			return $result;
		}

		/**
		 * 通过CURL发送HTTP请求
		 * @param string $url  //请求URL
		 * @param array $postFields //请求参数 
		 * @return mixed
		 */
		private function curlPost($url,$postFields){
			ob_clean();
			$postFields = http_build_query($postFields);
			$ch = curl_init ();
			curl_setopt ( $ch, CURLOPT_POST, 1 );
			curl_setopt ( $ch, CURLOPT_HEADER, 0 );
			curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
			curl_setopt ( $ch, CURLOPT_URL, $url );
			curl_setopt ( $ch, CURLOPT_POSTFIELDS, $postFields );
			$result = curl_exec ( $ch );
			curl_close ( $ch );
			return $result;
		}
	}
?>