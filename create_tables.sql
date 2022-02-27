CREATE TABLE IF NOT EXISTS `users` (
    `id` INTEGER NOT NULL auto_increment ,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) DEFAULT NULL,
    `api_key` VARCHAR(255) NOT NULL,
    `secret_key` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS `candles` (
    `id` INTEGER NOT NULL auto_increment ,
    `currency` VARCHAR(50) NOT NULL,
    `time_frame`VARCHAR(50) NOT NULL, 
    `open` DECIMAL(10,2) NOT NULL,
    `high` DECIMAL(10,2) NOT NULL,
    `low` DECIMAL(10,2) NOT NULL,
    `close` DECIMAL(10,2) NOT NULL,
    `volume` DECIMAL(10,2) NOT NULL,
    `date` DATETIME,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `indicators` (
    `id` INTEGER NOT NULL auto_increment ,
    `candle_id` INTEGER NOT NULL,
    `currency` VARCHAR(10) NOT NULL,
    `date` DATETIME NOT NULL,
    `data` JSON NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`candle_id`) REFERENCES `candles` (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `orders` (
    `id` INTEGER NOT NULL auto_increment ,
    `candle_id` INTEGER NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `type` VARCHAR(15) NOT NULL,
    `side` VARCHAR(10) NOT NULL,
    `currency` VARCHAR(10) NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `quantity` DECIMAL(10,2) NOT NULL,
    `stop_price` DECIMAL(10,2) NOT NULL,
    `strategy_id` VARCHAR(255) NOT NULL,
    `status`ENUM("canceled", "executed"),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`candle_id`) REFERENCES `candles` (`id`)
) ENGINE=InnoDB;
