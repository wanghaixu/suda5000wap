<?php
namespace Admin\Controller;
use Think\Controller;
/**
 * 后台菜单控制器
 */
class SystemMenuController extends CommonController{
    /**
     * 菜单列表
     */
    public function index(){
        //搜索
        $keyword = I('keyword', '', 'string');
        $where['module'] = array('like','%'.strtoupper($keyword).'%');

		//格式化列表
		$cat = new \Org\Util\Category('system_menu', array('id', 'pid', 'title', 'fullname'));		
        $temp = $cat->getList($where,0,'sort');               //获取分类结构
        foreach ($temp as $k => $v) {
            //$temp[$k]['statusTxt'] = $v['status'] == 1 ? "启用" : "禁用";
            //$temp[$k]['chStatusTxt'] = $v['status'] == 0 ? "启用" : "禁用";
            $temp[$k]['level'] = $level[$v['level']];
            $list[$v['id']] = $temp[$k];
        }
		$this->assign('list',$list);
		$this->display();
    }

    /**
     * 新增菜单
     */
    public function add(){
        if(IS_POST){
			$url = explode("/",$_POST['url']);
			if (count($url)!=3) $this->error('URL格式错误！');
			if(empty($_POST['module'])){
				$_POST['module'] = strtoupper($url[0]);
			}
			if ($_POST['auto_node']) {
				$_POST['node_id']=0;
				!empty($_POST['url']) && $_POST['node_id'] = $this->url2node($_POST['url']);
			}
            $menu_object = D('SystemMenu');
            $data = $menu_object->create();
            if($data){
                $id = $menu_object->add();
                if($id){
                    $this->success('新增成功', U('index'));
                }else{
                    $this->error('新增失败');
                }
            }else{
                $this->error($menu_object->getError());
            }
        }else{
			 $this->menu = $this->getMenu();
			 //select节点框默认显示为admin分组
			 $this->select_node = $this->getSelectStr("Admin");
			 $this->display();
		}
    }

    /**
     * url获取节点，没有则自动建节点
     * @param  [type] $url [description]
     * @return [type]      [description]
     */
    protected function url2node($url)
    {
		$url = explode("/",$url);
		$M = M('node');
		$where = array(
			'name' => $url[0],
			'level'=> 1,
			'pid'  => 0
		);
		$node1 = $M->where($where)->getField('id');
		if (!$node1) $node1 = $M->add($where);

		$where = array(
			'name' => $url[1],
			'level'=> 2,
			'pid'  => $node1
		);
		$node2 = $M->where($where)->getField('id');
		if (!$node2) $node2 = $M->add($where);

		$where = array(
			'name' => $url[2],
			'level'=> 3,
			'pid'  => $node2
		);
		$node3 = $M->where($where)->getField('id');
		if (!$node3) $node3 = $M->add($where);
		return $node3;
    }
    /**
     * 编辑菜单
     */
    public function edit($id){
        if(IS_POST){
			$url = explode("/",$_POST['url']);
			if (count($url)!=3) $this->error('URL格式错误！');
			if(empty($_POST['module'])){
				$_POST['module'] = strtoupper($url[0]);
			}
            $menu_object = D('SystemMenu');
            $data = $menu_object->create();
            if($data){
                if($menu_object->save()!== false){
                    $this->success('更新成功', U('index'));
                }else{
                    $this->error('更新失败');
                }
            }else{
                $this->error($menu_object->getError());
            }
        }else{
			$this->info = M('system_menu')->where(array('id' => $id))->find();
			//pre($this->info);die;
			if($this->info['node_id']){
				$this->select_node = $this->getSelectStr($this->info['url']);
			}else{
				$this->select_node = $this->getSelectStr('Admin');
			}
			//pre($this->select_node);die;
			$this->menu = $this->getMenu(array('pid' => $this->info['pid']));
			$this->display('add');
		}
    }

	//返回节点select框
	public function getNode(){
		if(IS_AJAX){
			echo $this->getSelectStr($_POST['url']);
		}
	}

	//返回一个拼接完成的select字符串
	//参数：$url格式：Admin/Access/index
	private function getSelectStr($url){
		$url = explode("/",$url);
		$str = '<div class="form-group item_sort"><label class="item-label">节点</label><div class="controls" style="overflow:hidden;"><input name="module" value="'.strtoupper($url[0]).'" type="hidden"/>';
		$Moeld_id = M('node')->where(array('name' => ucwords($url[0]),'status' => 1,'level' => 1,'pid' => 0))->getField('id');
		$Controller_id = M('node')->where(array('name' => ucwords($url[1]),'status' => 1,'level' => 2,'pid' => $Moeld_id))->getField('id');
		$function_id = M('node')->where(array('name' => ucwords($url[2]),'status' => 1,'level' => 3,'pid' => $Controller_id))->getField('id');
		$node = M('node')->where(array('level' => 1))->select();
		if(empty($Moeld_id)){
			//$Moeld_id = $node[0]['id'];
		}
		$node2 = M('node')->where(array('level' => 2,'pid' => $Moeld_id))->select();
		if(empty($Controller_id)){
			$Controller_id = $node2[0]['id'];
		}
		$node3 = M('node')->where(array('level' => 3,'pid' => $Controller_id))->select();
		$str = $this->getNode_function($str,$node,$Moeld_id);
		$str = $this->getNode_function($str,$node2,$Controller_id);
		$str = $this->getNode_function($str,$node3,$function_id,false);
		$str.='<div style="float:left;margin-left:10px;" class="btn btn-primary url">选择连接</div></div></div>';
		return $str;
	}

	//拼接节点select框
	//$str : 字符串 $node:节点数据 $id:选中的id $node_select:select标签是否添加node_select样式
	private function getNode_function($str,$node,$id='',$node_select=true){
		if($node){
			//$node_select为空，代表是最后一层，则不添加触发事件样式node_select
			if($node_select){
				$str .= '<select name="node_id" class="form-control select node_select remove_node" style="width:143px;float:left;margin-right:10px;">';
			}else{
				$str .= '<select name="node_id" class="form-control select remove_node" style="width:143px;float:left;margin-right:10px;">';
			}
			foreach($node as $key => $val){
				if($id == $val['id']){
					$str .='<option value="'.$val['id'].'" selected>'.$val['name'].'</option>';
				}else{
					$str .='<option value="'.$val['id'].'">'.$val['name'].'</option>';
				}
			}
			$str .= '</select>';
		}
		
		return $str;
	}

	//节点select框改变触发事件函数
	public function node_change_select(){
		if(IS_AJAX){
			$id = $_POST['id'];
			$node = M('node')->where(array('id' => $id))->field('id,pid,name,level')->find();

			$str = '';
			for($num = $node['level'];$num<3;$num++){
				$allnode = M('node')->where(array('pid' => $node['id'],'level' => $num+1))->select();
				//获取下一级节点的pid
				$node['id'] = $allnode[0]['id'];
				if($num==2){
					$str = $this->getNode_function($str,$allnode,$Moeld_id,'',false);
				}else{
					$str = $this->getNode_function($str,$allnode,$Moeld_id);
				}
			}
			//echo $str;
			$data['htm_str'] = $str;
			$data['level'] = $node['level'];
			$data['name'] = strtoupper($node['name']);
			$this->ajaxReturn($data);
		}
	}

	//获取菜单html
	private function getMenu($info = array()) {
        import("Org.Util.Category");
        $cat = new \Org\Util\Category('system_menu', array('id', 'pid', 'title'));
        $list = $cat->getList();               //获取分类结构
				//DUMP($LIST);DIE;
        foreach ($list as $k => $v) {
            $selected = $v['id'] == $info['pid'] ? ' selected="selected"' : "";
            $info['pidOption'].='<option value="' . $v['id'] . '"' . $selected . '>' . $v['fullname'] . '</option>';
        }
        return $info;
    }
	//菜单删除
	public function del(){
		$id = $_POST['id'];
		$ids = explode(',',$id);
		$cate = M('system_menu')->select();
		foreach($ids as $key => $val){
			$role_id = $this->getChild($cate,$val);
			array_push($role_id,$val);
			$where['id'] = array('in',$role_id);
			if(!M('system_menu')->where($where)->delete()){
				$this->ajaxReturn(array('status' => 0,'info' => '删除失败'));
			}
		}
		$this->ajaxReturn(array('status' => 1,'info' => '删除成功'));
	}

	//菜单禁用
	public function ban(){
		$id = $_POST['id'];
		$ids = explode(',',$id);
		$cate = M('system_menu')->select();
		foreach($ids as $key => $val){
			$role_id = $this->getChild($cate,$val);
			array_push($role_id,$val);
			$where['id'] = array('in',$role_id);
			if(!M('system_menu')->where($where)->setField('status',0)){
				$this->ajaxReturn(array('status' => 0,'info' => '禁用失败'));
			}
		}
		$this->ajaxReturn(array('status' => 1,'info' => '禁用成功'));
	}

	//菜单开启
	public function awaken(){
		$id = $_POST['id'];
		$ids = explode(',',$id);
		$cate = M('system_menu')->select();
		foreach($ids as $key => $val){
			$role_id = $this->getChild($cate,$val);
			array_push($role_id,$val);
			$where['id'] = array('in',$role_id);
			if(!M('system_menu')->where($where)->setField('status',1)){
				$this->ajaxReturn(array('status' => 0,'info' => '开启失败'));
			}
		}
		$this->ajaxReturn(array('status' => 1,'info' => '开启成功'));
	}

	//返回搜索地址
	public function from_get_url(){
		if(IS_AJAX){
			$url = U('SystemMenu/index',array('keyword' => $_POST['keyword']));
			$this->ajaxReturn(array('url' => $url));
		}
	}

	//获取子类id
	public function getChild($cate,$pid){
        $arr=array();
        foreach($cate as $k => $v){
            if($v['pid'] == $pid){
                $arr[]=$v['id'];
                $arr=array_merge($arr,$this->getChild($cate,$v['id']));
            }
        }
        return $arr;
    }

    public function auto()
    {
    	if (IS_POST) {
    		$post = I('post.','','trim,htmlspecialchars');
            $menu_object = D('SystemMenu');
            $del_map['module'] = $post['module'];
            $menu_object->where($del_map)->delete();
            $success = 0;
            $faild = 0;
			foreach ($post['info'] as $k => $v) {
				if (empty($v['title'])) continue;
				$menu = $v;
				$menu['ctime']  = NOW_TIME;
				$menu['utime']  = NOW_TIME;
				$menu['status'] = 1;
				$menu['module'] = $post['module'];
				$menu['node_id']= empty($v['url'])? 0:$this->url2node($v['url']);
	            $data = $menu_object->create($menu);
	            if($data){
	                $id = $menu_object->add();
	                if($id){
	                    $success++;
	                }else{
	                    $faild++;
	                }
	            }else{
                    $faild++;
	            }
			}
			$this->success('成功'.$success.'条数据，失败'.$faild.'条数据。');

    	}else{
	    	$module = I('module','ADMIN');
	    	$map['module'] = strtoupper($module);
	    	$SystemMenu=D('SystemMenu');
			$element = $SystemMenu->order('sort asc')->where($map)->select();
		    $tree = new \Common\Util\Tree();
		    $all_menu = $tree->list_to_tree($element); //所有系统菜单
		    $this->all_menu = $all_menu;
		    $this->max_id = $SystemMenu->order('id desc')->limit(1)->getField('id');
		    $this->module = $map['module'];
	    	$this->display();
    	}
    }
}
