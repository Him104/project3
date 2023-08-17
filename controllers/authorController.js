const authorModel = require("../models/authorModel.js");
const validator = require('validator');

const createAuthor = async function (req, res) {
    try {
      const data = req.body;
      if (!data.title) {
        return res
          .status(400)
          .send({ status: false, msg: "title is required field" });
      }
      if (!data.name) {
        return res.status(400).send({ status: false, msg: "Author name is required" });
      }
      if (!data.phone) {
        return res.status(400).send({ status: false, msg: "phone is required" });
      }
      if (data.phone.length < 10 || data.phone.length > 10) {
        return res.status(400).send({ status: false, msg: "phone no must be 10 digit" });
      }

      const duplicatePhone = await authorModel.findOne({ phone: data.phone });
  
      if (duplicatePhone) {
        return res
          .status(400)
          .send({ status: false, msg: "Phone already exists" });
      }
      
     
  
      if (!data.email) {
        return res.status(400).send({ status: false, msg: "email is required" });
      }


  const validEmail = validator.isEmail(data.email)
    if (!validEmail) {
      return res.status(400).send({status:false,msg:"email is not valid"})
      
    
  }
      const duplicateEmail = await authorModel.findOne({ email: data.email });
  
      if (duplicateEmail) {
        return res
          .status(400)
          .send({ status: false, msg: "email already exists" });
      }
  
      if (!data.password) {
        return res
          .status(400)
          .send({ status: false, msg: "password is required" });
      }
  
      if (!(data.password.length > 8 && data.password.length < 15)) {
        return res
          .status(400)
          .send({
            status: false,
            msg: "password length should be between 8 to 15 characters",
          });
      }
  
      const createAuthor = await authorModel.create(data);
      res
        .status(201)
        .send({
          status: true,
          message: "Author created successfully",
          data: createAuthor,
        });
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  };

  module.exports.createAuthor = createAuthor;