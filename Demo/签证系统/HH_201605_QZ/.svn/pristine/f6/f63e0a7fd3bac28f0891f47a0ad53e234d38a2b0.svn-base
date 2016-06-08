<?php
namespace Common\Model;
use Think\Model;
class AdminModel extends Model {
	protected $autoCheckFields = false;
    public function nodeList() {
        $cat = new \Org\Util\Category('Node', array('id', 'pid', 'title', 'fullname'));     
        $temp = $cat->getList();               //获取分类结构
        $level = array("1" => "项目（GROUP_NAME）", "2" => "模块(MODEL_NAME)", "3" => "操作（ACTION_NAME）");
        foreach ($temp as $k => $v) {
            $temp[$k]['statusTxt'] = $v['status'] == 1 ? "启用" : "禁用";
            $temp[$k]['chStatusTxt'] = $v['status'] == 0 ? "启用" : "禁用";
            $temp[$k]['level'] = $level[$v['level']];
            $list[$v['id']] = $temp[$k];
        }
        unset($temp);
        // p($list);
        return $list;
    }

    public function roleList() {
        $cat = new \Org\Util\Category('Role', array('id', 'pid', 'name','fullname'));      
        $temp = $cat->getList();
        //$M = M("Role");
        //$list = $M->select();
        foreach ($temp as $k => $v) {
            $temp[$k]['statusTxt'] = $v['status'] == 1 ? "启用" : "禁用";
            $temp[$k]['chStatusTxt'] = $v['status'] == 0 ? "启用" : "禁用";
            $list[$v['id']] = $temp[$k];
        }
        unset($temp);
        return $list;
    }

    public function opStatus($op = 'Node') {
        $M = M("$op");
        $datas['id'] = (int) $_GET["id"];
        $datas['status'] = $_GET["status"] == 1 ? 0 : 1;
        if ($M->save($datas)) {
            return array('status' => 1, 'info' => "处理成功", 'data' => array("status" => $datas['status'], "txt" => $datas['status'] == 1 ? "禁用" : "启动"));
        } else {
            return array('status' => 0, 'info' => "处理失败");
        }
    }

    public function editNode() {
        $M = M("Node");
        return $M->save($_POST) ? array('status' => 1, info => '更新节点信息成功', 'url' => U('Access/node_list')) : array('status' => 0, info => '更新节点信息失败');
    }

    public function addNode() {
        $M = M("Node");
        return $M->add($_POST) ? array('status' => 1, info => '添加节点信息成功', 'url' => U('Access/node_list')) : array('status' => 0, info => '添加节点信息失败');
    }

    /**
      +----------------------------------------------------------
     * 管理员列表
      +----------------------------------------------------------
     */
    public function adminList() {
        $list = M("User")->where('u_type=10')->select();
        foreach ($list as $k => $v) {
            $list[$k]['statusTxt'] = $v['status'] == 1 ? "启用" : "禁用";
        }
        return $list;
    }

    /**
      +----------------------------------------------------------
     * 添加管理员
      +----------------------------------------------------------
     */
    public function addAdmin() {
        if (!$_POST['mobile']) {
            //pre($_POST);die;
            return array('status' => 0, 'info' => "请输入手机号");
        }
        $datas = array();
        $M = M("User");
        $datas['u_mobile'] = trim($_POST['mobile']);
        if ($M->where("`u_mobile`='" . $datas['u_mobile'] . "'")->count() > 0) {
            return array('status' => 0, 'info' => "已经存在该账号");
        }
        $datas['u_pwd'] = user_md5(trim($_POST['pwd']));
        $datas['u_type'] = 20;
        $datas['u_remark'] = $_POST['remark'];
        $datas['status'] = $_POST['status'];
        //$datas['remark'] = htmlspecialchars(trim($_POST['remark']));
        $datas['create_time'] = time();
        if ($user_id = $M->add($datas)) {
            foreach($_POST['role'] as $key => $val){
                M("role_user")->add(array('user_id' => $user_id, 'role_id' => (int) $val));
            }
            $info = "账号已开通";
            return array('status' => 1, 'info' => $info, 'url' => U("Access/index"));
        } else {
            return array('status' => 0, 'info' => "添加新账号失败，请重试");
        }
    }

    /**
      +----------------------------------------------------------
     * 添加管理员
      +----------------------------------------------------------
     */
    public function editAdmin() {
        $M = M("User");
        if (!empty($_POST['pwd'])) {
            $_POST['pwd'] = user_md5(trim($_POST['pwd']));
            $datas['u_pwd'] = $_POST['pwd'];
        } else {
            unset($_POST['pwd']);
        }
        $user_id = (int) $_POST['id'];

        $datas['u_mobile'] = trim($_POST['mobile']);
        // $datas['u_id'] = $_POST['id'];
        $datas['status'] = $_POST['status'];
        $datas['u_remark'] = $_POST['remark'];
        $datas['u_type'] = $_POST['type'];
        //更新user_role表
        M("role_user")->where(array('user_id' => $user_id))->delete();
        foreach($_POST['role'] as $key => $val){
            $role_user_status = M("role_user")->add(array('user_id' => $user_id, 'role_id' => (int) $val));
        }
        
        //更新user表
        if ($M->save($datas)) {
            return array('status' => 1, 'info' => "成功更新");
        } else {
            if($role_user_status){
                return array('status' => 1, 'info' => "成功更新所属角色");
            }else{
                return array('status' => 0, 'info' => "更新失败，请重试");
            }
        }
    }

    /**
      +----------------------------------------------------------
     * 添加管理员
      +----------------------------------------------------------
     */
    public function editRole() {
        $M = M("Role");
        if ($M->save($_POST)) {
            return array('status' => 1, 'info' => "成功更新", 'url' => U("Access/role_list"));
        } else {
            return array('status' => 0, 'info' => "更新失败，请重试");
        }
    }

    /**
      +----------------------------------------------------------
     * 添加管理员
      +----------------------------------------------------------
     */
    public function addRole() {
        $M = M("Role");
        unset($_POST['id']);
        if ($M->add($_POST)) {
            return array('status' => 1, 'info' => "成功添加", 'url' => U("Access/role_list"));
        } else {
            return array('status' => 0, 'info' => "添加失败，请重试");
        }
    }

    public function changeRole() {
        $M = M("Access");
        $role_id = (int) $_POST['id'];
        $M->where("role_id=" . $role_id)->delete();
        $data = $_POST['data'];
        if (count($data) == 0) {
            return array('status' => 1, 'info' => "清除所有权限成功", 'url' => U("Access/role_list"));
        }
        $datas = array();
        foreach ($data as $k => $v) {
            $tem = explode(":", $v);
            $datas[$k]['role_id'] = $role_id;
            $datas[$k]['node_id'] = $tem[0];
            $datas[$k]['level'] = $tem[1];
            $datas[$k]['pid'] = $tem[2];
        }
        if ($M->addAll($datas)) {
            return array('status' => 1, 'info' => "设置成功", 'url' => U("Access/role_list"));
        } else {
            return array('status' => 0, 'info' => "设置失败，请重试");
        }
    }

    //管理员禁用
    public function ban($id){
        $where['u_key'] = array(in,$id);
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
        $where['u_key'] = array(in,$id);
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
        $where['u_key'] = array(in,$id);
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
