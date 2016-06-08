<?php
namespace Admin\Controller;
use Think\Controller;
class LogController extends CommonController {
	
	/**
	 * 操作记录
	 */
    public function index()
    {
    	$get = I('get.');
    	if ($get['uid']) $map['u_id'] = array('like','%'.$get['uid'].'%');
    	if ($get['ip']) $map['log_ip'] = array('like','%'.$get['ip'].'%');
    	if (empty($get['start'])) $get['start'] = date('Y-m-d',0);
    	if (empty($get['end']))   $get['end']   = date('Y-m-d',NOW_TIME);
    	$map['log_time'] = array('BETWEEN',array(strtotime($get['start']),strtotime($get['end'])+86399));

		$this->_list(M('log'),$map,'log_key desc');
		$this->display();
    }
}