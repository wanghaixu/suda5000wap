<?php
namespace Admin\Controller;
use Think\Controller;
class InfoController extends Controller{
	/**
     * 修改个人信息
     */
    public function user_info(){
    	if (IS_POST) {
    		$u_id = session('user_info.u_id');
    		$post = I('post.');
    		$user = array(
				'u_id'   => $u_id,
				'u_mobile'=> $post['u_mobile'],
				'last_update_id'=>$u_id,
				'last_update_time'=>NOW_TIME,
			);
    		if (false===M('User')->save($user)) 
                $this->ajaxReturn(array('status'=>0,'info'=>'修改失败！请刷新页面重试。'));
    		$this->ajaxReturn(array('status'=>1,'info'=>'修改成功！'));
    	}else{
	    	$map['u_id'] = session('user_info.u_id');
		    $this->info = M('User')->where($map)->find();
	    	$this->display();
    	}
    }

    public function password(){
    	if (IS_POST) {
            $u_id = session('user_info.u_id');
    		$post = I('post.');
    		$this->ajaxReturn(D('User')->password($u_id,$post['old_pwd'],$post['new_pwd']));
    	}else{
    	$this->display();

    	}
    }
    

}