<?php
namespace Admin\Controller;
use Think\Controller;

/**
 * 用户控制器;
 */
class UserController extends CommonController {

	/**
	 * 用户列表;
	 */
	public function index () {
		$data = I('get.', '', 'trim');
		$page = empty($data['p']) ? 1 : $data['p'];
		$map_user = array();
		if ($data['keyword'] != '') {
			$keyword = '%'.$data['keyword'].'%';
			$search['u_name'] = array('like', $keyword);
			$search['u_username'] = array('like', $keyword);
			$search['u_mobile'] = array('like', $keyword);
			$search['u_ename'] = array('like', $keyword);
			$search['_logic'] = 'or';
			$map_user['_complex'] = $search;
		}
		if ($data['leave'] != '') {
			$map_user['u_leave'] = $data['leave'];
			$data['leave'] = 1+$data['leave'];
		}
		if ($data['role'] != '') {
			$map_user['u_role'] = $data['role'];
		}
		$m_user = M('User');
		$count = $m_user->where($map_user)->count();
		$users = $m_user->where($map_user)->page($page,20)->select();
		$pager = new \Think\Page($count, 20);
		$show = $pager->show();
		$role = role2str();
		$this->assign('role',$role);
		$this->assign('show', $show);
		$this->assign('data', $data);
		$this->assign('users', $users);
		$this->assign('leave', array('0'=>'请假', '1'=>'正常'));
		$this->display();
	}

	/**
	 * 添加员工;
	 */
	public function add() {
		if (IS_POST) {
			$user = I('post.', '', 'trim');
			$this->ajaxReturn(D('User')->addUser($user));
		} else {
			$role = role2str();
			$this->assign('role',$role);
			$this->display();
		}
	}
	public function edit() {
		if (IS_POST) {
			$user = I('post.', '', 'trim');
			$this->ajaxReturn(D('User')->editUser($user));
		} else {
			$u_id = I('get.u_id', '', 'trim');
			$map_user['u_id'] = array('EQ', $u_id);
			$user = M('User')->where($map_user)->find();
			$role = role2str();
			$this->assign('user', $user);
			$this->assign('role',$role);
			$this->display();
		}
	}

	/**
	 * 请假;
	 */
	public function leave() {
		if (IS_POST) {
			$id = I('post.id', '', 'trim');
			if ($id == '') {
				$this->ajaxReturn(array('status'=>0, 'info'=>'请假失败'));
			} else {
				$this->ajaxReturn(D('User')->leave($id));
			}
		} else {
			$this->ajaxReturn(array('status'=>0, 'info'=>'请假失败'));
		}
	}

	/**
	 * 结束请假;
	 */
	public function leaveClose() {
		if (IS_POST) {
			$id = I('post.id', '', 'trim');
			if (empty($id)) {
				$this->ajaxReturn(array('status'=>0, 'info'=>'结束请假失败'));
			} else {
				$this->ajaxReturn(D('User')->leaveClose($id));
			}
		} else {
			$this->ajaxReturn(array('status'=>0, 'info'=>'结束请假失败'));
		}
	}

	/**
	 * 启用；
	 */
	public function enable(){
		if (IS_POST) {
			$id = I('post.id', '', 'trim');
			if (empty($id)) {
				$this->ajaxReturn(array('status'=>0, 'info'=>'启用失败'));
			} else {
				$data = array('u_id'=>$id, 'u_status'=>1);
				if (M('User')->save($data)) {
					$this->ajaxReturn(array('status'=>1, 'info'=>'启用成功'));
				} else {
					$this->ajaxReturn(array('status'=>0, 'info'=>'启用失败'));
				}
			}
		} else {
			$this->ajaxReturn(array('status'=>0, 'info'=>'启用失败'));
		}
	}

	/**
	 * 禁用;
	 */
	public function disable(){
		if (IS_POST) {
			$id = I('post.id', '', 'trim');
			if (empty($id)) {
				$this->ajaxReturn(array('status'=>0, 'info'=>'禁用失败'));
			} else {
				$data = array('u_id'=>$id, 'u_status'=>0);
				if (M('User')->save($data)) {
					$this->ajaxReturn(array('status'=>1, 'info'=>'禁用成功'));
				} else {
					$this->ajaxReturn(array('status'=>0, 'info'=>'禁用失败'));
				}
			}
		} else {
			$this->ajaxReturn(array('status'=>0, 'info'=>'禁用失败'));
		}
	}

	/**
	 * 请假记录;
	 */
	public function leaveLog() {
		$data = I('get.', '', 'trim');
		$map_log['user.u_id'] = array('NEQ', 1);
		$keyword = htmlspecialchars($data['keyword']);
		if ($keyword != '') {
			$keyword = '%'.$keyword.'%';
			$search['u_name'] = array('like', $keyword);
			$search['_logic'] = 'or';
			$map_log['_complex'] = $search;
		}
		if ($data['role'] != '') {
			$map_log['u_role'] = array('EQ', $data['role']);
		}
		if (!empty($data['u_id'])) {
			$map_log['user.u_id'] = array('EQ', $data['u_id']);
		}
		$D_leave = D('Common/UserLeave', 'VModel');
		$logs = $D_leave->where($map_log)->page($data['p'], 25)->order('ul_sdate desc')->select();
		$count = $D_leave->where($map_log)->order('ul_sdate desc')->count();
		$pager = new \Think\Page($count, 25);
		$show = $pager->show();
		if ($logs !== false){
			$role = role2str();
			$this->assign('data', $data);
			$this->assign('show', $show);
			$this->assign('role', $role); 
			$this->assign('logs', $logs);
			$this->display();
		} else {
			header('Location:'.U('Admin/User/index'));
		}
	}

}