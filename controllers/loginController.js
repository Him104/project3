const authorModel = require("../models/authorModel.js");
const jwt = require('jsonwebtoken'); 

const login = async function (req, res) {
    try {
      const data = req.body;
      if (!data.email) {
        return res
          .status(400)
          .send({ status: false, msg: "Email is required field" });
      }
      if (!data.password) {
        return res
          .status(400)
          .send({ status: false, msg: "Password is required field" });
      }
      const authorMatch = await authorModel.findOne({
        email: data.email,
        password: data.password,
      });
      if (!authorMatch) { 
        
        return res
          .status(400)
          .send({ status: false, msg: "Email or Password is incorrect please enter correct is and pass" });
      }
      const token = jwt.sign({ authorId: authorMatch._id }, process.env.SECRET_KEY, {
        expiresIn: "70h",
      });
      return res
        .status(200)
        .send({ status: true, msg: "Logged in successfully", token });
    } catch (error) {
      res.status(500).send({ status: false, message: error.msg });
    }
  };
  
  module.exports.login = login;
