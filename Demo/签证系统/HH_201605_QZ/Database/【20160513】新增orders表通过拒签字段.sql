ALTER TABLE `qz_orders`
ADD COLUMN `or_pass_num`  int(11) NULL  COMMENT '通过人数' ;
ADD COLUMN `or_refuse_num`  int(11) NULL  COMMENT '拒签人数' ;