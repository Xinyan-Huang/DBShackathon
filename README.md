# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Pre-requisite
Ensure that mySql and Node.js is installed

## backend
```bash
#create .env file and add in the ACCESS_TOKEN_SECRET.

#New terminal
$ cd backend
$ npm install
$ node initializeDB.js (create database with sample data)
$ node index.js --> 'Server up and running... on port 5001' if successful
```

## frontend
```bash
#New terminal
$ cd frontend
$ npm install
$ npm start
```

## MySQL
```bash
# 1. Ensure that the service is working. troubleshoot Windows+R enter service.msc and check that MySql server is running
# 1. enter server and create schema 'dday' (else change the code in backend in db.js)

# there is error for authentication when creating database execute the following in mysql shell:
#(change authentication method)
$ \connect root@localhost:3306 --password
$ ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'password';
$ FLUSH PRIVILEGES;
```


//Local host 5001 for backend
//Local host 3000 for frontend

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.