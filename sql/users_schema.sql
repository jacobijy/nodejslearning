SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;
USE `nodejs`
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`(
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `useremail` varchar(255) NOT NULL COMMENT '邮箱',
  `signdate` date NOT NULL COMMENT '注册时间',
  `lastlogin` datetime NOT NULL COMMENT '上次登陆时间',
  `password` varchar(255) NOT NULL,
  `authority` ENUM('admin', 'manager','normal') NOT NULL DEFAULT 'normal',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

BEGIN;
INSERT INTO `users` VALUES('0', 'admin', 'astony.jy@outlook.com', '2018-03-24', '2018-03-24 15:53:20', 'admin', 'admin');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;