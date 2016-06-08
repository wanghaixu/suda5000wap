<?php
namespace Common\VModel;
use Think\Model\ViewModel;
class MemberFollowVModel extends ViewModel{
    public $viewFields=array(
        'MemberFollow'=>array('*'),
        'Member'=>array('*','_on'=>'MemberFollow.mem_id=Member.mem_id','_type'=>'left'),
        'User'=>array('*','_on'=>'User.u_id=MemberFollow.u_id'),
    );
}
?>