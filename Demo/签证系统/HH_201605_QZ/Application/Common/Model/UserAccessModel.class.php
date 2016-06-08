<?php
namespace Common\Model;
use Think\Model;
class UserAccessModel extends Model {
	protected $autoCheckFields = false;
	//管理员添加
	public function add(){
		if (!$_POST['username']) {
            return array('status' => 0, 'info' => "请输入登录账号");
        }
        $datas = array();
		
        $M = M("User");
        $datas['u_username'] = trim($_POST['username']);
		
        if ($M->where("`u_username`='" . $datas['u_username'] . "'")->count() > 0) {
            return array('status' => 0, 'info' => "已经存在该账号");
        }
		if(I('post.pwd') != I('post.cfm_password')){
			 return array('status' => 0, 'info' => "密码与确认密码不一致");
		}
		
        $datas['u_pwd'] = user_md5(trim($_POST['pwd']));
		//$datas['u_type'] = 2;
		$datas['g_id'] = $_POST['g_id'];
		$datas['status'] = $_POST['status'];
		$datas['g_code'] = $_POST['g_code'];
		//$datas['remark'] = htmlspecialchars(trim($_POST['remark']));
        $datas['create_time'] = time();
		
        if ($user_id = $M->add($datas)) {
			foreach($_POST['role'] as $key => $val){
				M("role_user")->add(array('user_id' => $user_id, 'role_id' => (int) $val));
			}
            return array('status' => 1, 'info' => "账号已开通", 'url' => U("System/index"));
        } else {
            return array('status' => 0, 'info' => "添加新账号失败，请重试");
        }
	}

	//管理员编辑
	public function edit(){
		//pre($_POST);DIE;
		$info = 0;
		$datas = array();		
        $M = M("User");

		if(I('post.pwd') != I('post.cfm_password')){
			 return array('status' => 0, 'info' => "密码与确认密码不一致");
		}
		if(I('post.pwd')){	
			$datas['u_pwd'] = user_md5(trim($_POST['pwd']));
		}
		//$datas['u_type'] = 2;
		$datas['status'] = $_POST['status'];
		if(!empty($_POST['role'])){
			M("role_user")->where(array('user_id' => $_POST['id']))->delete();
			foreach($_POST['role'] as $key => $val){
				M("role_user")->add(array('user_id' => $_POST['id'], 'role_id' => (int) $val));
			}
			$info = 1;
		}
        if ($M->where(array('u_id' => $_POST['id']))->save($datas)) {			
            return array('status' => 1, 'info' => "修改成功", 'url' => U("System/index"));
        } else {
			if($info){
				return array('status' => 1, 'info' => "修改成功", 'url' => U("System/index"));
			}else{
				return array('status' => 0, 'info' => "修改失败，请重试");
			}
        }
	}

	//管理员禁用
	public function ban($id){
		$where['u_id'] = array(in,$id);
		if(M('user')->where($where)->setField('status',0)){
			$data['status'] = 1;
			$data['info'] = '禁用成功';
		}else{
			$data['status'] = 0;
			$data['info'] = '禁用失败';
		}
		return $data;
	}

	//管理员启用
	public function awaken($id){
		$where['u_id'] = array(in,$id);
		if(M('user')->where($where)->setField('status',1)){
			$data['status'] = 1;
			$data['info'] = '启用成功';
		}else{
			$data['status'] = 0;
			$data['info'] = '启用失败';
		}
		return $data;
	}

	//管理员删除
	public function del($id){
		$where['u_id'] = array(in,$id);
		if(M('user')->where($where)->delete()){
			$map['user_id'] = array(in,$id);
			M('role_user')->where($map)->delete();
			$data['status'] = 1;
			$data['info'] = '删除成功';
		}else{
			$data['status'] = 0;
			$data['info'] = '删除失败';
		}
		return $data;
	}
}

?>
