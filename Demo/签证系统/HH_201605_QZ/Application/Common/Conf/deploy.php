<?php
    // 数据表前缀
    $db_prefix = 'qz_';
    //数据库配置
    $db_config = array(
        'DB_DEBUG'  =>  true,
        'DB_TYPE'   => $_SERVER[ENV_PRE.'DB_TYPE'] ? : 'mysql', //数据库类型
        'DB_HOST'   => $_SERVER[ENV_PRE.'DB_HOST'] ? : '127.0.0.1', //服务器地址
        'DB_NAME'   => $_SERVER[ENV_PRE.'DB_NAME'] ? : 'qianzheng', //数据库名
        'DB_USER'   => $_SERVER[ENV_PRE.'DB_USER'] ? : 'root', //用户名
        'DB_PWD'    => $_SERVER[ENV_PRE.'DB_PWD']  ? : 'root',  //密码
        'DB_PORT'   => $_SERVER[ENV_PRE.'DB_PORT'] ? : '3306', //端口
        'DB_PREFIX' => $_SERVER[ENV_PRE.'DB_PREFIX'] ? : $db_prefix, //数据库表前缀
        'DB_PARAMS' => array(\PDO::ATTR_CASE => \PDO::CASE_NATURAL), //如果数据表字段名采用大小写混合需配置此项);
    );
    // rbac 配置
    $rbac_config = array(
        /*
         * 以下是RBAC认证配置信息
         */
        'USER_AUTH_ON' => true,
        'USER_AUTH_TYPE' => 1, // 默认认证类型 1 登录认证 2 实时认证
        'USER_AUTH_KEY' => 'authId', // 用户认证SESSION标记
        'ADMIN_AUTH_KEY'   => 'admin',
        'AUTH_PWD_ENCODER' => 'md5', // 用户认证密码加密方式encrypt
        // 'USER_AUTH_GATEWAY' => '/admin/Public/index', // 默认认证网关
        'NOT_AUTH_MODULE' => 'Public', // 默认无需认证模块
        // 'REQUIRE_AUTH_MODULE' => '', // 默认需要认证模块
        // 'NOT_AUTH_ACTION' => '', // 默认无需认证操作
        // 'REQUIRE_AUTH_ACTION' => '', // 默认需要认证操作
        // 'GUEST_AUTH_ON' => false, // 是否开启游客授权访问
        // 'GUEST_AUTH_ID' => 0, // 游客的用户ID
        'USER_AUTH_MODEL' => $db_prefix.'user', // 默认验证数据表模型
        'RBAC_ROLE_TABLE' => $db_prefix.'role',
        'RBAC_USER_TABLE' => $db_prefix.'role_user',
        'RBAC_ACCESS_TABLE' => $db_prefix.'access',
        'RBAC_NODE_TABLE' => $db_prefix.'node',
    );

return array_merge($rbac_config,$db_config);
