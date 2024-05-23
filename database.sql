-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

-- Create a database called "fs-react-shopping"

DROP TABLE IF EXISTS "grocery";

CREATE TABLE grocery (
	id SERIAL PRIMARY KEY,
	name varchar(80),
	quantity numeric,
	unit varchar(20)
);

-- POST grocery item (seed data)
INSERT INTO "grocery" ("name", "quantity", "unit") 
VALUES ('apples', '1', 'lb'), ('oranges', '2', 'lb'), ('milt', '1', 'gal');

-- GET grocery
SELECT * FROM "grocery";

-- UPDATE
UPDATE "grocery" SET "name"='braeburn apples', "quantity"='2', "unit"='bag'  WHERE "id"='2' RETURNING *;

-- DELETE
DELETE FROM "grocery" WHERE "id"='1';

-- POST another grocery item
INSERT INTO "grocery" ("name", "quantity", "unit") 
VALUES ('granny smith apples', '1', 'lb') RETURNING *;

