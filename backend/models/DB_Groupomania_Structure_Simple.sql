
CREATE TABLE IF NOT EXISTS users(
    id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email_H TEXT NOT NULL,
    email_Crypt TEXT NOT NULL,
    password_H VARCHAR(50) NOT NULL,
    job VARCHAR(50),
    photo_URL VARCHAR(255),
    division VARCHAR(75),
    users_roles TINYINT UNSIGNED,
    PRIMARY KEY (id),
    UNIQUE INDEX ind_email_H (email_H),
    UNIQUE INDEX ind_email_C (email_Crypt),
    CONSTRAINT fk_role
        FOREIGN KEY (users_roles)
        REFERENCES users_roles(id)

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
    CONSTRAINT fk_post
        FOREIGN KEY (post_Id)
        REFERENCES posts_list(id)

)
ENGINE=INNODB;

------------------------------

CREATE TABLE IF NOT EXISTS comments_like(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    comment_Id INT UNSIGNED NOT NULL,
    like_Id TINYINT UNSIGNED NOT NULL ,
    identity_Id MEDIUMINT UNSIGNED NOT NULL,   
    PRIMARY KEY (id),
    CONSTRAINT fk_comment
        FOREIGN KEY (comment_Id)
        REFERENCES comments_list(id),
    CONSTRAINT fk_post_Like
        FOREIGN KEY (like_Id)
        REFERENCES likes_type(id)

)
ENGINE=INNODB;

------------------------------

CREATE TABLE IF NOT EXISTS posts_like(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    post_Id INT UNSIGNED NOT NULL ,
    like_Id TINYINT UNSIGNED NOT NULL ,
    identity_Id MEDIUMINT UNSIGNED NOT NULL,   
    PRIMARY KEY (id),
    CONSTRAINT fk_post
        FOREIGN KEY (post_Id)
        REFERENCES posts_list(id),
    CONSTRAINT fk_post_Like
        FOREIGN KEY (like_Id)
        REFERENCES likes_type(id)
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

