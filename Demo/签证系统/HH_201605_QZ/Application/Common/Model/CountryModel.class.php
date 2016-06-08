<?php
namespace Common\Model;
use Think\Model;
class CountryModel extends Model {

	public function add(){
	    $data['ct_name'] = $_POST['ct_name'];
        $data['ct_code'] = $_POST['ct_code'];
        $data['ct_stime'] = time();
        $data['ct_status'] = 1;
        $res = M('Country')->add($data);

       if ($res) {
            return array('status' => 1, 'info' => "增加成功",'url' => U("Country/index"));
        } else {
                return array('status' => 0, 'info' => "增加失败");
            }
	}

	public function edit(){
	    $data['ct_name'] = $_POST['ct_name'];
        $data['ct_code'] = $_POST['ct_code'];
        $res = M('Country')->where(array('ct_id'=>$_POST['id']))->save($data);
        if ($res) {
             return array('status' => 1, 'info' => "修改成功",'url' => U("Country/index"));
         } else {
                 return array('status' => 0, 'info' => "修改失败");
             }

	}

	// public function add(){
	//     $data['ct_name'] = $_POST['ct_name'];
 //        $data['ct_code'] = $_POST['ct_code'];
 //        $data['ct_stime'] = time();
 //        $data['ct_status'] = 1;
 //        $res = M('Country')->add($data);

 //       if ($res) {
 //            return array('status' => 1, 'info' => "增加成功",'url' => U("Country/index"));
 //        } else {
 //                return array('status' => 0, 'info' => "增加失败");
 //            }
	// }
}
?>
