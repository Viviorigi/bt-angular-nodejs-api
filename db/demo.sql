DROP DATABASE `btl`;
CREATE DATABASE `btl` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `btl` ;
CREATE TABLE IF NOT EXISTS `categories`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    PRIMARY KEY `pk_id`(`id`)
);

CREATE TABLE IF NOT EXISTS `products`( 
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `price` FLOAT NOT NULL,
    `image` VARCHAR(255),
    `category_id` INT  ,
     PRIMARY KEY `pk_id`(`id`)
);
ALTER TABLE `products`
ADD FOREIGN KEY(`category_id`)
REFERENCES `categories` (`id`);

CREATE TABLE IF NOT EXISTS `adminacc`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50),
    `password` varchar(50),
    PRIMARY KEY `pk_id`(`id`)
);
CREATE TABLE IF NOT EXISTS `customeracc`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50),
    `password` varchar(50),
    PRIMARY KEY `pk_id`(`id`)
);

