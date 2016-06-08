<?php
namespace Common\Tools;
/* 封装生成二维码工具类*/
/*
*传入参数：$content(文本内容),$filename(生成的二维码图片名),$size(二维码图片大小，默认4),$level(容错率，默认L级)
*传出参数：$url(二维码图片保存路径)
*/
class QrcodeTools{
	public static function make($content,$filename,$size = 4,$level = "L"){
	 	Vendor("phpqrcode.phpqrcode");
	 	$QRcode = new \QRcode();
	 	$path = "./Uploads/Qrcode/".$filename.".png";
	 	$QRcode->png($content,$path,$level,$size);
	 	$url = "Uploads/Qrcode/".$filename.".png";
	 	return $url;
	}
}
?>