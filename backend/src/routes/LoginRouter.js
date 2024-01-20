const express = require('express');
const mysql = require("mysql");
const db = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    const sqlSearch = "SELECT * FROM user WHERE username = ?";
    const search_query = mysql.format(sqlSearch, [username]);

    db.query(search_query, async (err, result) => {
        if (err) return res.status(500).send('Error during database query');
        if (result.length === 0) {
            return res.status(404).send({ message: "User does not exist" });
        }

        const hashedPassword = result[0].password;
        if (await bcrypt.compare(password, hashedPassword)) {
            const token = jwt.sign({ userId: result[0].userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            console.log(token)
            console.log(res)
            return res.json({ token, "status": 200 });
        } else {
            return res.status(403).send({ message: "Password Incorrect" });
        }
    });
});

router.post("/newUser", async (req, res) => {
    console.log("Receiving my newUser: ", req.body);
    const { firstName, lastName, username, password } = req.body;
    if (!firstName || !lastName || !username || !password) {
        return res.status(400).send('Missing name, email, or password');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sqlInsert = "INSERT INTO user (first_name, last_name, username, password) VALUES (?, ?, ?, ?)";
        db.query(sqlInsert, [firstName, lastName, username, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error while creating account');
            }
            console.log("--------> Created new User with ID:", result.insertId);
            res.status(201).send('User created successfully');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

module.exports = router;
