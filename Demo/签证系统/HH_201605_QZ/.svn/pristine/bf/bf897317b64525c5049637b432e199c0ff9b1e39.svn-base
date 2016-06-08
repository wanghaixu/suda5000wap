<?php 
namespace Admin\Controller;
use Think\Controller;

/**
 * 发票管理控制器;
 */
class InvoiceController extends CommonController {

	/**
	 * 发票列表;
	 */
	public function index(){
		$data = I('get.', '', 'trim');
		$map_invoice = array();
		if (($data['status'] != '') && ($data['status'] != 2)) {
			$map_invoice['oi_status'] = $data['status'];
		} else {
			$data['status'] = 2;
		}
		$D_invoice = D('Common/OrdersInvoice', 'VModel');
		$invoices = $D_invoice->where($map_invoice)->order('oi_id desc')->page($data['p'], 25)->select();
		$count = $D_invoice->where($map_invoice)->order('oi_id desc')->count();
		$pager = new \Think\Page($count, 25);
		$show = $pager->show();
		$this->assign('show', $show);
		$this->assign('invoices', $invoices);
		$this->assign('status', $data['status']);
		$this->display();
	}

	/**
	 * 完成开票;
	 */
	public function complete() {
		if (IS_POST) {
			$data = I('post.', '', 'trim');
			if (empty($data['oi_id'])) {
				$this->ajaxReturn(array('status'=>0, 'info'=>'无法完成开票'));
			} else {
				$data['oi_status'] = 1;
				$result = M('OrdersInvoice')->save($data);
				if ($result) {
					$this->ajaxReturn(array('status'=>1, 'info'=>'已完成开票'));
				} else {
					$this->ajaxReturn(array('status'=>0, 'info'=>'无法完成开票'));
				}
			}
		} else {
			$this->ajaxReturn(array('status'=>0, 'info'=>'无法完成开票'));
		}
	}
}