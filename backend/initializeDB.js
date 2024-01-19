const mysql = require("mysql");
const db = require("./db");

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
            `DROP TABLE IF EXISTS users;`,
            `CREATE TABLE users (
                userId INT(11) NOT NULL AUTO_INCREMENT,
                name VARCHAR(255),
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255),
                PRIMARY KEY (userId)
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`
        );
        await setupTable(
            `DROP TABLE IF EXISTS accounts;`,
            `CREATE TABLE accounts (
                accountType varchar(255) NOT NULL,
                accountNumber VARCHAR(10) NOT NULL UNIQUE,
                balance DECIMAL(10, 2) NOT NULL,
                userId INT NOT NULL,
                PRIMARY KEY (accountNumber)
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`
        );
        await setupTable(
            `DROP TABLE IF EXISTS dashboard;`,
            `CREATE TABLE dashboard (
                recordId INT(11) NOT NULL AUTO_INCREMENT,
                email VARCHAR(255) NOT NULL,
                item1 FLOAT DEFAULT NULL,
                item2 FLOAT DEFAULT NULL,
                item3 FLOAT DEFAULT NULL,
                item4 FLOAT DEFAULT NULL,
                userId INT NOT NULL,
                PRIMARY KEY (recordId)
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`
        );

        await setupTable(
            `DROP TABLE IF EXISTS data;`,
            `CREATE TABLE data (
                id int(11) NOT NULL,
                name varchar(255) DEFAULT NULL,
                item varchar(255) DEFAULT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`
        );

        // Insert into tables
        await insertIntoTable(`INSERT INTO users (name, email, password) VALUES ?`, [
            ["user1", "user@example.com", "password"],
            ["xinyan", "xinyan@example.com", "password"],
        ]);
        await insertIntoTable(`INSERT INTO accounts (accountType, accountNumber, balance, UserId) VALUES ?`, [
            ["Savings Account", "0123456789", 1000.00, 3],
            ["Current Account", "9876543210", 1000.00, 3],
            ["Investment Account", "9876543212", 1000.00, 3],
        ]);
        await insertIntoTable(
            `INSERT INTO dashboard (email, item1, item2, item3, item4, userId) VALUES ?`,
            [
                ["user@example.com", 1.1, 2.2, 3.3, 4.4,3],
                ["user@example.com", 5.5, 6.6, 7.7, 8.8,3],
            ]
        );
        await insertIntoTable(
            `INSERT INTO data (id, name, item) VALUES ?`,
            [
                [1, "Item1", "Description1"],
                [2, "Item2", "Description2"],
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