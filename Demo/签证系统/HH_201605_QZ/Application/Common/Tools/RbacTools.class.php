<?php
namespace Common\Tools;
use Common\Util\Rbac;
class RbacTools{
	private static $_instance;
	public static function getInstance(){
		if(!(self::$_instance instanceof Rbac)){
			self::$_instance = new Rbac;
		}
		return self::$_instance;
	}

	public function check_url($url)
	{
	    if (session(C('ADMIN_AUTH_KEY'))) return true;  //超级管理员免验证权限
	    $url = explode('/', $url);
	    if(empty($url[0])) unset($url[0]);
	    switch (count($url)) {
	        case 3:
	            $appName        =$url[0];
	            $controllerName =$url[1];
	            $actionName     =$url[2];
	            break;
	        case 2:
	            $appName        =MODULE_NAME;
	            $controllerName =$url[1];
	            $actionName     =$url[0];
	            break;
	        case 1:
	            $appName        =MODULE_NAME;
	            $controllerName =CONTROLLER_NAME;
	            $actionName     =$url[0];
	            break;
	        default :
	            $appName        =MODULE_NAME;
	            $controllerName =CONTROLLER_NAME;
	            $actionName     =ACTION_NAME;
	            break;
	    }
	    if(self::getInstance()->AccessDecision($appName,$controllerName,$actionName))
	        return false;
	    return true;
	}

}