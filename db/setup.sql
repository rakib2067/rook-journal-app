DROP TABLE IF EXISTS posts;
CREATE TABLE posts(
    postID serial PRIMARY KEY,
    title varchar(100),
    content varchar(200) NOT NULL,
    giphy varchar(200),
    emo1 INT,
    emo2 INT,
    emo3 INT
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments(
    commentID serial PRIMARY KEY,
    timeOfPost timestamp ,
    input varchar(250),
    postID int
);


INSERT into posts(title, content,giphy,emo1,emo2,emo3)
VALUES
   ('test1','Test Description','https://media1.giphy.com/media/mznXgdZkk8KA2GMb2e/100.gif?cid=1253b2878qz6ziqwwjzgp3963qgce16v6xoum496iy7jp4y3&rid=100.gif&ct=g',1,0,0);

INSERT into comments(timeOfPost,input,postID)
VALUES (CURRENT_TIMESTAMP, 'Test Description',1);



SELECT * from posts;
-- insert into example(arr) values('{1, 2, 3}');

