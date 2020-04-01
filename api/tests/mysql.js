const serverless = require('serverless-http');
const express = require('express')
const app = express()
var http = require("http");

const mysql = require('serverless-mysql')({
  config: {
    host     : process.env.SOSURE_DB_HOST,
    database : process.env.SOSURE_DB,
    user     : process.env.SOSURE_DB_USERNAME,
    password : process.env.SOSURE_DB_PASSWORD
  }
});

console.log(process.env.SOSURE_DB_HOST);

app.get('/tests/mysql', function (req, res) {
  let results = mysql.query('SELECT * FROM table')
  res.send('Hello World!')
});

module.exports.handler = serverless(app);
