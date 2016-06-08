ALTER TABLE `qz_member_follow`
ADD COLUMN `mem_id`  int(11) NULL COMMENT '客户外键' AFTER `u_id`;

