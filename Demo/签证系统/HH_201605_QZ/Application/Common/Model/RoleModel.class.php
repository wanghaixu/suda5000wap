<?php
namespace Common\Model;
use Think\Model;
class RoleModel extends Model {
    protected $autoCheckFields = false;
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
     * 添加角色
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
}

?>
