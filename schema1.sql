DROP DATABASE IS EXISTS store_db
CRATE DATABASE store_db;
USE store_db

CREATE TABLE product(
    id INT AUTO_INCREMENT NOT NULL,
    first_name WARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE purchase(
    id INT AUTO_INCREMENT NOT NULL,
    first_name WARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE customer(
    id INT AUTO_INCREMENT NOT NULL,
    first_name WARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE pruduct(
    id INT AUTO_INCREMENT NOT NULL,
    first_name WARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
)