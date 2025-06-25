USE tenji;

--
-- テーブル有無で削除
--

DROP TABLE IF EXISTS `owner`;
DROP TABLE IF EXISTS `ownership`;

--
-- テーブル作成（preset系は外部キーが存在するので、先に実施）
--
CREATE TABLE `owner` (
  `email` varchar(1024) NOT NULL DEFAULT '',
  `name` varchar(1024) NOT NULL DEFAULT '',
  `admin_flg` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `ownership` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) NOT NULL DEFAULT '0',
  `email` varchar(1024) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



