<?php 
namespace Common\VModel;
use Think\Model\ViewModel;

class UserLeaveVModel extends ViewModel {
	public $viewFields = array(
		'UserLeave' => array('*'),
		'User' => array('*','_on'=>'UserLeave.u_id=User.u_id'),
	);
}