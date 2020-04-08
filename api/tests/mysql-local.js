const serverless = require('serverless-http');
const express = require('express');
const app = express();
var http = require("http");

const mysql = require('serverless-mysql')({
  config: {
    host     : process.env.MYSQL_LOCAL_HOST,
    database : process.env.MYSQL_LOCAL_DB,
    user     : process.env.MYSQL_LOCAL_USER,
    password : process.env.MYSQL_LOCAL_PASSWORD
  }
});

console.log(process.env.MYSQL_LOCAL_HOST);

app.get('/tests/mysql-local', function (req, res) {
  let results = mysql.query('show databases;')
  res.send('Hello Local MySQL!')
});

module.exports.handler = serverless(app);
