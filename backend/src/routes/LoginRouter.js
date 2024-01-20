const express = require('express');
const mysql = require("mysql");
const db = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const sqlSearch = "SELECT * FROM user WHERE username = ?";
    const search_query = mysql.format(sqlSearch, [username]);

    db.query(search_query, async (err, result) => {
        if (err) return res.status(500).send('Error during database query');
        if (result.length === 0) {
            return res.status(404).send({ message: "User does not exist" });
        }

        const hashedPassword = result[0].password;
        // if (await bcrypt.compare(password, hashedPassword)) {
        if (password == result[0].password) {
            const token = jwt.sign({ userId: result[0].userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            console.log(token)
            console.log(res)
            return res.json({ token });
        } else {
            return res.status(403).send({ message: "Password Incorrect" });
        }
    });
});

module.exports = router;
