const express = require("express");
const server = express();
const sha1 = require("sha1");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { schemaLogin } = require("../utils/validators");
const jwt = require("jsonwebtoken");

const userController = {};

server.use(express.static("public"));

//HERE WE GET THE AUTHENTICATION WITH THE TOKEN TO LOG IN.
userController.auth = async (req, res) => {
  const { username, password } = req.body;

  const { error } = schemaLogin.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });  

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });
    else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
      else {
        const { username, email, role, status } = user;
        const token = jwt.sign(
          {
            username,
            email,
            role,
            status,          
          },
            process.env.TOKEN_SECRET
        );
        res.status(200).send({ msg: 'Welcome', token });  
      }
    }  
  } catch (error) {
    res.sendStatus(error);
  }
};

// //FIRST GET OF THE USERS
userController.list = async (req, res) => {
  
  try {
    const users = await User.find();
    res.status(200).send(users);

    // const token = req.headers.authorization.replace("Bearer ", "");
    // const { is_admin } = jwt.verify(token, myKey);
    // const { user_id } = jwt.decode(token);
    // let sql = "SELECT user_id, username, is_admin, user_image FROM user"; //USER QUERY: IT BRINGS ALL THE FIELDS.
    // let sql2 = `SELECT * FROM user WHERE user_id != ${user_id} ORDER BY username asc`;
    // if (is_admin) {
    //   connection.query(sql, (error, results) => {
    //     if (error) console.log(error);

    //     res.send(
    //       results.map(user => ({ ...user, is_admin: Boolean(user.is_admin) }))
    //     );
    //   });
    // } else {
    //   connection.query(sql2, (error, results) => {
    //     if (error) console.log(error);

    //     res.send(results);
    //   });
    // }
  } catch {
    res.sendStatus(401);
  }
};

userController.save = async (req, res) => {

  const { error } = schemaRegister.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res.status(400).json({ error: "Email already registered" });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const { username, email, role, status } = req.body;

  const user = new User({
    username,
    email,
    password,
    role,
    status,
  });
  try {
    const savedUser = await user.save();
    res.json({
      error: null,
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

userController.getUser = async (req, res) => {

    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
      res.status(200).send(user);  
    } catch {
      res.sendStatus(401);
    }
  };

  userController.delete = async (req, res) => {

    const { userId } = req.params;
  
    try {
      const user = await User.deleteOne(userId);
      res.status(200).send(user);
      } catch {
      res.sendStatus(401);
    }
  };

  userController.update = async (req, res) => {

    const { userId } = req.params;
    const { error } = schemaRegister.validate(req.body);

    const { username, email, role, status } = req.body;

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    try {
      const user = await User.updateOne(userId);
      res.status(200).send(user);  
    } catch {
      res.sendStatus(401);
    }
  };

module.exports = userController;
