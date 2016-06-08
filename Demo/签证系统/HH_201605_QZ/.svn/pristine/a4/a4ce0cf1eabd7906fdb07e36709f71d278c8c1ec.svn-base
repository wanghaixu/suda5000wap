<?php
namespace Common\Tools;
class LogTools{
	//单例
	private static $_instance;
	public static function getInstance(){
		if(!(self::$_instance instanceof self)){
			self::$_instance = new self;
		}
		return self::$_instance;
	}

	public function write($type=0)
	{
		$write_arr = $this->get_write_arr();

		$m = strtoupper(MODULE_NAME);
		$c = strtoupper(CONTROLLER_NAME);
		$a = strtoupper(ACTION_NAME);
		$rm= strtoupper(REQUEST_METHOD);
		$key = $m.'/'.$c.'/'.$a;
		if ($rm!='GET') $key .='/'.$rm;

		if ((empty($write_arr[$key])&&$type==1)||$write_arr[$key]) {
			$data = array(
				'u_id' 	=> get_u_key(), 
				'log_ip' 	=> get_client_ip(), 
				'log_time' 	=> NOW_TIME, 
				'log_code' 	=> empty($write_arr[$key])? 0:$write_arr[$key],
				'log_url' 	=> get_url(), 
			);
			M('log')->add($data);
		}
	}

	public function read($code)
	{
		$read_arr = $this->get_read_arr();
		if (empty($read_arr[$code])) return '-';
		return $read_arr[$code];
	}
	//获取编译的array
	protected function get_read_arr()
	{
		$read_arr = S("LOG_READ_ARR");
		if (!empty($read_arr)) return $read_arr;

		$config = $this->config;
		foreach ($config as $k => $v) {
			$read_arr[$k] = $v['content'];
		}
		S("LOG_READ_ARR",$read_arr);
		return $read_arr;
	}


	//获取写入的array
	protected function get_write_arr()
	{
		$write_arr = S("LOG_WRITE_ARR");
		if (!empty($write_arr)) return $write_arr;

		$config = $this->config;
		foreach ($config as $k => $v) {
			$key = strtoupper($v['url']);
			$write_arr[$key] = $k;
		}
		S("LOG_WRITE_ARR",$write_arr);
		return $write_arr;
	}

	private $config = array(
		array(
				'content' => '普通访问', 
			),
		array(
				'url' => 'ADMIN/INDEX/INDEX', 
				'content' => '普通访问', 
			),
		array(
				'url' => 'ADMIN/PUBLIC/LOGIN', 
				'content' => '拉拉啦', 
			),
		array(
				'url' => 'ADMIN/PUBLIC/LOGIN/POST', 
				'content' => '登陆', 
			),
	);
}