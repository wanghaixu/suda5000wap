<?php
namespace Common\Model;
use Think\Model;
/**
 * 配置模型
 */
class SystemConfigModel extends Model{
    /**
     * 获取配置列表与ThinkPHP配置合并
     * @return array 配置数组
     */
    public function lists(){
        $map['status']  = array('eq', 1);
        $list = $this->where($map)->field('name,value')->select();
        foreach ($list as $key => $val){
            $config[$val['name']] = $val['value'];
        }
        return $config;
    }

    public function saveConfig($data,$group)
    {
        $map['group'] = $group;
        $this->where($map)->setField('status',0);
        $dataList = array();
        $uid = get_u_key();
        foreach ($data as $k => $v) {
            $dataList[] = array(
                'name'            => $k,
                'value'           => $v,
                'group'           => $group,
                'status'          => 1,
                'create_id'       => $uid,
                'create_date'     => NOW_TIME,
                'last_update_id'  => $uid,
                'last_update_time'=> NOW_TIME,
            );
        }
        if ($this->addAll($dataList)) {
            S('DB_CONFIG_DATA',null);
            return true;
        }else{
            return false;
        }
    }
}
