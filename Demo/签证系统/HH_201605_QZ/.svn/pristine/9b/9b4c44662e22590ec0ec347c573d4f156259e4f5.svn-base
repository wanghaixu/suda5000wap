<?php
require_once(APP_PATH . '/Common/Common/project.php'); //加载开发者二次开发公共函数库




/**
 * 时间戳格式化
 * @param int $time
 * @return string 完整的时间显示
 * @author jry <598821125@qq.com>
 */
function time_format($time = NULL, $format='Y-m-d H:i'){
    $time = $time === NULL ? NOW_TIME : intval($time);
    return date($format, $time);
}


/**
 * 系统非常规MD5加密方法
 * @param  string $str 要加密的字符串
 * @return string
 * @author jry <598821125@qq.com>
 */
function user_md5($str, $auth_key){
    if(!$auth_key){
        $auth_key = C('AUTH_KEY');
    }
    return '' === $str ? '' : md5(sha1($str) . $auth_key);
}

/**
 * 检测用户是否登录
 * @return integer 0-未登录，大于0-当前登录用户ID
 * @author jry <598821125@qq.com>
 */
function is_login(){
    return D('User')->isLogin();
}



/**
 * 获取上传文件路径
 * @param  int $id 文件ID
 * @return string
 * @author jry <598821125@qq.com>
 */
function get_cover($id, $type){
    $upload_info = D('PublicUpload')->find($id);
    $url = $upload_info['real_path'];
    if(!$url){
        switch($type){
            case 'default' : //默认图片
                $url = C('TMPL_PARSE_STRING.__HOME_IMG__').'/logo/default.gif';
                break;
            case 'avatar' : //用户头像
                $url = C('TMPL_PARSE_STRING.__HOME_IMG__').'/avatar/avatar'.rand(1,7).'.png';
                break;
            default: //文档列表默认图片
                break;
        }
    }
    return $url;
}

/**
 * 获取上传文件信息
 * @param  int $id 文件ID
 * @return string
 * @author jry <598821125@qq.com>
 */
function get_upload_info($id, $field){
    $upload_info = D('PublicUpload')->where('status = 1')->find($id);
    if($field){
        if(!$upload_info[$field]){
            return $upload_info['id'];
        }else{
            return $upload_info[$field];
        }
    }
    return $upload_info;
}



/**
 * 系统邮件发送函数
 * @param string $receiver 收件人
 * @param string $subject 邮件主题
 * @param string $body 邮件内容
 * @param string $attachment 附件列表
 * @return boolean
 * @author jry <598821125@qq.com>
 */
function send_mail($receiver, $subject, $body, $attachment){
    return R('Addons://Email/Email/sendMail', array($receiver, $subject, $body, $attachment));
}



/**
 * RBAC权限认证
 * @param string $url 分组/控制器/操作
 * @author mo
 */
function check_rbac($url='')
{
    if (session(C('ADMIN_AUTH_KEY'))) return true;  //超级管理员免验证权限
    $url = explode('/', $url);
    if(empty($url[0])) unset($url[0]);
    switch (count($url)) {
        case 3:
            $appName        =$url[0];
            $controllerName =$url[1];
            $actionName     =$url[2];
            break;
        case 2:
            $appName        =MODULE_NAME;
            $controllerName =$url[1];
            $actionName     =$url[0];
            break;
        case 1:
            $appName        =MODULE_NAME;
            $controllerName =CONTROLLER_NAME;
            $actionName     =$url[0];
            break;
        default :
            $appName        =MODULE_NAME;
            $controllerName =CONTROLLER_NAME;
            $actionName     =ACTION_NAME;
            break;
    }
    import('ORG.Util.Rbac');
    if(! \Org\Util\Rbac::AccessDecision($appName,$controllerName,$actionName))
        return false;    //普通认证
    return true;
}

//状态
function status($status){
    if($status == 1){
        return '开启';
    }else{
        return '关闭';
    }
}

function get_menu($appName)
{
    //获取系统菜单导航
    $map['status'] = array('eq', 1);
    if(!C('DEVELOP_MODE')){ //是否开启开发者模式
        $map['dev'] = array('neq', 1);
    }
    $map['module'] = strtoupper($appName);

    $SystemMenu=D('SystemMenu');
    //非超级管理员，过滤没有权限的菜单
    if (session(C('ADMIN_AUTH_KEY'))!=1) {
		$node = session('node');
		//所有菜单元素
		$element = $SystemMenu->order('sort asc')->where($map)->select();
		foreach($element as $k => $v){
			//如果元素没有权限
            if(false){
			// if(!in_array($v['node_id'],$node)){
				$second_map['status']=1;
				$second_map['pid']=$v['id'];
				//找出所有子元素
				$son=$SystemMenu->where($second_map)->order('sort asc')->select();
				foreach($son as $key => $val){
					//如果子元素没有权限,判断是否含有权限的孙元素
					if(!in_array($val['node_id'],$node)){
						$third_map['status']=1;
						$third_map['pid']=$val['id'];
						!empty($node) && $third_map['node_id'] = array('in',$node);
						$grandson=$SystemMenu->where($third_map)->order('sort asc')->find();
						//如果具有含有权限的孙元素
						if($grandson){
							$element[$k]['url']=$grandson['url'];
							$righ=true;
							break;
						}
						//重新定义grandson
						$grandson="";
					}
					//具有含有权限的子元素
					else{
						$element[$k]['url']=$val['url'];
						$righ=true;
						break;						
					}
				}
				//元素找不到含有权限的子元素，或孙元素
				if(!$righ){
					unset($element[$k]);
				}
				//重新义$righ
				$righ="";
			}		
		}
	}else{	
		//超级管理员，不过滤
		$element=$SystemMenu->order('sort asc')->where($map)->select();
	}
    $tree = new \Common\Util\Tree();
    $all_admin_menu_list = $tree->list_to_tree($element); //所有系统菜单
    //设置数组key为菜单ID
    foreach($all_admin_menu_list as $key => $val){
        $all_menu_list[$val['id']] = $val;
    }
	
    $current_menu = $SystemMenu->getCurrentMenu(); //当前菜单

    if($current_menu){
        $parent_menu = $SystemMenu->getParentMenu($current_menu); //获取面包屑导航
        foreach($parent_menu as $key => $val){
            $parent_menu_id[] = $val['id'];
        }
        $side_menu_list = $all_menu_list[$parent_menu[0]['id']]['_child']; //左侧菜单
    }
	   
    foreach ($all_menu_list as $k => $v) {
        if (empty($v['url'])) $all_menu_list[$k]['url'] = $v['_child'][0]['_child'][0]['url'];
    }
    return array(
        'all_menu_list' => $all_menu_list,
        'side_menu_list' => $side_menu_list,
        'parent_menu' => $parent_menu,
        'parent_menu_id' => $parent_menu_id,
        'current_rootmenu' =>$parent_menu[0]['id']
    );
}

//格式化输出数组
function pre($content) {
    echo "<pre>";
    print_r($content);
    echo "</pre>";
}



//节点格式化
function getPid($info) {
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


/**
 * 快速文件数据读取和保存 针对简单类型数据 字符串、数组
 * @param string $name 缓存名称
 * @param mixed $value 缓存值
 * @param string $path 缓存路径
 * @return mixed
 */
function set_config($name, $value='', $path=DATA_PATH) {
    static $_cache  = array();
    $filename       = $path . $name . '.php';
    if ('' !== $value) {
        if (is_null($value)) {
            // 删除缓存
            return false !== strpos($name,'*')?array_map("unlink", glob($filename)):unlink($filename);
        } else {
            // 缓存数据
            $dir            =   dirname($filename);
            // 目录不存在则创建
            if (!is_dir($dir))
                mkdir($dir,0755,true);
            $_cache[$name]  =   $value;
            return file_put_contents($filename, strip_whitespace("<?php\treturn " . var_export($value, true) . ";?>"));
        }
    }
    if (isset($_cache[$name]))
        return $_cache[$name];
    // 获取缓存数据
    if (is_file($filename)) {
        $value          =   include $filename;
        $_cache[$name]  =   $value;
    } else {
        $value          =   false;
    }
    return $value;
}

/**
 * 验证验证码
 * @param $code
 * @param string $id
 * @return bool
 */
function check_verify($code, $id = ''){
    $verify = new \Think\Verify();
    return $verify->check($code, $id);
}


/**
 * 日志写入
 * @param  integer $type [description]
 * @return [type]        [description]
 */
function log_write($type=0)
{
    $log = \Common\Tools\LogTools::getInstance();
    $log->write($type);
}
/**
 * 日志读取
 * @param  integer $type [description]
 * @return [type]        [description]
 */
function log_read($code=0)
{
    $log = \Common\Tools\LogTools::getInstance();
    return $log->read($code);
}

/**
 * 获取完整路径
 * @return [type] [description]
 */
function get_url()
{
    return 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
}
/**
 * 获取user的key
 * @return [type] [description]
 */
function get_u_key()
{
    $module = strtolower(MODULE_NAME);
    if ($module=="wap") $module = "user";
    return session($module.'_info.u_key');
}

/**
 * 实例视图方法
 * @author 阿莫大侠 <mojiannan@honghaiweb.com>
 * @param string $name   视图名称
 * @param string/array $fields 1. 不传默认视图的所有表
 *                             2. 传入字符串，如'User,Log'，即限制视图只输出User和Log两个表，
 *                             3. 传入数组，如'Employee'=>array('*','_on'=>'User.u_key=Employee.e_user_key')
 *                                为动态给视图添加上表
 */
function VM($name,$fields=null)
{
    $ViewModel = D('Common/'.$name,'VModel');
    if (empty($fields)) 
        return $ViewModel;
    switch (gettype($fields)) {
        case 'string':
            $fields = explode(',', $fields);
            foreach ($ViewModel->viewFields as $k => $v) {
                if (!in_array($k, $fields)) 
                    unset($ViewModel->viewFields[$k]);
            }
            break;
        case 'array':
            $ViewModel->viewFields = array_merge($ViewModel->viewFields,$fields);
            break;
    }
    return $ViewModel;
}

function CT($name)
{
    return A('Common/'.$name,'Tools');
}

function get_or_status($or_status='')
{
    $status_arr = array(
        '10' => '待确认',
        '20' => '确认有误',
        '30' => '已确认',
        '40' => '审核中',
        '50' => '已结算',
        // '60' => '失效',
        '70' => '已生效',
        '80' => '已退保',
    );
    return empty($or_status)? $status_arr:$status_arr[$or_status];
}


//调试方法：显示最后一条执行的sql语句
function _sql()
{
    echo M()->getlastsql();die;
}

/**
 * 获取car_type的json
 * @return [type] [description]
 */
function get_ct_json()
{
    $car_type = file_get_contents('./Uploads/ct_json/parkey.json');
    empty($car_type) && $car_type = D('CarInfo')->get_ct_json();
    return $car_type;
}

function is_mobile($mobile)
{
    if (!is_numeric($mobile)) 
        return false;
    return preg_match('#^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$#', $mobile) ? true : false;
}

function p($obj)
{
    echo "<pre>";
    print_r($obj);
    echo "</pre>";
    die;
}

function get_day($day){
     return strtotime(date("Y-m-d",$day));
}

function get_month($time){
    return strtotime(date("Y-m",$time));
}
/*
 * 传入数字月份 转换 中文月份
 */
function month_change($month){
    $arr = array(
        '01'=>'一',
        '02'=>'二',
        '03'=>'三',
        '04'=>'四',
        '05'=>'五',
        '06'=>'六',
        '07'=>'七',
        '08'=>'八',
        '09'=>'九',
        '10'=>'十',
        '11'=>'十一',
        '12'=>'十二');
    return $arr[$month];
}

//移动图片
//参数：$old_path:旧文件路径 $new_path:新文件路径
//move_pic('/Uploads/temp/qrcode.jpg','qrcode');
function move_pic($old_path,$new_path){
	//要存在绝对路径
	$old_path = trim($old_path,'/');
	$new_path = trim($new_path,'/');
	//获取需要创建的目录数组
	$new_arr = explode("/",$new_path);
	//获取文件名
	$arr=explode("/",$old_path);
	$file = $arr[(count($arr) - 1)];
	//拼接旧目录绝对路径
	$del_pic = './'.$old_path;
	$old_path = $_SERVER['DOCUMENT_ROOT'].'/'.$old_path;
	if(is_file($old_path)) {
		$path = $_SERVER['DOCUMENT_ROOT'].'/Uploads';
		foreach($new_arr as $key => $val){
			$path .= '/'.$val;
			if(!is_dir($path)){
				@mkdir($path, 0777, true);
			}
		}
		if(copy($old_path,$_SERVER['DOCUMENT_ROOT'].'/Uploads/'.$new_path.'/'.$file)){
			//删除旧文件
			@unlink($del_pic);
		}
		return 'Uploads/'.$new_path.'/'.$file;
	}else{
		return '';
	}
	
}

/**
 * 获取角色
 * @param  int $role 角色ID   
 * @return array/string      $role为空时返回整个数组，可以遍历
 */
function role2str($role=null)
{
    $role_arr = array(
        '1'=> '管理员',
        '2'=> '客服人员',
        '3'=> '行政人员',
        '4'=> '操作人员',
    );
    return $role? $role_arr[$role]:$role_arr;
}
/**
 * 格式化时间戳 等于0返回空
 * @param  string $timestrap [时间戳]
 * @return [type]            [description]
 */
 function int2date($timestrap,$format="Y-m-d")
 {
    if(!$timestrap>0) return "";
    return date($format,$timestrap);
}
