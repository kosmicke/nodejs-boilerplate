const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require("fs");

require('express-async-errors');

// Setting port and env
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Load local env config if env is not prod
if(process.env.NODE_ENV != 'prod'){
  const dotenv = require('dotenv');
  dotenv.config();
}

// Creating express app
const app = express();

// Setting express app
app.use(cors({
  allowedHeaders: ['GET', 'POST', 'UPDATE', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}))
app.use(bodyParser.json({ limit: "40mb" }))
app.use(bodyParser.urlencoded({ extended: true }))

// Setting routes by directory read
const routePath = "./src/routes";
fs.readdirSync(routePath).forEach(function (file) {
  var route = `${routePath}/${file}`;
  require(route)(app);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  if(err.code){
    res.status(err.code).send({ message : err.message })
  }else{
    res.status(500).send({ message : 'An error occured.' })
  }
});

// Connecting database
const mongoConfig = require('./src/config/mongodb.config');
mongoConfig.startConnection();

// Starting app
app.listen(process.env.PORT, () => {
  console.log(`Staring app at port ${process.env.PORT} with ENV ${process.env.NODE_ENV}.`);
});
