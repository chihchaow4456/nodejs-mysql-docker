CREATE DATABASE koma_web;
use koma_web;

CREATE TABLE user ( 
u_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(64) not null,
name VARCHAR(20) not null,
password VARCHAR(20) not null
);

CREATE TABLE article(
a_id    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
title	VARCHAR(16) NOT NULL,
content	TEXT,
created_on	DATETIME NOT NULL,
u_id	int unsigned not null,
FOREIGN KEY(u_id) REFERENCES user(u_id) ON DELETE CASCADE
);
