<?php
namespace Admin\Controller;
use Think\Controller;
class CommonController extends Controller{
    /**
     * 初始化方法
     * @author mo 
     */
    protected function _initialize(){
        //登录检测
        if(!is_login())
            $this->redirect('Public/login');

        //检测权限
        if(CONTROLLER_NAME.'/'.ACTION_NAME!='Index/index'&& !check_rbac())
            $this->error(L('_VALID_ACCESS_'));

        //日志
        log_write(1);
        
        //获取菜单
        if (!IS_POST) $this->_menu();

        $this->assign('__USER__', session('user_info')); //用户登录信息
        $this->assign('__CONTROLLER_NAME__', strtolower(CONTROLLER_NAME)); //当前控制器名称
        $this->assign('__ACTION_NAME__', strtolower(ACTION_NAME)); //当前方法名称
    }


    protected function _menu()
    {
        $menu = get_menu(MODULE_NAME);
        $this->assign('__ALL_MENU_LIST__', $menu['all_menu_list']); //所有菜单
        $this->assign('__SIDE_MENU_LIST__', $menu['side_menu_list']); //左侧菜单
        $this->assign('__PARENT_MENU__', $menu['parent_menu']); //当前菜单的所有父级菜单
        $this->assign('__PARENT_MENU_ID__', $menu['parent_menu_id']); //当前菜单的所有父级菜单的ID
        $this->assign('__CURRENT_ROOTMENU__', $menu['current_rootmenu']); //当前主菜单
    }

    /**
      * 分页列表处理 
      */  
    protected function _list($model, $map = array(), $order='', $field_list='*', $pagesize=20){
        if($pagesize) {
            $count = $model->where($map)->count();
            $pager=new \Think\Page($count,$pagesize);
            $pager->rollPage = 5;
            $pager->setConfig('header','条记录');
            $pager->setConfig('prev', '上一页');
            $pager->setConfig('next', '下一页');
            $pager->setConfig('first', '首页');
            $pager->setConfig('last', '尾页');
            $pager->setConfig('theme', '%UP_PAGE% %FIRST% %LINK_PAGE% %END% %DOWN_PAGE%');
        }
        $select = $model->field($field_list)->where($map);
        empty($order)? : $select->order($order);
        if ($pagesize) {
            $select->limit($pager->firstRow.','.$pager->listRows);
            $page = $pager->show();
            $this->page=$page;
        }
        $list = $select->select();
        //pre($list);die;
        $this->list=$list;
    }
}
