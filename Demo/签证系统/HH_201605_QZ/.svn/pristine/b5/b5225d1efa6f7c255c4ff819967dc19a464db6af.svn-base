<?php
namespace Common\Behavior;
use Think\Behavior;
defined('THINK_PATH') or exit();
class InitConfigBehavior extends Behavior{
    public function run(&$content){
        //读取数据库中的配置
        $system_config = S('DB_CONFIG_DATA');
        if(!$system_config){
            //获取所有系统配置
            $system_config = D('SystemConfig')->lists();

            S('DB_CONFIG_DATA', $system_config, 3600); //缓存配置
        }
        
        //模板变量
        $system_config['TMPL_PARSE_STRING']  = array (
            '__PUBLIC__'     => __ROOT__.'/Public',
            '__LIBS__'       => __ROOT__.'/Public/libs',
            '__COMMON_IMG__' => __ROOT__.'/Public/common/img',
            '__COMMON_CSS__' => __ROOT__.'/Public/common/css',
            '__COMMON_JS__'  => __ROOT__.'/Public/common/js',
            '__IMG__'   => __ROOT__.'/Public/'.strtolower(MODULE_NAME).'/img',
            '__CSS__'   => __ROOT__.'/Public/'.strtolower(MODULE_NAME).'/css',
            '__JS__'    => __ROOT__.'/Public/'.strtolower(MODULE_NAME).'/js',
        );
        $system_config['SESSION_PREFIX'] = MODULE_NAME;
        C($system_config); //添加配置
    }
}
