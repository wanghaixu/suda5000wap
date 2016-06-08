<?php
namespace Admin\Controller;
use Think\Controller;

/**
 * 签证服务管理控制器;
 */
class ServiceController extends CommonController {

	/**
	 * 列表;
	 */
	public function index() {
		$data = I('get.', '', 'trim');
		$result['data'] = $data;
		$map_service = array();
		if ($data['keyword'] != '') {
			$keyword = '%'.$data['keyword'].'%';
			$search['ser_country'] = array('like', $keyword);
			$search['ser_country_code'] = array('like', $keyword);
			$search['_logic'] = 'or';
			$map_service['_complex'] = $search;
		}
		if ($data['type'] != '') {
			$map_service['ser_type'] = array('EQ', $data['type']);
		}
		$M_service = M('Service');
		$service = $M_service->where($map_service)->page($data['p'], 1)->select();
		$result['service'] = $service;
		$count = $M_service->where($map_service)->count();
		$pager = new \Think\Page($count, 1);
		$show = $pager->show();
		$result['show'] = $show;
		$result['types'] = array('1'=>'旅游观光', '2'=>'探亲访友', '3'=>'商务', '4'=>'留学', '5'=>'移民','6'=>'工作');
		$this->assign('result', $result);
		$this->display();
	}
}