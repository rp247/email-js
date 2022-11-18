-- User: email, name, pwd hash
DROP TABLE IF EXISTS people;

CREATE TABLE people(email varchar(30) PRIMARY KEY, pname VARCHAR(20), hash VARCHAR(256));
