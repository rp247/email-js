-- User: email, name, pwd hash
DROP TABLE IF EXISTS people;

CREATE TABLE people(email varchar(30) PRIMARY KEY, pname VARCHAR(20), hash VARCHAR(256));

DROP TABLE IF EXISTS mail;

CREATE TABLE mail(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), mailbox VARCHAR(32), mail jsonb);
