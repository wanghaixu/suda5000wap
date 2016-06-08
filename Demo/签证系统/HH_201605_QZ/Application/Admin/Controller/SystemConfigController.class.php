<?php
namespace Admin\Controller;
use Think\Controller;
/**
 * 系统配置控制器
 */
class SystemConfigController extends CommonController{

    public function index(){ 
        if (IS_POST) {
            $data = I('post.','','trim,htmlspecialchars');
            unset($data['file']);
            if (D('SystemConfig')->saveConfig($data,1)) {
                $result['status'] = 1;
                $result['info'] = '修改成功！';
            }else{
                $result['status'] = 0;
                $result['info'] = '修改失败！';
            }
            $this->ajaxReturn($result);
        }else{
            $map['status'] = 1;
            $map['group']  = 1;
            $this->info = M('SystemConfig')->where($map)->getField('name,value');
            $this->assign('meta_title','修改设置');
            $this->display();
        }
    }

    public function qrcode()
    {
        $this->display();
    }

    /**
     * 批量保存配置
     */
    public function groupSave($config){
		if($config['ADMIN_AUTH_KEY']){
			set_config('systemConfig', $config,C('PIC_ROOT').'/Application/Common/Conf/');
		}else{
			if($config && is_array($config)){
				$config_object = D('SystemConfig');
				foreach ($config as $name => $value){
					$map = array('name' => $name);
					if(is_array($value)){ //如果值是数组则转换成字符串，适用于复选框等类型
						$value = implode(',', $value);
					}
					$config_object->where($map)->setField('value', $value);
				}
			}
			S('DB_CONFIG_DATA',null);
		}
        $this->success('保存成功！');
    }
}
