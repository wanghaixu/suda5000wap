<?php
namespace Common\Model;
use Org\Util\Rbac;
use Think\Model;

class MemberModel extends Model{
		protected $_validate = array(
		array('mem_name','require','姓名不能为空！'),
		array('mem_code','require','身份证不能为空！'),
		array('mem_passport','require','护照号码不能为空！'),
		array('mem_address','require','常驻地不能为空！'),
		array('mem_birthday','require','出生日期不能为空！'),
		array('mem_mobile','require','联系方式不能为空！'),
	);

	//新增客户
	public function add_mem($post){
		//身份证查重
		$c_map['mem_code'] = $post['mem_code'];
		$c_like = $this->where($c_map)->find();
		if($c_like){
             return array('status'=>0,'info'=>'已存在身份证');
        }
        //护照号码查重
        $p_map['mem_passport'] = $post['mem_passport'];
        $p_like = $this->where($p_map)->find();
        if($p_like){
             return array('status'=>0,'info'=>'已存在护照号码');
        }

		$post['mem_birthday'] = strtotime($post['mem_birthday']);
		$post['mem_sign'] = 1;
		$post['mem_ctime'] = NOW_TIME;

		if (!$this->create($post))
				return array('status'=>0,'info'=>$this->getError());
		if ($this->add($post)) 
            return array('status'=>1,'info'=>'录入成功！','url'=>U('index'));
        return array('status'=>0,'info'=>'录入失败，请刷新重新试试！');
	}

	//编辑客户
	public function edit_mem($post){

		$post['mem_birthday'] = strtotime($post['mem_birthday']);
		$post['mem_stime'] = time();

		if (!$this->create($post))
				return array('status'=>0,'info'=>$this->getError());

		$mem_map['mem_id'] = $post['mem_id'];
		if($this->where($mem_map)->save($post))
			 return array('status'=>1,'info'=>'编辑成功！','url'=>U('index'));
        return array('status'=>0,'info'=>'编辑失败，请刷新重新试试！');

	}

	//删除客户
	public function del($mem_id){
		if(M('Member')->where(array('mem_id' => array('in',$mem_id)))->delete()){
			return array('status' => 1,'url' => U('Member/index'),'info' => '删除成功');
		}else{
			return array('status' => 0,'info' => '删除失败');
		}
	}

	//导入客户
	public function import(){
		if(!empty($_FILES['excel']['name'])) {
            $upload = new \Think\Upload();
            $upload->maxSize   =     3145728 ;
            $upload->exts      =     array('xls','xlsx');
            $upload->rootPath  =     './Uploads/'; 
            $upload->savePath  =     'temp/'; 
            $upload->saveName  =     array('uniqid',''); 
            $upload->autoSub   =     false; 
            $result = $upload->uploadOne($_FILES['excel']);
            session('Filepath',$_FILES['excel']['name']);
            if ($result){
                $filename = $upload->rootPath.$result['savepath'].$result['savename'];
                import("Org.Util.PHPExcel");
                $PHPReader = new \PHPExcel_Reader_Excel2007();
                if (!$PHPReader->canRead($filename)) {
                    $PHPReader = new \PHPExcel_Reader_Excel5();
                    if (!$PHPReader->canRead($filename)) {
                        $this->error('文件上传错误！');
                    }
                }
                $PHPExcel = $PHPReader->load($filename);
                $sheet = $PHPExcel->getSheet(0);
                $allRow = $sheet->getHighestRow(); //取得一共有多少行
		        $field = array(
		                        0=>'mem_name',
		                        1=>'mem_code',
		                        2=>'mem_passport',
		                        3=>'mem_address',
		                        4=>'mem_sex',
		                        5=>'mem_mobile',
		                        6=>'mem_birthday',
		                        7=>'mem_ctime',
		                    );
		        $import = new \Common\Tools\ExcelTools();
		        $data = $import->importExcel2($sheet,$field);
		        unlink(filename);
				return $data;
           }else{
                return $upload->getError();
            }
        }else{
            $message = '请选择文件';
            return $message;
        }
	}

	public function submit($data){
    	if(!$data && is_array($data)){
    		return array('status'=>0,'info'=>'数据有错误,请重新操作','url'=>U('import'));
    	}

    	$memSuccess = 0;
    	$memFaile = 0;
    	$memRepate = 0;


		foreach($data['info'] as $k){
	    	$mem['mem_ctime'] = NOW_TIME;
	    	$mem['mem_filename'] = session('Filepath');
	    	$mem['or_create_uid'] = session('user_info.u_id');
	    	$mem['mem_name'] = $k['mem_name'];
	    	$mem['mem_code'] = $k['mem_code'];
	    	$mem['mem_passport'] = $k['mem_passport'];
	    	$mem['mem_address'] = $k['mem_address'];
	    	$mem['mem_sex'] = $k['mem_sex'];
	    	$mem['mem_mobile'] = $k['mem_mobile'];
	    	$mem['mem_ctime'] =strtotime($k['mem_ctime']);
	    	$mem['mem_birthday'] =strtotime($k['mem_birthday']);
	    	//身份证或者护照号码查重
	    	$map['mem_code'] = $k['mem_code'];
	    	$map['mem_passport'] = $k['mem_passport'];
	    	$map['_logic'] = 'OR';
	    	$member = $this->where($map)->find();
	    	if(!$member){
		    	if($this->add($mem)){
		    		$memSuccess++;
		    	}else{
		    		$memFaile++;
		    	}
		    }else{
		    	$memRepate++;
		    }
			$ret['memSuccess'] = $memSuccess;
			$ret['memFaile'] = $memFaile;
			$ret['memRepate'] = $memRepate;
		}
		return $ret;
	}	

	//增加跟进记录
	public function add_follow($post){
		$post['mf_stime'] = NOW_TIME;
		$post['mf_time'] = strtotime($post['mf_time']);
		if (M('member_follow')->add($post)) 
            return array('status'=>1,'info'=>'录入成功！','url'=>U('follow',array('id'=>$post['mem_id'])));
        return array('status'=>0,'info'=>'录入失败，请刷新重新试试！');
	}

	//编辑跟进记录
	public function edit_follow($post){
		$post['mf_time'] = strtotime($post['mf_time']);
		$post['mf_stime'] = NOW_TIME;
		$map['mf_id'] = $post['mf_id'];
		if (M('member_follow')->where($map)->save($post)) 
            return array('status'=>1,'info'=>'录入成功！','url'=>U('follow',array('id'=>$post['mem_id'])));
        return array('status'=>0,'info'=>'录入失败，请刷新重新试试！');
	}

	//删除跟进记录
	public function del_follow($mf_id){
		if(M('member_follow')->where(array('mf_id' => array('in',$mf_id)))->delete()){
			return array('status' => 1,'url' => U('Follow/index'),'info' => '删除成功');
		}else{
			return array('status' => 0,'info' => '删除失败');
		}
	}
}