CREATE TABLE IF NOT EXISTS users_connect(
    id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email_H VARCHAR(255) NOT NULL,
    password_H VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX ind_email_H (email_H)
)
ENGINE=INNODB;

------------------------------

CREATE TABLE IF NOT EXISTS users_identity(
    id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email_H VARCHAR(255) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email_Crypt TEXT NOT NULL,
    job VARCHAR(50),
    photo_URL VARCHAR(255),
    division VARCHAR(75),
    PRIMARY KEY (id),
    UNIQUE INDEX ind_email_H (email_H)

)
ENGINE=INNODB;

------------------------------

CREATE TABLE IF NOT EXISTS users_roles(
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    role_Name VARCHAR(50) NOT NULL,
    image_URL VARCHAR(255) NOT NULL,   
    PRIMARY KEY (id)
)
ENGINE=INNODB;

------------------------------

CREATE TABLE IF NOT EXISTS users_matchs(
    id MEDIUMINT(8) UNSIGNED NOT NULL AUTO_INCREMENT,
    connect_Id MEDIUMINT(8) UNSIGNED NOT NULL,
    identity_Id MEDIUMINT(8) UNSIGNED NOT NULL,   
    roles_Id TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
)
ENGINE=INNODB;

------------------------------

CREATE TABLE IF NOT EXISTS posts_list(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(100),
    content TEXT NOT NULL,   
    timecode DATETIME NOT NULL,   
    identity_Id MEDIUMINT UNSIGNED NOT NULL,   
    PRIMARY KEY (id)
)
ENGINE=INNODB;

------------------------------

CREATE TABLE IF NOT EXISTS comments_list(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    post_Id INT UNSIGNED NOT NULL,
    comment TEXT NOT NULL,
    timecode DATETIME NOT NULL,   
    identity_Id MEDIUMINT UNSIGNED NOT NULL,   
    PRIMARY KEY (id)
)
ENGINE=INNODB;

------------------------------

CREATE TABLE IF NOT EXISTS comments_like(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    comment_Id INT UNSIGNED NOT NULL,
    like_Id TINYINT UNSIGNED NOT NULL ,
    identity_Id MEDIUMINT UNSIGNED NOT NULL,   
    PRIMARY KEY (id)
)
ENGINE=INNODB;

------------------------------

CREATE TABLE IF NOT EXISTS posts_like(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    post_Id INT UNSIGNED NOT NULL ,
    like_Id TINYINT UNSIGNED NOT NULL ,
    identity_Id MEDIUMINT UNSIGNED NOT NULL,   
    PRIMARY KEY (id)
)
ENGINE=INNODB;

------------------------------

CREATE TABLE IF NOT EXISTS likes_type(
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    like_name VARCHAR(30) NOT NULL ,
    image_URL VARCHAR(255) NOT NULL,   
    PRIMARY KEY (id)
)
ENGINE=INNODB;

------------------------------

