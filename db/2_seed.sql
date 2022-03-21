INSERT into post(title, content,giphy)
VALUES
   ('test1','Test Description','https://media1.giphy.com/media/mznXgdZkk8KA2GMb2e/100.gif?cid=1253b2878qz6ziqwwjzgp3963qgce16v6xoum496iy7jp4y3&rid=100.gif&ct=g');

INSERT into comment(timeOfPost,input,postID)
VALUES (CURRENT_TIMESTAMP, 'Test Description',1);



SELECT * from post;