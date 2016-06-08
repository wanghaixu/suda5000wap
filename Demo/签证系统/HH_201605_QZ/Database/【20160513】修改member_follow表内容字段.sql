ALTER TABLE `qz_member_follow`
CHANGE COLUMN `mf_contect` `mf_content`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '跟进内容' AFTER `mf_time`,
AUTO_INCREMENT=1;