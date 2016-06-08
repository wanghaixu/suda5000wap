<?php
namespace Common\Model;
use Org\Util\Rbac;
use Think\Model;
/**
 * 用户模型
 */
class UserModel extends Model{

    protected $_validate = array(
        array('u_name', 'require', '姓名必须'),
        array('u_username', 'require', '账号必须'),
        array('u_pwd', 'require', '密码必须'),
        array('u_code', 'require', '身份证号必须'),
    );
    /**
     * 用户登录
     * 
     */
    /**
     * 用户登录
     * @author 阿莫大侠
     * @param  [string] $username [账号]
     * @param  [string] $password [密码]
     * @param  [array]  $map      [附加条件，如admin后台的u_type=10]
     * @param  [model]  $model    [可选，不传为user, 用于联立表, 有可能session里面存的不只是user表, 则可以传视图模型]
     * @return [boolean]        成功则返回用户id，失败则返回false, 通过getError获取错误
     */
    public function login($username, $password, $map,$model=null){
        $map['u_username'] = $username;
        $map['status'] = array('eq', 1);
        empty($model) && $model = M('user');
        $user = $model->where($map)->find();
        if(!$user){
            $this->error = '用户不存在或被禁用！';
        }else{
			$pwd = user_md5($password);
            if($pwd != $user['u_pwd']){
                $this->error = '帐号或密码错误！';
            }else{
                $this->autoLogin($user);
                return $user['u_id']; 
            }
        }
        return false;
    }

    /**
     * 设置登录状态
     * @author 阿莫大侠 
     */
    public function autoLogin($user){
        session('user_info', $user);
        session('user_info_sign', $this->dataAuthSign($user));
        session(C('USER_AUTH_KEY'),$user['u_id']);

        if ($user['u_id']==1) {
            session(C('ADMIN_AUTH_KEY'),1);
        }else{
            //获取保存RBAC权限
            RBAC::saveAccessList($user['u_id']);

            //获取所有节点，以便取出菜单 
            $node = RBAC::getModuleAccessList($user['u_id'],'');
            session('node',$node);
        }
    }

    /**
     * 退出操作，清除session
     * @return [type] [description]
     */
    public function logout() {
        session(null);
        // session(C(strtoupper(MODULE_NAME).'_AUTH_KEY'),null);
        // session('user_info', null);
        // session('user_info_sign', null);
        // session('_ACCESS_LIST', null);
        return true;
    }


    /**
     * 检测同一IP注册是否频繁
     * @return boolean ture 正常，false 频繁注册
     */
    protected function checkIP(){
        $limit_time = C('LIMIT_TIME_BY_IP');
        $map['ctime'] = array('GT', time()-(int)$limit_time);
        $reg_ip = $this->where($map)->getField('reg_ip', true);
        $key = array_search(get_client_ip(1), $reg_ip);
        if($reg_ip && $key !== false){
            return false;
        }
        return true;
    }

    /**
     * 用户名敏感词检测
     * @return boolean ture 正常，false 敏感词
     */
    protected function checkUsername(){
        $deny = explode(',', C('SENSITIVE_WORDS'));
        foreach($deny as $k=> $v){
            if(stristr(I('post.username'), $v)){
                return false;
            }
        }
        return true;
    }

    /**
     * 数据签名认证
     * @param  array  $data 被认证的数据
     * @return string       签名
     */
    public function dataAuthSign($data) {
        //数据类型检测
        if(!is_array($data)){
            $data = (array)$data;
        }
        ksort($data); //排序
        $code = http_build_query($data); //url编码并生成query字符串
        $sign = sha1($code); //生成签名
        return $sign;
    }

    /**
     * 检测用户是否登录
     * @return integer 0-未登录，大于0-当前登录用户ID
     * @author 阿莫大侠 
     */
    public function isLogin(){
        $session_info = session('user_info');
        if (empty($session_info)) {
            return 0;
        }else{
            return session('user_info_sign') == $this->dataAuthSign($session_info) ? $session_info['u_id'] : 0;
        }
    }

     /**
     * 修改密码
     * @param  string $old_pwd 旧密码
     * @param  string $new_pwd 新密码
     * @return array          
     */
    public function password($u_id,$old_pwd,$new_pwd)
    {
        $map['u_id'] = $u_id;
        $user = $this->where($map)->field('u_id,u_pwd')->find();
        if (!$user) 
            return array('status'=>0,'info'=>'用户信息错误！请刷新页面重试。');
        if ($user['u_pwd']!= user_md5($old_pwd)) 
            return array('status'=>0,'info'=>'旧密码错误！');

        $user['u_pwd'] =  user_md5($new_pwd);
        $user['last_update_time'] = NOW_TIME;
        $user['last_update_id'] = $u_id;
        if (false!==$this->save($user)) 
            return array('status'=>1,'info'=>'修改成功！');
        return array('status'=>0,'info'=>'修改失败！请刷新页面重试。');
    }

    /**
     * 添加用户;
     * @param array $user 用户信息;
     * @return array 添加结果信息;
     */
    public function addUser($user) {
        $D_user = D('User');
        $user['u_pwd'] = user_md5($user['u_pwd']);
        $user['u_status'] = 1;
        $user['u_leave'] = 1;
        $user['u_type'] = 10;
        if ($D_user->create($user)) {
            $id = $D_user->add();
            if ($id) {
                $data['user_id'] = $id;
                $data['role_id'] = $user['u_role'];
                M('RoleUser')->add($data);
                return array('status'=>1, 'info'=>'添加成功', 'url'=>U('Admin/User/index'));
            } else {
                return array('status'=>0, 'info'=>'添加失败');
            }
        } else {
            return array('status'=>0, 'info'=>$D_user->getError());
        }
    }

    /**
     * 编辑用户;
     * @param array $user 用户信息;
     * @return array 编辑结果信息;
     */
    public function editUser($user){
        if ($user['u_pwd'] == '') {
            unset($user['u_pwd']);
        } else {
            $user['u_pwd'] = user_md5($user['u_pwd']);
        }
        $result = M('User')->save($user);
        if ($result !== false) {
            $M_roleuser = M('RoleUser');
            $M_roleuser->where('user_id='.$user['u_id'])->delete();
            $data = array('user_id'=>$user['u_id'], 'role_id'=>$user['u_role']);
            if ($M_roleuser->add($data)) {
                return array('status'=>1, 'info'=>'修改成功', 'url'=>U('Admin/User/index'));
            } else {
                return array('status'=>0, 'info'=>'修改失败');
            }
        } else {
            return array('status'=>0, 'info'=>'修改失败');
        }
    }

    /**
     * 请假;
     * @param int $id 用户ID;
     * @return array 请假结果信息;
     */
    public function leave($id) {
        $M_user = M('User');
        $map_user['u_id'] = array('EQ', $id);
        $M_user->startTrans();
        $user['u_leave'] = 0;
        if ($M_user->where($map_user)->save($user)) {
            $leave['u_id'] = $id;
            $leave['ul_sdate'] = time();
            if (M('UserLeave')->add($leave)) {
                $M_user->commit();
                return array('status'=>1, 'info'=>'已请假');
            } else {
                $M_user->rollback();
                return array('status'=>0, 'info'=>'请假失败');
            }
        } else {
            $M_user->rollback();
            return array('status'=>0, 'info'=>'请假失败');
        }
    }

    /**
     * 结束请假;
     * @param int $id 用户ID；
     * @param string $length 请假时长;
     * @return array 结束请假信息;
     */
    public function leaveClose($id) {
        $M_user = M('User');
        $map_user['u_id'] = array('EQ', $id);
        $M_user->startTrans();
        $user['u_leave'] = 1;
        if ($result = $M_user->where($map_user)->save($user)) {
            $M_leave = M('UserLeave');
            $map_leave['u_id'] = array('EQ', $id);
            $user_leave = $M_leave->where($map_leave)->order('ul_sdate desc')->find();
            $map_leave['ul_id'] = array('EQ', $user_leave['ul_id']);
            $temp = time() - $user_leave['ul_sdate'];
            $length = floor(($temp / 86400)).'天'.round(($temp % 86400 / 3600),1).'小时';
            $leave['ul_edate'] = time();
            $leave['ul_length'] = $length;
            if ($M_leave->where($map_leave)->field('ul_edate,ul_length')->save($leave)) {
                $M_user->commit();
                return array('status'=>1, 'info'=>'已结束请假');
            } else {
                $M_user->rollback();
                return array('status'=>0, 'info'=>'结束请假失败');
            }
        } else {
            $M_user->rollback();
            return array('status'=>0, 'info'=>'结束请假失败');
        }
    }
}
