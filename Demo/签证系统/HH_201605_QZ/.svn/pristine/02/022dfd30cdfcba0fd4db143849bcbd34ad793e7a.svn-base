<?php
namespace Admin\Controller;
use Think\Controller;

class IndexController extends CommonController {

    public function index() {
        foreach($this->$menu['current_rootmenu'] as $key => $val){
            foreach($val as $k => $v){
                if(empty($v['url'])) continue;
                $url = $v['url'];
                break;
            }
            break;
        }
        $this->redirect($url);
    }
    //添加
    public function add() {
        if (IS_POST) {
            I('post.','','trim','htmlspecialchars');
        } else {
            $this->display();
        }
    }
    // 表格弹窗
    public function popup_table(){
        $this->display();
    }
    // 表单弹窗1
    public function popup_form_1(){
        $this->display();
    }
    // 表单弹窗2
    public function popup_form_2(){
        $this->display();
    }

	//商家编辑
    public function edit() {
        if (IS_POST) {
            header('Content-Type:application/json; charset=utf-8');
            $this->ajaxReturn(D("Common/Groups")->groups_edit(I('post.', '', 'trim,htmlspecialchars')));
        } else {
            $this->display("add");
        }
    }


    // 柱状图
    public function histogram(){
        $this->display();
    }
    // 柱状图
    public function histogram1(){
        $this->assign("all",45);
        $arr = array(array('id'=>1,'name'=>'数据1','num'=>3),array('id'=>1,'name'=>'数据2','num'=>42));
        $this->assign("arr",$arr);
        $this->display();
    }
    // 折线图
    public function line_graph(){
        $this->display();
    }
}
