-- Create Database:

CREATE DATABASE tododb2
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

-- Kilistázza a meglévő adatbázisokat
\l

-- Adatbázis váltás (tododb = adatbázisneve)
\c tododb

-- automatikusan 1-es id-vel indulunk, ha ezt kitöröljük, de van egy 2-es akkor a 2-es 2-es marad
-- CREATE TABLE todos (
-- 	id SERIAL PRIMARY KEY,
--     title VARCHAR(255)

-- );

-- User registration and authentication model:
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    username VARCHAR(50),
    pw VARCHAR(255)
);

CREATE TABLE todos (
	id SERIAL PRIMARY KEY,
    userId INT NOT NULL REFERENCES users,
    importance SMALLINT NOT NULL DEFAULT 1,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE,
    created TIMESTAMP NOT NULL DEFAULT NOW()   
);



INSERT INTO todos(title) VALUES ('learnsql');

INSERT INTO todos(title) VALUES ('alma pucolas');


SELECT title FROM todos;

UPDATE [table_name]
SET [column1] = [value1], [column2] = [value2], ...
WHERE [condition];

const query = `
UPDATE users
SET age = 22
WHERE email = 'johndoe@gmail.com'
`;



INSERT INTO users (email, username, pw) VALUES ('johndoe@johndoe.com','johndoe','123456');

-- we need 255 character for pw, because hash (titkosításhoz)

DROP TABLE tablename;

SELECT * FROM tablename;


-- /adatbázis/
tododb2 

-- add foreign key
userId