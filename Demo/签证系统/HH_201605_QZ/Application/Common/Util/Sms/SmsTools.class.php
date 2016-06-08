<?php
namespace Common\Tools;
class SmsTools{
    static private  $_instance = null;
	public function get_obj($name,$config,$data){
		$class = 'Common\\Util\\Sms\\'.ucwords(strtolower($name));
		//return $class;
		if(class_exists($class)){
             self::$_instance = new $class($config,$data);
        }else{
            // 类没有定义
            E(L('_NO_DB_DRIVER_').': ' . $class);
        }
		return self::$_instance;
	}
}