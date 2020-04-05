const fs = require("fs");
const bodyParser = require('body-parser');
const cors = require('cors');

// Setting port and env
process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Creating express app
const express = require('express');
const app = express();

// Setting express app
app.use(cors({
  allowedHeaders : ['GET', 'POST', 'UPDATE', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}))
app.use(bodyParser.json({ type: 'application/*+json' , limit : "40mb"}))
app.use(bodyParser.urlencoded({ extended: true }))

// Setting routes by directory read
const routePath = "./src/routes";
fs.readdirSync(routePath).forEach(function(file) {
    var route = `${routePath}/${file}`;
    require(route)(app);
});

// Starting app
app.listen(process.env.PORT, () => {
  console.log(`Staring app at port ${process.env.PORT} with ENV ${process.env.PORT}.`);
});
