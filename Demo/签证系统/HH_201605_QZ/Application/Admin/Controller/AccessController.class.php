<?php
namespace Admin\Controller;
use Think\Controller;
class AccessController extends CommonController {
	 /**
     * 管理员
     */
    public function index() {
		//$list = D("Common/Admin")->adminList();
        $this->assign("list", D("Common/Admin")->adminList());
        $this->display();
    }

    public function add_admin() {
        if (IS_POST) {
            header('Content-Type:application/json; charset=utf-8');
            $this->ajaxReturn(D("Common/Admin")->addAdmin());
        } else {
            $role_id = M('role')->where(array('pid' => 1,'status' => 1))->select();
            $role = M('role')->where(array('status' => 1))->select();
            foreach($role_id as $key => $val){
            $role_id[$key]['child'] = $this->findChild($role,$val['id']);
        }
        $this->role = $role_id;
            $this->display();
        }
    }

    public function edit_admin() {
        if (IS_POST) {
            header('Content-Type:application/json; charset=utf-8');
            $this->ajaxReturn(D("Common/Admin")->editAdmin());
        } else {
            $M = M("User");
            $aid = (int) $_GET['aid'];
            $pre = C("DB_PREFIX");
            //$info = $M->where("`u_key`=" . $aid)->join($pre . "role_user ON " . $pre . "user.u_key = " . $pre . "role_user.user_id")->find();
            $info = $M->where("`u_id`=" . $aid)->find();
            if (empty($info['u_id'])) {
                $this->error("不存在该管理员ID", U('Access/index'));
            }
            if ($info['u_username'] == C('ADMIN_AUTH_KEY')) {
                $this->error("超级管理员信息不允许操作", U("Access/index"));
                exit;
            }

            //角色列表
            $role_id = M('role')->where(array('pid' => 1,'status' => 1))->select();
            $role = M('role')->where(array('status' => 1))->select();
            foreach($role_id as $key => $val){
                $role_id[$key]['child'] = $this->findChild($role,$val['id']);
            }
            $this->role = $role_id;

            //已有角色id
            $roleId = M('role_user')->where(array('user_id' => $aid))->getField('role_id',true);
            $this->assign('role_id',$roleId);

            $this->info = M('user')->where(array('u_id' => $aid))->find();

            $this->display("add_admin");
        }
    }

    //管理员列表删除
    public function del(){
        $id = $_POST['id'];
        $data = D("Common/Admin")->del($id);
        $this->ajaxReturn($data);
    }

    //管理员启用
    public function awaken(){
        $id = $_POST['id'];
        $data = D("Common/Admin")->awaken($id);
        $this->ajaxReturn($data);
    }

    //管理员禁用
    public function ban(){
        $id = $_POST['id'];
        $data = D("Common/Admin")->ban($id);
        $this->ajaxReturn($data);
    }

	/*-------------------------角色--------------------------*/
	/**
     * 角色管理
     */
    public function role_list() {
        $this->assign("list", D("Common/Role")->roleList());
        $this->display();
    }

    public function add_role() {
        if (IS_POST) {
            header('Content-Type:application/json; charset=utf-8');
            $this->ajaxReturn(D("Common/Role")->addRole());
        } else {
            $this->assign("info", $this->getRole());
            $this->display();
        }
    }

    public function edit_role() {
        if (IS_POST) {
            header('Content-Type:application/json; charset=utf-8');
            $this->ajaxReturn(D("Common/Role")->editRole());
        } else {
            $M = M("Role");
            $info = $M->where("id=" . (int) $_GET['id'])->find();
            if (empty($info['id'])) {
                $this->error("不存在该角色", U('Access/role_list'));
            }
            $this->assign("info", $this->getRole($info));
            $this->display("add_role");
        }
    }

    //角色授权
    public function change_role() {
        header('Content-Type:application/json; charset=utf-8');
        if (IS_POST) {
            $this->ajaxReturn(D("Common/Role")->changeRole());
        } else {
            $M = M("Node");
            $info = M("Role")->where("id=" . (int) $_GET['id'])->find();
            if (empty($info['id'])) {
                $this->error("不存在该用户组", U('Access/role_list'));
            }
            $access = M("Access")->field("CONCAT(`node_id`,':',`level`,':',`pid`) as val")->where("`role_id`=" . $info['id'])->select();
            $info['access'] = count($access) > 0 ? json_encode($access) : json_encode(array());
            $this->assign("info", $info);
            $datas = $M->where("level=1")->select();
            foreach ($datas as $k => $v) {
                $map['level'] = 2;
                $map['pid'] = $v['id'];
                $datas[$k]['data'] = $M->where($map)->select();
                foreach ($datas[$k]['data'] as $k1 => $v1) {
                    $map['level'] = 3;
                    $map['pid'] = $v1['id'];
                    $datas[$k]['data'][$k1]['data'] = $M->where($map)->select();
                }
            }
            $this->assign("nodeList", $datas);
            $this->display();
        }
    }

	//角色删除
	public function role_del(){
		$id = $_POST['id'];
		$ids = explode(',',$id);
		$cate = M('role')->select();
		foreach($ids as $key => $val){
			$role_id = $this->getChild($cate,$val);
			array_push($role_id,$val);
			$where['id'] = array('in',$role_id);
			if(!M('role')->where($where)->delete()){
				$this->ajaxReturn(array('status' => 0,'info' => '删除失败'));
			}
		}
		$this->ajaxReturn(array('status' => 1,'info' => '删除成功'));
	}

	//角色禁用
	public function role_ban(){
		$id = $_POST['id'];
		$ids = explode(',',$id);
		$cate = M('role')->select();
		foreach($ids as $key => $val){
			$role_id = $this->getChild($cate,$val);
			array_push($role_id,$val);
			$where['id'] = array('in',$role_id);
			if(!M('role')->where($where)->setField('status',0)){
				$this->ajaxReturn(array('status' => 0,'info' => '禁用失败'));
			}
		}
		$this->ajaxReturn(array('status' => 1,'info' => '禁用成功'));
	}

	//角色开启
	public function role_awaken(){
		$id = $_POST['id'];
		$ids = explode(',',$id);
		$cate = M('node')->select();
		foreach($ids as $key => $val){
			$role_id = $this->getChild($cate,$val);
			array_push($role_id,$val);
			$where['id'] = array('in',$role_id);
			if(!M('role')->where($where)->setField('status',1)){
				$this->ajaxReturn(array('status' => 0,'info' => '开启失败'));
			}
		}
		$this->ajaxReturn(array('status' => 1,'info' => '开启成功'));
	}

	/*-----------------节点----------------*/
	/**
     * 节点管理
     */
    public function nodelist() {
        $this->assign("list", D("Common/Node")->nodeList());
        $this->display();
    }

    public function addnode() {
        if (IS_POST) {
            header('Content-Type:application/json; charset=utf-8');
            $this->ajaxReturn(D("Common/Node")->addNode());
        } else {
            $this->assign("info", $this->getPid(array('level' => 1)));
            $this->display();
        }
    }

    public function editnode() {
        if (IS_POST) {
            header('Content-Type:application/json; charset=utf-8');
            $this->ajaxReturn(D("Common/Node")->editNode());
        } else {
            $M = M("Node");
            $info = $M->where("id=" . (int) $_GET['id'])->find();
            if (empty($info['id'])) {
                $this->error("不存在该节点", U('Access/node_list'));
            }
            $this->assign("info", $this->getPid($info));
            $this->display("add_node");
        }
    }

    //节点删除
    public function node_del(){
        $id = $_POST['id'];
        $ids = explode(',',$id);
        $cate = M('node')->select();
        foreach($ids as $key => $val){
            $role_id = $this->getChild($cate,$val);
            array_push($role_id,$val);
            $where['id'] = array('in',$role_id);
            if(!M('node')->where($where)->delete()){
                $this->ajaxReturn(array('status' => 0,'info' => '删除失败'));
            }
        }
        $this->ajaxReturn(array('status' => 1,'info' => '删除成功'));
    }

    //节点禁用
    public function node_ban(){
        $id = $_POST['id'];
        $ids = explode(',',$id);
        $cate = M('node')->select();
        foreach($ids as $key => $val){
            $role_id = $this->getChild($cate,$val);
            array_push($role_id,$val);
            $where['id'] = array('in',$role_id);
            if(!M('node')->where($where)->setField('status',0)){
                $this->ajaxReturn(array('status' => 0,'info' => '禁用失败'));
            }
        }
        $this->ajaxReturn(array('status' => 1,'info' => '禁用成功'));
    }

    //节点开启
    public function node_awaken(){
        $id = $_POST['id'];
        $ids = explode(',',$id);
        $cate = M('node')->select();
        foreach($ids as $key => $val){
            $role_id = $this->getChild($cate,$val);
            array_push($role_id,$val);
            $where['id'] = array('in',$role_id);
            if(!M('node')->where($where)->setField('status',1)){
                $this->ajaxReturn(array('status' => 0,'info' => '开启失败'));
            }
        }
        $this->ajaxReturn(array('status' => 1,'info' => '开启成功'));
    }

	//自动添加结点
    public function auto_node() {
        if (IS_GET) {
            if(I("get.module")){
                $module=I("get.module");
            }  else {
                $module="Admin";
            }
            $dir = $_SERVER['DOCUMENT_ROOT'].__ROOT__.'/Application/'.$module.'/Controller/';
            clearstatcache();
            $temp = D('Common/Access')->getAllNode($dir, $module);
            if ($temp == false) {
                die("请检查项目名是否正确！");
            }
            $allNode = array();
            foreach ($temp as $k => $v) {
                if (empty($v)) continue;
                $allNode[$k]['level'] = 2;
                $allNode[$k]['name'] = $k;
                $allNode[$k]['path'] = $module.'/'.$k;
                foreach ($v as $key => $value) {
                    if (empty($value)) continue;
                    $child['level'] = 3;
                    $child['name'] = $value;
                    $child['path'] = $allNode[$k]['path'].'/'.$value;
                    $allNode[$k]['child'][] = $child;
                }
            }
            $this->assign("module", $module);
            $this->assign("info", $allNode);
            $this->assign("node", D('Common/Access')->getNowNode());
            $this->display();
        }
        if (IS_POST) {
            $M = M("node");
            //获取分组节点
            $data['name'] = I('post.module');
            $data['pid'] = 0;
            $data['level'] = 1;
            $data['status'] = 1;
            $module_id = $M->where($data)->getField("id");
            !$module_id && $module_id = $M->add($data); //如果表里没有就写入数据 并获取返回的id
            unset($data);
            $data = I('post.data');
            foreach ($data as $k1 => $v1) {
                if ($v1['title']) {
                    $f_save = array(
                        'title' => $v1['title'], 
                        'name' => $v1['name'], 
                        'level' => 2, 
                        'status' => $v1['status'], 
                        'sort' => $v1['sort'], 
                        'remark' => $v1['remark'], 
                        'pid' => $module_id, 
                    );
                    //有则修改无则添加
                    if ($v1['id']) {
                        $c_id = $v1['id'];
                        $f_save['id'] = $v1['id'];
                        $M->save($f_save);
                    }else{
                        $c_id = $M->add($f_save);
                    }
                    unset($f_save);

                    foreach ($v1['child'] as $k2 => $v2) {
                        if ($v2['title']) {
                            $f_save = array(
                                'title' => $v2['title'], 
                                'name' => $v2['name'],
                                'level' => 3, 
                                'status' => $v2['status'], 
                                'sort' => $v2['sort'], 
                                'remark' => $v2['remark'], 
                                'pid' => $c_id, 
                            );
                            if ($v2['id']) {
                                $f_save['id'] = $v2['id'];
                                $M->save($f_save);
                            }else{
                                $M->add($f_save);
                            }
                        }
                    }
                }
            }
            $this->ajaxReturn(array("status" => 1, "info" => '处理完成', "url" => U("Access/auto_node")));
        }
    }

	/*--------------公用-----------------*/
	private function getPid($info) {
        $arr = array("请选择", "项目", "模块", "操作");
        for ($i = 1; $i < 4; $i++) {
            $selected = $info['level'] == $i ? " selected='selected'" : "";
            $info['levelOption'].='<option value="' . $i . '" ' . $selected . '>' . $arr[$i] . '</option>';
        }
        $level = $info['level'] - 1;
        import("Category");
        $cat = new \Org\Util\Category('Node', array('id', 'pid', 'title', 'fullname'));
        $list = $cat->getList();               //获取分类结构
        $option = $level == 0 ? '<option value="0" level="-1">根节点</option>' : '<option value="0" disabled="disabled">根节点</option>';
        foreach ($list as $k => $v) {
            $disabled = $v['level'] == $level ? "" : ' disabled="disabled"';
            $selected = $v['id'] != $info['pid'] ? "" : ' selected="selected"';
            $option.='<option value="' . $v['id'] . '"' . $disabled . $selected . '  level="' . $v['level'] . '">' . $v['fullname'] . '</option>';
        }
        $info['pidOption'] = $option;
        return $info;
    }

    //获取子类
    private function findChild($cate,$pid){
        $arr=array();
        foreach($cate as $k => $v){
            if($v['pid'] == $pid){
                $arr[$k]['id']=$v['id'];
                $arr[$k]['name']=$v['name'];
                $arr=array_merge($arr,$this->findChild($cate,$v['id']));
            }
        }
        return $arr;
    }

	//获取子类id
	private function getChild($cate,$pid){
        $arr=array();
        foreach($cate as $k => $v){
            if($v['pid'] == $pid){
                $arr[]=$v['id'];
                $arr=array_merge($arr,$this->getChild($cate,$v['id']));
            }
        }
        return $arr;
    }

	private function getRole($info = array()) {
        import("Org.Util.Category");
        $cat = new \Org\Util\Category('Role', array('id', 'pid', 'name'));
        $list = $cat->getList();               //获取分类结构

        foreach ($list as $k => $v) {
            $disabled = $v['id'] == $info['id'] ? ' disabled="disabled"' : "";
            $selected = $v['id'] == $info['pid'] ? ' selected="selected"' : "";
            $info['pidOption'].='<option value="' . $v['id'] . '"' . $selected . $disabled . '>' . $v['fullname'] . '</option>';
        }
        return $info;
    }
}