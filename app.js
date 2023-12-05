const http = require('http');
const express = require('express');
const app = express();
const connectDB = require('./config/db.js');
const bodyparser = require('body-parser');
var cors = require('cors')

connectDB.connect();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors())

 
const hostname = '127.0.0.1';
const port = process.env.port || 3000;
let userRouter = require('./routes/user.js');
let userProfileRouter = require('./routes/user-profile.js');
 
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/,`);
});

app.use('/user', userRouter)
app.use('/user-profile', userProfileRouter)
