# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
## prerequiste
Ensure that mySql and Node.js is installed

## backend

//create .env file and add in the ACCESS_TOKEN_SECRET.

//New terminal
//1. cd backend
//2. npm install
//3. node initializeDB.js (create database with sample datanpm run start)
//4. node index.js --> 'Server up and running... on port 5001' if successful
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Frontend
//New terminal
//1. npm install
//2. npm start


## MySql
//things to take note:
// 1. Ensure that the service is working. troubleshoot Windows+R enter service.msc and check that MySql server is running
// 2. enter server and create schema 'dday' (else change the code in backend in db.js)

//if there is error for authentication when creating database execute the following in mysql shell:
//(change authentication method)
// 1. \connect root@localhost:3306 --password
// 2. ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'password';
FLUSH PRIVILEGES;



//Local host 5001 for backend
//Local host 3000 for frontend