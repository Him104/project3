const booksModel = require("../models/bookModel.js");
const reviewModel = require("../models/reviewModel.js");

const deleteReview = async function (req,res) {
    try {
      const bookId = req.params.bookId
      const reviewId = req.params.reviewId
  
  
      const book = await booksModel.findById(bookId);
  if (!book) {
  
    return res.status(404).send({status:false,message:"book not found"})
  
  }
  if (book.isDeleted == true) {
  
    return res.status(400).send({status:false, message: "book has already been deleted"})
    
  }

  const review = await reviewModel.findById(reviewId);
  if (!review) {
  
    return res.status(404).send({status:false,message:"review not found"})
  
  }
  if (review.isDeleted == true) {
  
    return res.status(400).send({status:false, message: "review has already been deleted"})
    
  }
  
  const deletedBookReview = await reviewModel.findByIdAndUpdate(reviewId ,
  {$set: {isDeleted:true}}, {new:true});


  if(deletedBookReview){

    let bookReviewCount = book.reviews;
    const updateBookReviewCount = await booksModel.findOneAndUpdate({_id:bookId}, {$set:{reviews:bookReviewCount - 1}}, {new:true});
  
  
  }
    return res.status(201).send({status:true,msg:"review deleted successfully"});


    } catch (error) {
  
      res.status(500).send({status:false,error:error.msg})
    
      
    }
    
  }

  module.exports.deleteReview=deleteReview;