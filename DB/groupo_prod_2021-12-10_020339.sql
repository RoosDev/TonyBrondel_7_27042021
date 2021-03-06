
DROP TABLE IF EXISTS users_roles;
CREATE TABLE `users_roles` (
  `id` int unsigned NOT NULL,
  `role_Name` varchar(50) NOT NULL,
  `image_URL` varchar(255) NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users_roles` VALUES ('1', 'user', null, null, null);
INSERT INTO `users_roles` VALUES ('2', 'manager', null, null, null);
INSERT INTO `users_roles` VALUES ('3', 'admin', null, null, null);

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email_H` varchar(300) NOT NULL,
  `email_Crypt` varchar(500) NOT NULL,
  `password_H` varchar(500) NOT NULL,
  `job` varchar(50) DEFAULT NULL,
  `photo_URL` varchar(255) DEFAULT NULL,
  `division` varchar(75) DEFAULT NULL,
  `role_Id` int unsigned DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `last_Connexion` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ind_email_H` (`email_H`),
  UNIQUE KEY `email_H` (`email_H`),
  KEY `fk_role` (`role_Id`),
  CONSTRAINT `fk_role` FOREIGN KEY (`role_Id`) REFERENCES `users_roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 ;

INSERT INTO users VALUES(1, 'change me', 'change me', '60cb723ad41d7023e8902dfa35aef4fe1279bfc4cabed866dff09f925257451e', 'U2FsdGVkX1/ykC6hqShPEwMDBoqqBS8AekvnMth6yHwwDK4KkOOwofsuPGMqroiD', '$argon2id$v=19$m=4096,t=36,p=1,data=MjIwZWFlMzFhMjZlNGUxYjhiNjMzMGJiMjg3ZmJkYzQ3N2FiMDQ4NWI5NTgwYTM0MmJkZTQ2ZTkyMTM2YjdjYg$GaSH9psPm5119+bMHtboYA$oSxTI7onZ9irmVldifKN6wlyaxXB9wR1R7d1nredAiGhSzRa3LNklr+JnrlrgMm9WkfEQuHQ7399U+JhtHKl1BonSv0gRaBpq3Oc0UCQwzxytUhmYMddoELaczcT7tRZrGLEdk9TGmpzh7IzDcu6EXLS2M/K0SN72miIGrsGUC6cWoyuiucLZ6TdPiJUq3k9dpHkjhka/dQRi5H2FVxZHkxL65WF8qf1vxMKHgkNCiFm1YQqqO+MBnpbBapLohY84XdCuiWzqmzpv2hSL/44cvDPcleKKLZifYw6o0ECF/UxnckJGu8OavUVwWzBIBV94JN2MOqH7v9sozELlSB/5g', 'change me', null, 'change me', 3, 1, now(), now(), now() );

DROP TABLE IF EXISTS likes_type;
CREATE TABLE `likes_type` (
  `id` int unsigned NOT NULL,
  `like_name` varchar(30) NOT NULL,
  `image_URL` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS post_comment_list;
CREATE TABLE `post_comment_list` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `content` text,
  `image_URL` varchar(500) DEFAULT NULL,
  `reference` int unsigned DEFAULT NULL,
  `identity_Id` int unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ind_identity` (`identity_Id`),
  KEY `fk_listcomments_of_post` (`reference`),
  CONSTRAINT `fk_identity` FOREIGN KEY (`identity_Id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_listcomments_of_post` FOREIGN KEY (`reference`) REFERENCES `post_comment_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=315 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS posts_like;
CREATE TABLE `posts_like` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `post_comment_Id` int unsigned DEFAULT NULL,
  `like_Id` int unsigned DEFAULT NULL,
  `identity_Id` int unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_comment_like` (`post_comment_Id`),
  KEY `fk_Like` (`like_Id`),
  KEY `ind_identity` (`identity_Id`),
  CONSTRAINT `fk_identity_like` FOREIGN KEY (`identity_Id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_Like` FOREIGN KEY (`like_Id`) REFERENCES `likes_type` (`id`),
  CONSTRAINT `fk_post_comment_like` FOREIGN KEY (`post_comment_Id`) REFERENCES `post_comment_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 ;
