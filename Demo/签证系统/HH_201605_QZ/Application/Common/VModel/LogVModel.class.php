<?php
namespace Common\VModel;
use Think\Model\ViewModel;
class LogVModel extends ViewModel{
    public $viewFields=array(
        'Log'=>array('*','_type'=>'left'),
        'User'=>array('*','_on'=>'Log.u_id=User.u_id','_type'=>'left'),
    );
}
?>