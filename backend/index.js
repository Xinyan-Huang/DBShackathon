const express = require('express');
const app = express();
const cors = require("cors");
var cookieParser = require("cookie-parser");
app.use(express.json());
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require("mysql");

//authentication
function authenticate(req, res, next) {
    const auth = req.headers.authorization;
    const token = auth && auth.split(" ")[1];
    console.log(token, "HI");
    console.log(auth)
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log("User is verified");
        if (err) return res.sendStatus(403);
        req.user = user;
        console.log(user, "user");
        next();
    });
}
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

// CRUD USER
app.post("/createUser", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send('Missing name, email, or password');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sqlInsert = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(sqlInsert, [name, email, hashedPassword], (err, result) => {
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
});

app.post("/verifyUser", async (req, res) => {
    const { email, password } = req.body;
    const sqlSearch = "SELECT * FROM users WHERE email = ?";
    const search_query = mysql.format(sqlSearch, [email]);

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
            return res.json({ token });
        } else {
            return res.status(403).send({ message: "Password Incorrect" });
        }
    });
});

app.delete("/deleteUser", authenticate, (req, res) => {
    const userId = req.user.userId;
    const sqlDelete = "DELETE FROM accounts WHERE userId = ?";
    const delete_query = mysql.format(sqlDelete, [userId]);

    db.query(delete_query, (err, result) => {
        if (err) return res.status(500).send('Error during database query');
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "User not found" });
        }
        return res.send({ message: "Account deleted successfully" });
    });
});

//CRUD ACCOUNTS 
app.post("/createAccount", authenticate, (req, res) => {
    const { accountType, accountNumber, balance } = req.body;
    const userId = req.user.userId;
    const sqlInsert = "INSERT INTO accounts (accountType, accountNumber, balance, userId) VALUES (?, ?, ?, ?)";
    const insert_query = mysql.format(sqlInsert, [accountType, accountNumber, balance, userId]);

    db.query(insert_query, (err, result) => {
        if (err) return res.status(500).send('Error during database query');
        res.status(201).send({ message: 'Account created successfully' });
    });
});

app.get("/getAccount", authenticate, (req, res) => {
    console.log("I am in my getAccount");
    const userId = req.user.userId;

    const sqlSelect = "SELECT * FROM accounts WHERE userId = ?";
    const select_query = mysql.format(sqlSelect, [userId]);

    db.query(select_query, (err, result) => {
        if (err) return res.status(500).send('Error during database query');
        if (result.length === 0) {
            return res.status(404).send({ message: "No accounts found for the user" });
        }
        res.json(result);
    });
})

app.put("/updateAccount", authenticate, (req, res) => {
    const { balance, accountNumber } = req.body;
    const userId = req.user.userId;

    const sqlUpdate = "UPDATE accounts SET balance = ? WHERE accountNumber = ? AND userId = ?";
    const update_query = mysql.format(sqlUpdate, [balance, accountNumber, userId]);

    db.query(update_query, (err, result) => {
        if (err) return res.status(500).send('Error during database query');
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Account not found or user mismatch" });
        }
        res.send({ message: "Account updated successfully" });
    });
});

app.put("/transfer", authenticate, async (req, res) => {
    const { senderAccount, receiverAccount, value } = req.body;
    //const userId = req.user.userId;

    // Start a database transaction
    db.beginTransaction(err => {
        if (err) {
            return res.status(500).send('Error starting transaction');
        }

        // Check if sender has enough balance
        const checkBalanceQuery = "SELECT balance FROM accounts WHERE accountNumber = ?";
        db.query(checkBalanceQuery, [senderAccount], (err, results) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).send('Error during database query');
                });
            }

            if (results.length === 0 || results[0].balance < value) {
                return db.rollback(() => {
                    res.status(400).send({ message: "Insufficient balance or account not found" });
                });
            }

            //Deduct balance from sender's account
            const deductBalanceQuery = "UPDATE accounts SET balance = balance - ? WHERE accountNumber = ?";
            db.query(deductBalanceQuery, [value, senderAccount], (err, result) => {
                if (err || result.affectedRows === 0) {
                    return db.rollback(() => {
                        res.status(500).send('Error during balance deduction');
                    });
                }

                //Add balance to receiver's account
                const addBalanceQuery = "UPDATE accounts SET balance = balance + ? WHERE accountNumber = ?";
                db.query(addBalanceQuery, [value, receiverAccount], (err, result) => {
                    if (err || result.affectedRows === 0) {
                        return db.rollback(() => {
                            res.status(500).send('Error during balance addition');
                        });
                    }

                    // Commit the transaction
                    db.commit(err => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(500).send('Error during transaction commit');
                            });
                        }

                        res.send({ message: "Transaction completed successfully" });
                    });
                });
            });
        });
    });
});


app.delete("/deleteAccount", authenticate, (req, res) => {
    const userId = req.user.userId;
    const { accountNumber } = req.body; // Receive accountNumber from the request body

    // Ensure the account belongs to the authenticated user before deleting
    const sqlDelete = "DELETE FROM accounts WHERE accountNumber = ? AND userId = ?";
    const delete_query = mysql.format(sqlDelete, [accountNumber, userId]);

    db.query(delete_query, (err, result) => {
        if (err) return res.status(500).send('Error during database query');
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Account not found or user mismatch" });
        }
        res.send({ message: "Account deleted successfully" });
    });
});

app.post('/insertdashboard', (req, res) => {
    const { email, item1, item2, item3, item4 } = req.body;
    const sql = 'INSERT INTO dashboard (email, item1, item2, item3, item4) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [email, item1, item2, item3, item4], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Record created successfully', id: result.insertId });
    });
});
//CRUD Dashboard (sample)
app.post('/dashboard', authenticate, (req, res) => {
    const { email, item1, item2, item3, item4, userId } = req.body;
    const sqlInsert = 'INSERT INTO dashboard (email, item1, item2, item3, item4, userId) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sqlInsert, [email, item1, item2, item3, item4, userId], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).send({ message: 'Dashboard entry created successfully', id: result.insertId });
    });
});

app.get('/dashboard/:userId', authenticate, (req, res) => {
    const userId = req.params.userId;
    const sqlSelect = 'SELECT * FROM dashboard WHERE userId = ?';
    db.query(sqlSelect, [userId], (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

app.put('/updateDashboard', authenticate, (req, res) => {
    const { email, item1, item2, item3, item4, userId, recordId } = req.body;
    const sqlUpdate = 'UPDATE dashboard SET email = ?, item1 = ?, item2 = ?, item3 = ?, item4 = ?, userId =? WHERE recordId = ?';
    db.query(sqlUpdate, [email, item1, item2, item3, item4, userId, recordId], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'Dashboard entry not found' });
        res.send({ message: 'Dashboard entry updated successfully' });
    });
});

app.delete('/deleteDashboard/:recordId', authenticate, (req, res) => {
    const { recordId } = req.params; // Extracting recordId from the URL parameter

    const sqlDelete = 'DELETE FROM dashboard WHERE recordId = ?';
    db.query(sqlDelete, [recordId], (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error during database operation');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Dashboard entry not found' });
        }
        res.send({ message: 'Dashboard entry deleted successfully' });
    });
});
//Backend Listens to port 5001, your axios calls should be localhost:5001
app.listen(5001, () => console.log("Server up and running... on port 5001"));