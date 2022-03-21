DROP TABLE IF EXISTS post;
CREATE TABLE post(
    postID BIGSERIAL NOT NULL PRIMARY KEY,
    title varchar(100) NOT NULL,
    content varchar(200) NOT NULL,
    giphy varchar(200) NOT NULL,
    emo1 INT DEFAULT 0,
    emo2 INT DEFAULT 0,
    emo3 INT DEFAULT 0
);

DROP TABLE IF EXISTS comment;
CREATE TABLE comment(
    commentID BIGSERIAL NOT NULL PRIMARY KEY,
    timeOfPost timestamp ,
    input varchar(250),
    postID BIGINT REFERENCES post(postID)
);



