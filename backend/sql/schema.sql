-- User: email, name, pwd hash
DROP TABLE IF EXISTS mail;
CREATE TABLE user(email CITEXT PRIMARY KEY, pname VARCHAR(20), hash VARCHAR(256));
