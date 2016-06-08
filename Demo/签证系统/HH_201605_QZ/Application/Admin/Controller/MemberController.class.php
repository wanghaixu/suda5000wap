<?php
namespace Admin\Controller;
use Think\Controller;
use Common\Util\File;
class MemberController extends CommonController {
	//客户列表
	public function index(){
		$get = I('get.');
		isset($get['keyword1']) && $map['mem_name'] = array('like','%'.$get['keyword1'].'%');
		isset($get['keyword2']) && $map['mem_code'] = array('like','%'.$get['keyword2'].'%');
		isset($get['keyword3']) && $map['mem_mobile'] = array('like','%'.$get['keyword3'].'%');
		$this->_list(M('Member'),$map,'mem_id desc');
		$this->display();
	}

	//录入客户
	public function add(){
		if(IS_POST){
			$post = I('post.');
			$post['or_create_uid'] = session('user_info.u_id');
			$this->ajaxReturn(D('Common/Member')->add_mem($post));
		}else{
			$this->display();
		}
	}

	//客户删除
	public function del(){
		if(IS_AJAX){
			$mem_id = trim(I('post.mem_id'),',');
			$this->ajaxReturn(D('Common/Member')->del($mem_id));
		}
	} 

	//客户编辑
	public function edit(){

		if(IS_POST){
			$post = I('post.');
			$this->ajaxReturn(D('Common/Member')->edit_mem($post));
		}else{
			$get = I('get.');
			$map['mem_id'] = $get['id'];
			$this->info = M('Member')->where($map)->find();
			$this->display('add');
		}
	}

	//导入客户
	public function import(){
		if(IS_POST){
			$data = D('Common/Member')->import();
			$this->data = $data;
			$this->display('confirm');
		}else{
			$this->display();
		}
	}
	
	//确认导入
    public function submit()
    {   
        if(IS_POST){
            $data = I('post.');
            $result = D('Member')->submit($data);
            $info = 'member表成功'.$result['memSuccess'].'条,'.'失败'.$result['memFaile'].'条,'.'身份证或者护照号码重复'.$result['memRepate'].'条';
            if($result){
                $this->ajaxReturn(array('status'=>1,'info'=>$info,'url'=>U('index')));
            }else{
                $this->ajaxReturn(array('status'=>0,'info'=>$info,'url'=>U('import')));
            }  
        }
    }

    //跟进记录
    public function follow(){
    	$get = I('get.');
    	$start_time = empty($get['start_time'])? (NOW_TIME-2592000):strtotime($get['start_time']);
	    $start = get_day($start_time);
		$end_time = empty($get['end_time'])? (NOW_TIME):strtotime($get['end_time']);
		$end = get_day($end_time);
		if($start_time>$end_time){
			$this->error('开始时间不能大于结束时间');
		}
		$map['mf_time'] = array('between',array($start_time,$end_time));
    	!empty($get['id']) && $map['mem_id'] = $get['id'];
    	$this->_list(VM('MemberFollow'),$map,'mf_time desc');
    	$this->display();
    }

    //添加跟进记录
    public function followAdd(){
    	if(IS_POST){
    		$post = I('post.');
    		$post['mem_id'] = I('get.id');
    		$post['u_id'] = session('user_info.u_id');
    		$this->ajaxReturn(D('Common/Member')->add_follow($post));
    	}else{
    		$this->display();
    	}
    }

    //跟进详情
    public function followDetail(){
    	$mf_id = I('get.id');
		$map['mf_id'] = $mf_id;
		$this->follow = VM('MemberFollow')->where($map)->find();
		$this->display();
    }

    //编辑跟进记录
    public function followEdit(){
    	if(IS_POST){
    		$post = I('post.');
			$this->ajaxReturn(D('Common/Member')->edit_follow($post));
    	}else{
    		$get = I('get.');
    		$map['mf_id'] = $get['id'];
			$this->info = M('member_follow')->where($map)->find();
    		$this->display('followAdd');
    	}
    }
    //删除跟进记录
    public function followDel(){
    	if(IS_AJAX){
			$mf_id = trim(I('post.mf_id'),',');
			$this->ajaxReturn(D('Common/Member')->del_follow($mf_id));
		}
    }
}