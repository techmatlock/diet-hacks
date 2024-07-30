-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

INSERT INTO "posts" ("title", "subtitle", "body", "userId", "categoryId", "totalVotes", "views", "createdAt")
VALUES ('Chomp''s Zero Sugar Beef Stick', 100, 'Only 100 calories, zero sugar and 10G of protein.', 1, 2, 12, 24, now());

insert into "users" ("username", "email", "password", "role", "createdAt")
values ('markm', 'hello@gmail.com', 'password123', 'user', now());

insert into "categories" ("name")
values ('snacks')