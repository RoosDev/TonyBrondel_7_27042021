START TRANSACTION ; 

INSERT INTO user_connect [(email_H, password_H)] VALUE(,);

INSERT INTO user_identity [(firstname, lastname, email_Crypt, job, photo_URL, division, active)] VALUE(,);

COMMIT; 




START TRANSACTION ; 

INSERT INTO posts_list [(title, content, timecode, identity_Id)] VALUE(,);

COMMIT; 




START TRANSACTION ; 

SELECT * FROM posts_list WHERE id=?? FOR UPDATE;

UPDATE INTO posts_list [(title, content, timecode)] VALUE (,) ;

COMMIT; 
