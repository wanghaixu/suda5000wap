<?php

$_config = array (

    //URL模式
    'URL_MODEL' => '1',
    
    // 显示页面Trace信息
    'SHOW_PAGE_TRACE' =>true, 

    //全局过滤配置
    'DEFAULT_FILTER' => 'htmlspecialchars,trim', //TP默认为htmlspecialchars

    //预先加载的标签库
    'TAGLIB_PRE_LOAD' => 'Common\\TagLib\\Mo',

    //URL配置
    'URL_CASE_INSENSITIVE' => true, //不区分大小写

    //应用配置
    'DEFAULT_MODULE'     => 'Admin',
    'MODULE_DENY_LIST'   => array('Common'),
    'MODULE_ALLOW_LIST'  => array('Admin','Wap'),


    //文件上传相关配置
	 'UPLOAD_CONFIG' => array(
		'file' => array(
			'mimes'    => '', //允许上传的文件MiMe类型
			'maxSize'  => 2*1024*1024, //上传的文件大小限制 (0-不做限制，默认为2M，后台配置会覆盖此值)
			'autoSub'  => true, //自动子目录保存文件
			// 'subName'  => array('date', 'Y-m-d'), //子目录创建方式，[0]-函数名，[1]-参数，多个参数使用数组
			'rootPath' => './Uploads/', //保存根路径
			'savePath' => 'temp', //保存路径
			'saveName' => array('uniqid', ''), //上传文件命名规则，[0]-函数名，[1]-参数，多个参数使用数组
			'saveExt'  => '', //文件保存后缀，空则使用原后缀
			'replace'  => false, //存在同名是否覆盖
			'hash'     => true, //是否生成hash编码
			'callback' => false, //检测文件是否存在回调函数，如果存在返回文件信息数组
		),
		'image' => array(
			'mimes'    => '', //允许上传的文件MiMe类型
			'maxSize'  => 2*1024*1024, //上传的文件大小限制 (0-不做限制，默认为2M，后台配置会覆盖此值)
			'autoSub'  => true, //自动子目录保存文件
			// 'subName'  => array('date', 'Y-m-d'), //子目录创建方式，[0]-函数名，[1]-参数，多个参数使用数组
			'rootPath' => './Uploads/', //保存根路径
			'savePath' => 'temp', //保存路径
			'saveName' => array('uniqid', ''), //上传文件命名规则，[0]-函数名，[1]-参数，多个参数使用数组
			'saveExt'  => '', //文件保存后缀，空则使用原后缀
			'replace'  => false, //存在同名是否覆盖
			'hash'     => true, //是否生成hash编码
			'callback' => false, //检测文件是否存在回调函数，如果存在返回文件信息数组
		)
	 )
);

//返回合并的配置
return array_merge (
    $_config, //系统全局默认配置
    include APP_PATH.'/Common/Conf/deploy.php', //包含数据库连接配置
    include APP_PATH.'/Common/Builder/config.php', //包含Builder配置
    include APP_PATH.'/Common/Conf/interface.php' //包含自定义配置
);
