<?php
namespace Admin\Controller;
use Think\Controller;
class CountryController extends CommonController {
	
    public function index()
    {
        $data = I('get.','','trim');
        $M = M("Country");
        $map['ct_name'] = array('like','%'.$data['search_key'].'%');
        $map['ct_code'] = array('like','%'.$data['search_key'].'%');
        $map['_logic'] = 'OR';
        $list = $this->_list($M,$map, 'ct_id DESC', '*', 15);
        $this->display();
    }

    public function add()
    {
        if (IS_POST) {
           $this->ajaxReturn(D("Common/Country")->add());
        }else{
            $this->display();
        }
    }

    public function edit()
    {
        if(IS_POST){
            $this->ajaxReturn(D("Common/Country")->edit());
        }else{
             $M = M("Country");
            $info = $M->where(array('ct_id'=>$_GET['id']))->find();
            $this->assign("info", $info);
            $this->display("add");           
        }

    }

    public function enable()
    {
        if(M('Country')->where(array('ct_id'=>$_POST['ct_id']))->setField('ct_status',1)){
            $this->ajaxReturn(array('status' => 1, 'info' => "开启成功",'url' => U("Country/index")));
        }else{
            $this->ajaxReturn(array('status' => 0, 'info' => "开启失败"));
        }       
    }

    public function disable()
    {
        if(M('Country')->where(array('ct_id'=>$_POST['ct_id']))->setField('ct_status',0)){
            $this->ajaxReturn(array('status' => 1, 'info' => "禁用成功",'url' => U("Country/index")));
        }else{
            $this->ajaxReturn(array('status' => 0, 'info' => "禁用失败"));
        }
    }

    public function schedule()
    {
        $this->display();
    }
}