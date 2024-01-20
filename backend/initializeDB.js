const mysql = require("mysql");
const db = require("./db");
const bcrypt = require('bcryptjs');

const setupTable = async (dropQuery, createQuery) => {
    await new Promise((resolve, reject) => {
        db.query(dropQuery, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
    await new Promise((resolve, reject) => {
        db.query(createQuery, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const insertIntoTable = async (insertQuery, values) => {
    await new Promise((resolve, reject) => {
        db.query(insertQuery, [values], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};
const setupDb = async () => {
    try {
        // Setup tables
        await setupTable(
            `DROP TABLE IF EXISTS country;`,
            `CREATE TABLE country (
                id int(10) unsigned NOT NULL AUTO_INCREMENT,
                name varchar(50) NOT NULL,
                KEY PK (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
        );
        await setupTable(
            `DROP TABLE IF EXISTS user;`,
            `CREATE TABLE user (
                id int(10) unsigned NOT NULL AUTO_INCREMENT,
                first_name varchar(50) NOT NULL,
                last_name varchar(50) NOT NULL,
                password varchar(255) NOT NULL,
                username varchar(20) NOT NULL,
                KEY PK (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
        );
        await setupTable(
            `DROP TABLE IF EXISTS destination;`,
            `CREATE TABLE destination (
                id INT(10) unsigned NOT NULL AUTO_INCREMENT,
                country_id int(10) unsigned NOT NULL,
                cost float NOT NULL DEFAULT 0,
                name varchar(50) NOT NULL,
                notes mediumtext DEFAULT NULL,
                KEY PK (id),
                KEY DestinationCountryFK (country_id),
                CONSTRAINT DestinationCountryFK FOREIGN KEY (country_id) REFERENCES country (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
        );
        await setupTable(
            `DROP TABLE IF EXISTS itinerary;`,
            `CREATE TABLE itinerary (
                id int(10) unsigned NOT NULL AUTO_INCREMENT,
                country_id int(10) unsigned NOT NULL DEFAULT 0,
                user_id int(10) unsigned NOT NULL DEFAULT 0,
                budget float unsigned NOT NULL DEFAULT 0,
                title varchar(100) NOT NULL DEFAULT '0',
                KEY PK (id),
                KEY ItineraryCountryFK (country_id),
                KEY ItineraryUserFK (user_id),
                CONSTRAINT ItineraryCountryFK FOREIGN KEY (country_id) REFERENCES country (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT ItineraryUserFK FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
        );
        await setupTable(
            `DROP TABLE IF EXISTS itinerary_destination;`,
            `CREATE TABLE itinerary_destination (
                id int(10) unsigned NOT NULL AUTO_INCREMENT,
                destination_id int(10) unsigned NOT NULL DEFAULT 0,
                itineray_id int(10) unsigned NOT NULL DEFAULT 0,
                KEY PK (id),
                KEY IDDestinationFK (destination_id),
                KEY IDItineraryFK (itineray_id),
                CONSTRAINT IDDestinationFK FOREIGN KEY (destination_id) REFERENCES destination (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT IDItineraryFK FOREIGN KEY (itineray_id) REFERENCES itinerary (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
        );

        // Insert into tables
        await insertIntoTable(`INSERT INTO country (id, name) VALUES ?`, [
            [1, "Singapore"]
        ]);
        await insertIntoTable(
            `INSERT INTO user (id, first_name, last_name, password, username) VALUES ?`,
            [
                [1, 'John', 'Doe', await bcrypt.hash('johndoe123', 10), 'johndoe'],
                [2, 'Emily', 'Smith', await bcrypt.hash('emilysmith456', 10), 'emilysmith'],
                [3, 'David', 'Brown', await bcrypt.hash('davidbrown789', 10), 'davidbrown']
            ]
        )
        await insertIntoTable(`INSERT INTO destination (id, country_id, cost, name, notes) VALUES ?`, [
            [1, 1, 50, 'Marina Bay Sands', 'Iconic hotel with an infinity pool and stunning views of the city skyline. Open 24/7.'],
            [2, 1, 30, 'Gardens by the Bay', 'Futuristic park featuring Supertree Grove and Flower Dome conservatories. Open daily from 9 AM to 9 PM.'],
            [3, 1, 40, 'Sentosa Island', 'Fun-filled island resort with beaches, theme parks, and various attractions. Open daily from 10 AM to 7 PM.'],
            [4, 1, 60, 'Universal Studios Singapore', 'Amusement park with movie-themed rides and entertainment. Open daily from 10 AM to 7 PM.'],
            [5, 1, 35, 'Singapore Zoo', 'Award-winning zoo showcasing diverse wildlife species. Open daily from 8:30 AM to 6 PM.']
        ]);
        await insertIntoTable(
            `INSERT INTO itinerary (id, country_id, user_id, budget, title) VALUES ?`,
            [
                [1, 1, 1, 500, 'Sightseeing in Singapore'],
                [2, 1, 1, 800, 'Singapore Adventure'],
                [3, 1, 2, 600, 'Exploring Singapore']
            ]
        );
        await insertIntoTable(
            `INSERT INTO itinerary_destination (id, destination_id, itineray_id) VALUES ?`,
            [
                [1, 1, 1],
                [2, 2, 1],
                [3, 3, 1],
                [4, 4, 2],
                [5, 5, 2],
                [6, 2, 3]
            ]
        )

        console.log("All operations completed successfully");
    } catch (err) {
        console.error("An error occurred:", err);
    } finally {
        db.end();
    }
};

setupDb();