<?php
namespace Admin\Controller;
use Think\Controller;
class AjaxController extends Controller {

    public function uploadImg() {
        if(!empty($_FILES)) {
			$get = I('get.');
            // 实例化上传类
			$upload =  new \Think\Upload();
			$upload_path = 'temp/';
			$upload->savePath = $upload_path;
			//自定义上传规则
			$config = C('UPLOAD_CONFIG.image');
			$allow_max = $config['maxSize']; //读取配置
			$allow_exts = $config['exts']; //读取配置
			$allow_max && $upload->maxSize = $allow_max;   //文件大小限制
			$allow_exts && $upload->exts = $allow_exts;  //文件类型限制
			$upload->saveName = 'uniqid';
			$result = $upload->uploadOne($_FILES['file']);
			//pre($result);die;
			if ($result){
				$data['img'] = 'Uploads/'. $result['savepath'].$result['savename'];
				$image = new \Think\Image(); 
				$image->open('./'.$data['img']);
				$return_data['img_url'] = $data['img'];
				$return_data['status'] = 1;
				$return_data['info'] = $result;
				$return_data['width'] = $image->width()+30;
				$return_data['height'] = $image->height()+80;
				if($get){
					$w = $get['width'];
					$h = $get['height'];
					if(($w/$h) == ($image->width()/$image->height())){
						$this->ajaxReturn(array('status' => -1,'img_url' => $data['img']));
					}else{
						$return_data['url'] = U('Ajax/image',array('img_url' => urlencode($data['img']),'w' => $w,'h' => $h));
					}
				}else{
					$this->ajaxReturn(array('status' => -1,'img_url' => $data['img']));
					//$return_data['url'] = U('Ajax/image',array('img_url' => urlencode($data['img']),'w' => $image->width(),'h' => $image->height()));
				}
				$this->ajaxReturn($return_data);
			}else {
				$this->error($result);
				$this->ajaxReturn(array('status'=>0, 'info'=>$upload->getError()));
			}
        } else {
            $this->ajaxReturn(0,'非法操作');
        }
    }

	public function uploadFile(){
		 if(!empty($_FILES)) {
            // 实例化上传类
			$upload =  new \Think\Upload();
			$upload_path = 'temp/';
			$upload->savePath = $upload_path;
			//自定义上传规则
			$config = C('UPLOAD_CONFIG.image');
			$allow_max = $config['maxSize']; //读取配置
			$allow_exts = $config['exts']; //读取配置
			$allow_max && $upload->maxSize = $allow_max;   //文件大小限制
			$allow_exts && $upload->exts = $allow_exts;  //文件类型限制
			$upload->saveName = 'uniqid';
			$result = $upload->uploadOne($_FILES['file']);
			if ($result){
				$data['img'] = 'Uploads/'. $result['savepath'].$result['savename'];
				$return_data['img_url'] = $data['img'];
				$return_data['name'] = $result['name'];
				$return_data['status'] = 1;
				$this->ajaxReturn($return_data);
			}else {
				$this->error($result);
				$this->ajaxReturn(array('status'=>0, 'info'=>$upload->getError()));
			}
        } else {
            $this->ajaxReturn(0,'非法操作');
        }
	}

    function get_name(){
        if(IS_POST){
            $post = I('post.','','trim');
            $map['g_name'] = array('like','%'.$post['g_name'].'%');
            $data = M('group')->where($map)->field('g_key,g_name')->select();
            if($data){
                $this->success($data);
            }else{
                $this->error('找不到数据');
            }
        }
    }

	/*--------------------------------------------------*/
	//裁剪图片
	public function cut_image(){
		if(IS_AJAX){
			$data = I('post.');
			$url = $data['url'];
			$width = trim($data['width']);
			$height = trim($data['height']);
			$left = trim($data['left']);
			$top = trim($data['top']);
			$image = new \Think\Image();
			$image->open('.'.$url);
			$image->crop($width, $height,$left,$top)->save('.'.$url);
			$this->ajaxReturn(array('status' => 1));
		}
	}

	public function image(){
		$data = I('get.');
		//pre($data);die;
		$this->url = urldecode($data['img_url']);
		$this->w = $data['w'];
		$this->h = $data['h'];
		$this->display();
	}
}