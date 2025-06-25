--
-- DB、ユーザ作成
--

CREATE DATABASE tenji;
CREATE USER 'test'@'%'
  IDENTIFIED BY 'test';
GRANT SELECT,INSERT,UPDATE,DELETE
  ON tenji.*
  TO 'test'@'%';


--
-- tenjiデータベースへテーブルを作成
--

USE tenji;

--
-- テーブル有無で削除
--

DROP TABLE IF EXISTS `preset_blockcategory`;
DROP TABLE IF EXISTS `preset_messagecategory`;

DROP TABLE IF EXISTS `authorities`;
DROP TABLE IF EXISTS `blockdata`;
DROP TABLE IF EXISTS `blockmessage`;
DROP TABLE IF EXISTS `blockmessage_en`;
DROP TABLE IF EXISTS `blockmessage_hi`;
DROP TABLE IF EXISTS `blockmessage_ko`;
DROP TABLE IF EXISTS `blockmessage_zh`;
DROP TABLE IF EXISTS `mesT`;
DROP TABLE IF EXISTS `placedata`;
DROP TABLE IF EXISTS `users`;


--
-- テーブル作成（preset系は外部キーが存在するので、先に実施）
--

CREATE TABLE `preset_blockcategory` (
  `category` varchar(256) NOT NULL,
  `category_jp` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `preset_messagecategory` (
  `messagecategory` varchar(256) NOT NULL,
  `messagecategory_jp` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`messagecategory`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `authorities` (
  `authority_id` int(11) NOT NULL,
  `authority_name` varchar(16) NOT NULL,
  PRIMARY KEY (`authority_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `blockdata` (
  `code` int(11) NOT NULL,
  `category` varchar(256) DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `install` int(11) NOT NULL,
  `buildingfloor` int(11) DEFAULT NULL,
  `name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`code`),
  KEY `fk_blockcategory` (`category`),
  CONSTRAINT `blockdata_ibfk_1` FOREIGN KEY (`category`) REFERENCES `preset_blockcategory` (`category`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `blockmessage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) NOT NULL,
  `angle` int(11) NOT NULL,
  `messagecategory` varchar(256) NOT NULL,
  `message` varchar(1024) DEFAULT NULL,
  `reading` varchar(1024) DEFAULT NULL,
  `wav` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_code` (`code`),
  KEY `fk_messagecategory` (`messagecategory`),
  CONSTRAINT `blockmessage_ibfk_1` FOREIGN KEY (`code`) REFERENCES `blockdata` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `blockmessage_ibfk_2` FOREIGN KEY (`messagecategory`) REFERENCES `preset_messagecategory` (`messagecategory`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5409 DEFAULT CHARSET=utf8;

CREATE TABLE `blockmessage_en` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) NOT NULL,
  `angle` int(11) NOT NULL,
  `messagecategory` varchar(256) NOT NULL,
  `message` varchar(1024) DEFAULT NULL,
  `reading` varchar(1024) DEFAULT NULL,
  `wav` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_code` (`code`),
  KEY `fk_messagecategory` (`messagecategory`),
  CONSTRAINT `blockmessage_en_ibfk_1` FOREIGN KEY (`code`) REFERENCES `blockdata` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `blockmessage_en_ibfk_2` FOREIGN KEY (`messagecategory`) REFERENCES `preset_messagecategory` (`messagecategory`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4902 DEFAULT CHARSET=utf8;

CREATE TABLE `blockmessage_hi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) NOT NULL,
  `angle` int(11) NOT NULL,
  `messagecategory` varchar(256) NOT NULL,
  `message` varchar(1024) DEFAULT NULL,
  `reading` varchar(1024) DEFAULT NULL,
  `wav` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_code` (`code`),
  KEY `fk_messagecategory` (`messagecategory`)
) ENGINE=InnoDB AUTO_INCREMENT=2023 DEFAULT CHARSET=utf8;

CREATE TABLE `blockmessage_ko` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) NOT NULL,
  `angle` int(11) NOT NULL,
  `messagecategory` varchar(256) NOT NULL,
  `message` varchar(1024) DEFAULT NULL,
  `reading` varchar(1024) DEFAULT NULL,
  `wav` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_code` (`code`),
  KEY `fk_messagecategory` (`messagecategory`)
) ENGINE=InnoDB AUTO_INCREMENT=4498 DEFAULT CHARSET=utf8;

CREATE TABLE `blockmessage_zh` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) NOT NULL,
  `angle` int(11) NOT NULL,
  `messagecategory` varchar(256) NOT NULL,
  `message` varchar(1024) DEFAULT NULL,
  `reading` varchar(1024) DEFAULT NULL,
  `wav` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_code` (`code`),
  KEY `fk_messagecategory` (`messagecategory`)
) ENGINE=InnoDB AUTO_INCREMENT=3552 DEFAULT CHARSET=utf8;

CREATE TABLE `mesT` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) NOT NULL,
  `angle` int(11) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `name` varchar(256) DEFAULT NULL,
  `message` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

CREATE TABLE `placedata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(256) DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `address` varchar(1024) DEFAULT NULL,
  `name` varchar(256) DEFAULT NULL,
  `summary` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_placecategory` (`category`),
  CONSTRAINT `placedata_ibfk_1` FOREIGN KEY (`category`) REFERENCES `preset_blockcategory` (`category`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(1024) NOT NULL,
  `code` int(11) NOT NULL DEFAULT '1',
  `authority_id` int(11) NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`),
  KEY `fk_code` (`code`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`code`) REFERENCES `blockdata` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

