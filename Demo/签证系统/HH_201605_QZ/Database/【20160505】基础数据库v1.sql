/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : qingzheng

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2016-05-05 13:58:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for qz_access
-- ----------------------------
DROP TABLE IF EXISTS `qz_access`;
CREATE TABLE `qz_access` (
  `role_id` smallint(6) NOT NULL,
  `node_id` smallint(6) NOT NULL,
  `level` tinyint(1) NOT NULL,
  `pid` smallint(6) DEFAULT NULL,
  `module` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_access
-- ----------------------------

-- ----------------------------
-- Table structure for qz_log
-- ----------------------------
DROP TABLE IF EXISTS `qz_log`;
CREATE TABLE `qz_log` (
  `log_key` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `u_key` int(11) DEFAULT NULL COMMENT '操作人外键',
  `g_key` int(11) DEFAULT NULL COMMENT '商家外键',
  `log_ip` int(11) DEFAULT NULL COMMENT 'ip',
  `log_time` int(11) DEFAULT NULL COMMENT '操作时间',
  `log_code` int(11) DEFAULT NULL COMMENT '操作编码',
  `log_url` varchar(255) DEFAULT NULL COMMENT '地址',
  PRIMARY KEY (`log_key`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_log
-- ----------------------------

-- ----------------------------
-- Table structure for qz_node
-- ----------------------------
DROP TABLE IF EXISTS `qz_node`;
CREATE TABLE `qz_node` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `sort` smallint(6) DEFAULT NULL,
  `pid` smallint(6) NOT NULL,
  `level` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=299 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_node
-- ----------------------------

-- ----------------------------
-- Table structure for qz_role
-- ----------------------------
DROP TABLE IF EXISTS `qz_role`;
CREATE TABLE `qz_role` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `pid` smallint(6) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_role
-- ----------------------------

-- ----------------------------
-- Table structure for qz_role_user
-- ----------------------------
DROP TABLE IF EXISTS `qz_role_user`;
CREATE TABLE `qz_role_user` (
  `role_id` mediumint(9) DEFAULT NULL,
  `user_id` char(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_role_user
-- ----------------------------

-- ----------------------------
-- Table structure for qz_system_config
-- ----------------------------
DROP TABLE IF EXISTS `qz_system_config`;
CREATE TABLE `qz_system_config` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '配置ID',
  `title` varchar(32) DEFAULT '' COMMENT '配置标题',
  `name` varchar(32) NOT NULL COMMENT '配置名称',
  `value` text NOT NULL COMMENT '配置值',
  `group` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '配置分组',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态',
  `create_id` int(11) NOT NULL,
  `create_date` int(11) NOT NULL,
  `last_update_id` int(11) NOT NULL,
  `last_update_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8 COMMENT='系统配置表';

-- ----------------------------
-- Records of qz_system_config
-- ----------------------------
INSERT INTO `qz_system_config` VALUES ('1', '', 'DEVELOP_MODE', '1', '0', '1', '0', '0', '0', '0');
INSERT INTO `qz_system_config` VALUES ('100', '', 'WEB_SITE_TITLE', '后台', '1', '1', '0', '1459926752', '0', '1459926752');
INSERT INTO `qz_system_config` VALUES ('101', '', 'WEB_SITE_LOGO', 'Uploads/logo/2016-04-06/5704b6dfa9f56.gif', '1', '1', '0', '1459926752', '0', '1459926752');

-- ----------------------------
-- Table structure for qz_system_menu
-- ----------------------------
DROP TABLE IF EXISTS `qz_system_menu`;
CREATE TABLE `qz_system_menu` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `pid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '上级菜单ID',
  `title` varchar(32) NOT NULL DEFAULT '' COMMENT '菜单名称',
  `url` varchar(127) NOT NULL DEFAULT '' COMMENT '链接地址',
  `icon` varchar(64) NOT NULL COMMENT '图标',
  `dev` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '是否开发模式可见',
  `ctime` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `utime` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  `sort` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '排序（同级有效）',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态',
  `module` varchar(10) NOT NULL COMMENT '分组名，存大写，如ADMIN，USER',
  `node_id` int(11) DEFAULT NULL COMMENT '节点ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=266 DEFAULT CHARSET=utf8 COMMENT='后台菜单表';

-- ----------------------------
-- Records of qz_system_menu
-- ----------------------------
INSERT INTO `qz_system_menu` VALUES ('2', '0', '系统', '', 'fa fa-cog', '0', '1459926399', '1459926399', '4', '1', 'ADMIN', '0');
INSERT INTO `qz_system_menu` VALUES ('7', '2', '系统功能', '', 'fa fa-folder-open-o', '0', '1459926399', '1459926399', '0', '1', 'ADMIN', '0');
INSERT INTO `qz_system_menu` VALUES ('9', '2', '数据中心', '', 'fa fa-folder-open-o', '0', '1459926399', '1459926399', '3', '1', 'ADMIN', '0');
INSERT INTO `qz_system_menu` VALUES ('14', '7', '系统设置', 'Admin/SystemConfig/index', 'fa fa-gears', '0', '1459926399', '1459926399', '1', '1', 'ADMIN', '212');
INSERT INTO `qz_system_menu` VALUES ('15', '14', '修改设置', 'Admin/SystemConfig/groupSave', '', '0', '1459926399', '1459926399', '1', '1', 'ADMIN', '288');
INSERT INTO `qz_system_menu` VALUES ('24', '7', '菜单管理', 'Admin/SystemMenu/index', 'fa fa-bars', '0', '1459926399', '1459926399', '3', '1', 'ADMIN', '214');
INSERT INTO `qz_system_menu` VALUES ('25', '24', '添加', 'Admin/SystemMenu/add', '', '0', '1459926399', '1459926399', '1', '1', 'ADMIN', '289');
INSERT INTO `qz_system_menu` VALUES ('26', '24', '编辑', 'Admin/SystemMenu/edit', '', '0', '1459926399', '1459926399', '2', '1', 'ADMIN', '290');
INSERT INTO `qz_system_menu` VALUES ('27', '24', '设置状态', 'Admin/SystemMenu/setStatus', '', '0', '1459926399', '1459926399', '3', '1', 'ADMIN', '291');
INSERT INTO `qz_system_menu` VALUES ('52', '9', '数据字典', 'Admin/Datebase/index', 'fa fa-database', '1', '1459926399', '1459926399', '1', '1', 'ADMIN', '114');
INSERT INTO `qz_system_menu` VALUES ('53', '9', '数据备份', 'Admin/Datebase/export', 'fa fa-copy', '0', '1459926399', '1459926399', '2', '1', 'ADMIN', '115');
INSERT INTO `qz_system_menu` VALUES ('54', '53', '备份', 'Admin/Datebase/do_export', '', '0', '1459926399', '1459926399', '1', '1', 'ADMIN', '120');
INSERT INTO `qz_system_menu` VALUES ('55', '53', '优化表', 'Admin/Datebase/optimize', '', '0', '1459926399', '1459926399', '2', '1', 'ADMIN', '117');
INSERT INTO `qz_system_menu` VALUES ('56', '53', '修复表', 'Admin/Datebase/repair', '', '0', '1459926399', '1459926399', '3', '1', 'ADMIN', '118');
INSERT INTO `qz_system_menu` VALUES ('57', '9', '数据还原', 'Admin/Datebase/import', 'fa fa-refresh', '1', '1459926399', '1459926399', '3', '1', 'ADMIN', '116');
INSERT INTO `qz_system_menu` VALUES ('58', '57', '还原备份', 'Admin/Datebase/do_import', '', '0', '1459926399', '1459926399', '1', '1', 'ADMIN', '121');
INSERT INTO `qz_system_menu` VALUES ('59', '57', '删除备份', 'Admin/Datebase/del', '', '0', '1459926399', '1459926399', '2', '1', 'ADMIN', '119');
INSERT INTO `qz_system_menu` VALUES ('99', '2', '权限管理', '', 'fa fa-eye', '0', '1459926399', '1459926399', '1', '1', 'ADMIN', '0');
INSERT INTO `qz_system_menu` VALUES ('161', '99', '管理员列表', 'Admin/Access/index', 'fa fa-adjust', '0', '1459926399', '1459926399', '0', '1', 'ADMIN', '99');
INSERT INTO `qz_system_menu` VALUES ('162', '99', '角色管理', 'Admin/Access/role_list', 'fa fa-anchor', '0', '1459926399', '1459926399', '0', '1', 'ADMIN', '126');
INSERT INTO `qz_system_menu` VALUES ('163', '99', '节点管理', 'Admin/Access/nodeList', 'fa fa-arrows', '1', '1459926399', '1459926399', '0', '1', 'ADMIN', '105');
INSERT INTO `qz_system_menu` VALUES ('164', '161', '新增管理员', 'Admin/Access/add_admin', 'fa fa-bell', '0', '1459926399', '1459926399', '0', '1', 'ADMIN', '100');
INSERT INTO `qz_system_menu` VALUES ('165', '161', '编辑管理员', 'Admin/Access/edit_admin', 'fa fa-bell-o', '0', '1459926399', '1459926399', '0', '1', 'ADMIN', '101');
INSERT INTO `qz_system_menu` VALUES ('166', '162', '添加角色', 'Admin/Access/addRole', 'fa fa-cab', '0', '1459926399', '1459926399', '0', '1', 'ADMIN', '296');
INSERT INTO `qz_system_menu` VALUES ('167', '162', '编辑角色', 'Admin/Access/editAdmin', 'fa fa-calendar', '0', '1459926399', '1459926399', '0', '1', 'ADMIN', '297');
INSERT INTO `qz_system_menu` VALUES ('170', '163', '编辑节点', 'Admin/Access/editNode', 'fa fa-comment-o', '0', '1459926399', '1459926399', '0', '1', 'ADMIN', '122');
INSERT INTO `qz_system_menu` VALUES ('171', '162', '编辑角色', 'Admin/Access/editRole', 'fa fa-calendar', '0', '1459926399', '1459926399', '0', '1', 'ADMIN', '295');
INSERT INTO `qz_system_menu` VALUES ('172', '163', '添加节点', 'Admin/Access/addNode', 'fa fa-bars', '0', '1459926399', '1459926399', '0', '1', 'ADMIN', '106');
INSERT INTO `qz_system_menu` VALUES ('174', '14', '基本', 'Admin/system_config/index', '', '0', '1459926399', '1459926399', '0', '1', 'ADMIN', '287');
INSERT INTO `qz_system_menu` VALUES ('205', '0', '信息管理', '', 'fa fa-folder-open-o', '0', '1457515326', '1457943424', '2', '1', 'USER', '0');
INSERT INTO `qz_system_menu` VALUES ('206', '205', '客户管理', '', 'fa fa-folder-open-o', '0', '1457515453', '1457943513', '0', '1', 'USER', '0');
INSERT INTO `qz_system_menu` VALUES ('207', '206', '客户列表', 'User/Member/index', 'fa fa-gears', '0', '1457515498', '1457515498', '1', '1', 'USER', '273');
INSERT INTO `qz_system_menu` VALUES ('208', '207', '客户新增', 'User/Member/add', 'fa fa-bars', '0', '1457516196', '1457516660', '2', '1', 'USER', '274');
INSERT INTO `qz_system_menu` VALUES ('209', '207', '客户编辑', 'User/Member/edit', 'fa fa-cogs', '0', '1457516689', '1457516711', '0', '1', 'USER', '275');
INSERT INTO `qz_system_menu` VALUES ('211', '205', '车辆管理', '', 'fa fa-th-large', '0', '1457517070', '1457517070', '1', '1', 'USER', '0');
INSERT INTO `qz_system_menu` VALUES ('212', '211', '车辆列表', 'User/Car/index', 'fa fa-adjust', '0', '1457517109', '1457517109', '0', '1', 'USER', '223');
INSERT INTO `qz_system_menu` VALUES ('213', '212', '车辆添加', 'User/Car/add', 'fa fa-database', '0', '1457517154', '1457525347', '0', '1', 'USER', '224');
INSERT INTO `qz_system_menu` VALUES ('214', '212', '车辆编辑', 'User/Car/edit', 'fa fa-copy', '0', '1457517300', '1457517300', '0', '1', 'USER', '225');
INSERT INTO `qz_system_menu` VALUES ('216', '205', '导入管理', '', 'fa fa-refresh', '0', '1457517356', '1457517528', '3', '1', 'USER', '0');
INSERT INTO `qz_system_menu` VALUES ('217', '216', '导入记录', 'User/Import/index', 'fa fa-adjust', '0', '1457517502', '1457517502', '0', '1', 'USER', '277');
INSERT INTO `qz_system_menu` VALUES ('218', '217', '导入', 'User/Import/import', 'fa fa-anchor', '0', '1457517575', '1457517654', '0', '1', 'USER', '279');
INSERT INTO `qz_system_menu` VALUES ('219', '217', '确认导入', 'User/Import/submit', 'fa fa-arrows', '0', '1457517642', '1457517642', '0', '1', 'USER', '279');
INSERT INTO `qz_system_menu` VALUES ('220', '0', '运营管理', '', 'fa fa-bell', '0', '1457517685', '1457517713', '3', '1', 'USER', '0');
INSERT INTO `qz_system_menu` VALUES ('221', '0', '增值服务', '', 'fa fa-bell-o', '0', '1457517748', '1457518046', '1', '1', 'USER', '0');
INSERT INTO `qz_system_menu` VALUES ('222', '221', '服务保单', '', 'fa fa-cab', '0', '1457517822', '1457524514', '0', '1', 'USER', '262');
INSERT INTO `qz_system_menu` VALUES ('223', '222', '待办保单', 'User/Orders/todo', 'fa fa-calendar', '0', '1457517872', '1457517872', '1', '1', 'USER', '280');
INSERT INTO `qz_system_menu` VALUES ('224', '222', '所有保单', 'User/Orders/index', 'fa fa-comment-o', '0', '1457517902', '1457517902', '2', '1', 'USER', '281');
INSERT INTO `qz_system_menu` VALUES ('225', '222', '退保信息', 'User/Orders/back_orders', 'fa fa-calendar', '0', '1457517944', '1457517967', '3', '1', 'USER', '280');
INSERT INTO `qz_system_menu` VALUES ('226', '221', '对账管理', '', 'fa fa-bars', '0', '1457518104', '1457518104', '2', '1', 'USER', '0');
INSERT INTO `qz_system_menu` VALUES ('227', '226', '结算账单', 'User/Finance/f_list', 'fa fa-calendar', '0', '1457518188', '1457518291', '2', '1', 'USER', '220');
INSERT INTO `qz_system_menu` VALUES ('228', '226', '对账清单', 'User/Finance/orders_list', 'fa fa-code-fork', '0', '1457518245', '1457518245', '1', '1', 'USER', '283');
INSERT INTO `qz_system_menu` VALUES ('230', '224', '录入保单', 'User/Orders/add', 'fa fa-briefcase', '0', '1457590072', '1457590072', '0', '1', 'USER', '273');
INSERT INTO `qz_system_menu` VALUES ('246', '220', '组织架构', '', 'fa fa-wechat', '0', '1457935496', '1457935496', '0', '1', 'USER', '0');
INSERT INTO `qz_system_menu` VALUES ('247', '246', '员工管理', 'User/Employee/index', 'fa fa-book', '0', '1457935544', '1457935544', '0', '1', 'USER', '228');
INSERT INTO `qz_system_menu` VALUES ('252', '224', '修改保单', 'User/Orders/edit', 'fa fa-caret-square-o-up', '0', '1457944388', '1457944518', '0', '1', 'USER', '273');
INSERT INTO `qz_system_menu` VALUES ('260', '220', '统计报表', '', 'fa fa-database', '0', '1458899665', '1458899665', '0', '1', 'USER', '0');
INSERT INTO `qz_system_menu` VALUES ('261', '260', '服务套餐统计', 'User/Statistics/service', 'fa fa-cutlery', '0', '1458899778', '1458899778', '0', '1', 'USER', '282');
INSERT INTO `qz_system_menu` VALUES ('262', '260', '销售额统计', 'User/Statistics/sale', 'fa fa-signal', '0', '1458899806', '1458899806', '0', '1', 'USER', '283');
INSERT INTO `qz_system_menu` VALUES ('263', '260', '收支统计', 'User/Statistics/in_out', 'fa fa-cny', '0', '1458899829', '1458899829', '0', '1', 'USER', '284');
INSERT INTO `qz_system_menu` VALUES ('265', '24', '自动菜单', 'Admin/SystemMenu/auto', '', '0', '1459926399', '1459926399', '0', '1', 'ADMIN', '298');

-- ----------------------------
-- Table structure for qz_user
-- ----------------------------
DROP TABLE IF EXISTS `qz_user`;
CREATE TABLE `qz_user` (
  `u_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `u_username` varchar(50) DEFAULT NULL COMMENT '用户id',
  `u_type` tinyint(1) DEFAULT NULL COMMENT '用户类型：\r\n10: 平台管理人员  20：商家用户  ',
  `u_mobile` char(11) DEFAULT NULL COMMENT '手机号码',
  `u_pwd` varchar(50) DEFAULT NULL COMMENT '密码',
  `u_count` int(10) DEFAULT '0' COMMENT '登录次数',
  `u_remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `u_last_login` int(11) DEFAULT NULL COMMENT '最后登录时间',
  `status` int(11) DEFAULT NULL,
  `create_id` int(11) DEFAULT NULL,
  `create_date` int(11) DEFAULT NULL,
  `last_update_id` int(11) DEFAULT NULL,
  `last_update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_user
-- ----------------------------
INSERT INTO `qz_user` VALUES ('1', 'admin', '10', '', '0c7540eb7e65b553ec1ba6b20de79608', '0', '', '0', '1', '0', '0', '0', '0');
