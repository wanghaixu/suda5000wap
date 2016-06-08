<?php
namespace Admin\Controller;
use Think\Controller;
/**
 * 后台公共控制器
 */
class PublicController extends Controller{
    /**
     * 后台登陆
     */
    public function login(){
        if(IS_POST){
            $post = I('post.');
            //图片验证码校验
            if(!$this->check_verify($post['verify'])&&C('DEVELOP_MODE')!=1)
                $this->error('验证码输入错误！');

            $map['u_type'] = 10;   //admin后台用户
            $user = D('User');
            $uid = $user->login($post['username'], $post['password'], $map);
            if(0 < $uid)
                $this->success('登录成功！', U('Index/index'));
            $this->error($user->getError());
        }else{
            $this->assign('meta_title', '管理员登录');
            $this->assign('__CONTROLLER_NAME__', strtolower(CONTROLLER_NAME)); //当前控制器名称
            $this->assign('__ACTION_NAME__', strtolower(ACTION_NAME)); //当前方法名称
            $this->display();
        }
    }

    /**
     * 注销
     */
    public function logout(){
        D('User')->logout();
        $this->success('退出成功！', U('Public/login'));
    }

    /**
     * 图片验证码生成，用于登录和注册
     */
    public function verify($vid = 1){
        $verify = new \Think\Verify();
        $verify->length = 4;
        $verify->entry($vid);
    }
    
    /**
     * 检测验证码
     * @param  integer $id 验证码ID
     * @return boolean 检测结果
     */
    function check_verify($code, $vid = 1){
        $verify = new \Think\Verify();
        return $verify->check($code, $vid);
    }
}
