const express = require("express");
const server = express();
const sha1 = require("sha1");
let myKey = "rocknpediakey";
const UserProfile = require("../models/user-profile.model");
const bcrypt = require("bcrypt");
const { schemaRegister } = require("../utils/validators");

const userProfileController = {};

server.use(express.static("public"));

//HERE WE GET THE AUTHENTICATION WITH THE TOKEN TO LOG IN.
// usersController.auth = (request, response) => {
//   const { username, password } = request.body;
//   connection.query(
//     `SELECT *
//         FROM user
//         WHERE username = '${username}'
//         AND password = sha1('${password}');`,
//     function(error, results) {
//       if (error) console.log(error);
//       else if (results.length) {
//         const { is_admin, user_id, rol, user_image } = results[0];

//         const token = jwt.sign(
//           {
//             user_id,
//             username,
//             rol,
//             user_image,
//             is_admin: is_admin ? true : false
//           },
//           myKey
//         );
//         response.send({
//           token
//         });
//       } else {
//         response.sendStatus(400);
//       }
//     }
//   );
// };

userProfileController.save = async (req, res) => {

  const { error } = schemaRegister.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const isEmailExist = await UserProfile.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res.status(400).json({ error: "Email already registered" });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const { name, firstname, lastname, history } = req.body;

  const userProfile = new UserProfile({
    name,
    firstname,
    lastname,
    history,
  });
  try {
    const savedUserProfile = await userProfile.save();
    res.json({
      error: null,
      data: savedUserProfile,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

userProfileController.get = async (req, res) => {

    const { userId } = req.params;
  
    try {
      const userProfile = await userProfile.findById(userId);
      res.status(200).send(user);
  
      // const token = req.headers.authorization.replace("Bearer ", "");
      // const { is_admin } = jwt.verify(token, myKey);
      // const { user_id } = jwt.decode(token);
      // let sql = "SELECT user_id, username, is_admin, user_image FROM user"; //USER QUERY: IT BRINGS ALL THE FIELDS.
      // let sql2 = `SELECT * FROM user WHERE user_id != ${user_id} ORDER BY username asc`;
      // if (is_admin) {
      //   connection.query(sql, (error, results) => {
      //     if (error) console.log(error);
  
      //     res.send(
      //       results.map(user => ({ ...user, is_admin: Boolean(UserProfile.is_admin) }))
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

  userProfileController.delete = async (req, res) => {

    const { userId } = req.params;
  
    try {
      const user = await userProfile.deleteOne(userId);
      res.status(200).send(user);
  
      // const token = req.headers.authorization.replace("Bearer ", "");
      // const { is_admin } = jwt.verify(token, myKey);
      // const { user_id } = jwt.decode(token);
      // let sql = "SELECT user_id, username, is_admin, user_image FROM user"; //USER QUERY: IT BRINGS ALL THE FIELDS.
      // let sql2 = `SELECT * FROM user WHERE user_id != ${user_id} ORDER BY username asc`;
      // if (is_admin) {
      //   connection.query(sql, (error, results) => {
      //     if (error) console.log(error);
  
      //     res.send(
      //       results.map(user => ({ ...user, is_admin: Boolean(UserProfile.is_admin) }))
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

  userProfileController.update = async (req, res) => {

    const { userId } = req.params;
    const { error } = schemaRegister.validate(req.body);

    const { username, email, role, status } = req.body;

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    console.log('req.body', username)
    console.log('req.body', email)
    console.log('req.body', role)
    console.log('req.body', status)
  
    try {
      const user = await userProfile.updateOne(userId);
      res.status(200).send(user);
  
      // const token = req.headers.authorization.replace("Bearer ", "");
      // const { is_admin } = jwt.verify(token, myKey);
      // const { user_id } = jwt.decode(token);
      // let sql = "SELECT user_id, username, is_admin, user_image FROM user"; //USER QUERY: IT BRINGS ALL THE FIELDS.
      // let sql2 = `SELECT * FROM user WHERE user_id != ${user_id} ORDER BY username asc`;
      // if (is_admin) {
      //   connection.query(sql, (error, results) => {
      //     if (error) console.log(error);
  
      //     res.send(
      //       results.map(user => ({ ...user, is_admin: Boolean(UserProfile.is_admin) }))
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

module.exports = userProfileController;
