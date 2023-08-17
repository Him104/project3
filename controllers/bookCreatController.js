const authorModel = require("../models/authorModel.js");
const bookModel = require("../models/bookModel.js");

const createBook = async function (req, res) {
    try {
      const data = req.body;
      if (!data.title) {
        return res
          .status(400)
          .send({ status: false, msg: "Book title is required field" });
      }
      if (!data.excerpt) {
        return res.status(400).send({ status: false, msg: "Book excerpt name is required" });
      }
      if (!data.authorId) {
        return res.status(400).send({ status: false, msg: "Book Authorid is required" });
      }
      if (!data.ISBN) {
        return res.status(400).send({ status: false, msg: "ISBN is required" });
      }
      if (!data.category) {
        return res.status(400).send({ status: false, msg: "category is required" });
      }
      const valid_authorId = await authorModel.findById(data.authorId);
      if (!valid_authorId) {
        return res.status(400).send({ status: false, msg: "Please Provide a Valid authorId" });
      }
     
      
      const createBooks = await bookModel.create(data);
      res
        .status(201)
        .send({
          status: true,
          message: "New Book created successfully",
          data: createBooks,
        });
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  };

  module.exports.createBook = createBook;