const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const app = express()
var http = require("http");

app.get('/tests/mongo-local', function (req, res) {
  mongoose.connect(
      'mongodb://'+
      process.env.MONGO_LOCAL_USER+':'+
      process.env.MONGO_LOCAL_PASSWORD+'@'+
      process.env.MONGO_LOCAL_HOST+':'+'27017/'+
      process.env.MONGO_LOCAL_DB+
      '?connectTimeoutMS=1000&bufferCommands=false&authSource='+
      process.env.MONGO_LOCAL_DB,
      {useNewUrlParser: true}
  );
  res.send('Hello Local Mongo!')
});

module.exports.handler = serverless(app);
