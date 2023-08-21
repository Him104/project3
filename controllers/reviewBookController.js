const reviewModel = require("../models/reviewModel");
const bookModel = require("../models/bookModel.js");

const createBookReview = async function (req, res) {
    try {
        let data = req.body;
        let bookId = req.params.bookId;
      
        
        
        const valid_bookId = await bookModel.findOne({_id:bookId, isDeleted: false}); 
        if (!valid_bookId) {
          return res.status(400).send({ status: false, msg: "Please Provide a Valid BookId" });
        }
        

        if (!data.reviewedBy) {
            return res
              .status(400)
              .send({ status: false, msg: "Book reviewer is required field" });
          }
          if (!data.rating) {
            return res.status(400).send({ status: false, msg: "Book review rating is required" });
          }
          

       
        
      const createBookReview1 = await reviewModel.create(data);
      res
        .status(201)
        .send({
          status: true,
          message: "New Book Review created successfully",
          data: createBookReview1,
        });
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  };

  module.exports.createBookReview = createBookReview; 