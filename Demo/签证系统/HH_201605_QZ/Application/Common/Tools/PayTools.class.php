<?php
namespace Common\Tools;
class PayTools{
    static private  $_instance = null;
	public function get_pay($name,$config,$data){
		$class = 'Common\\Util\\Pay\\'.ucwords(strtolower($name));
		if(class_exists($class)){
             self::$_instance = new $class($config,$data);
        }else{
            // 类没有定义
            E(L('_NO_DB_DRIVER_').': ' . $class);
        }
		return self::$_instance;
	}
}