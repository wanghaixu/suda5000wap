<?php
namespace Common\VModel;
use Think\Model\ViewModel;

/**
 * 发票申请视图模型;
 */
class OrdersInvoiceVModel extends ViewModel {
	public $viewFields = array (
		'OrdersInvoice' => array('*'),
		'Orders' => array('*', '_on' => 'OrdersInvoice.or_id=Orders.or_id'),
	);
}
