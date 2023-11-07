const http = require('http');
const express = require('express');
const app = express();
const connectDB = require('./config/db.js');
const bodyparser = require('body-parser');

connectDB.connect();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

 
const hostname = '127.0.0.1';
const port = process.env.port || 3000;
let usersRouter = require('./routes/user.js');
 
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/,`);
});

app.use('/user', usersRouter)
