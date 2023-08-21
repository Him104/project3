const reviewModel = require("../models/reviewModel.js");
const booksModel = require("../models/bookModel.js");

const updateReview = async function(req,res){
    try {
  
      let data = req.body;
  
      let bookId = req.params.bookId;
      let reviewId = req.params.reviewId;
  
      if (!bookId) {
        return res.status(400).send({status:false, message: "Please enter bookId"});
        
      }
      if (!reviewId) {
        return res.status(400).send({status:false, message: "Please enter reviewId"});
        
      }
  
      const book = await booksModel.findById(bookId);
  
      if (!book) {
  
        return res.status(400).send({status:false, message: "Please enter valid bookId"})
        
      }
      if (book.isDeleted==true) {
      
        return res.status(400).send({status:false, message:"book has already been deleted"});
        
      }

      const findReview = await reviewModel.findById(reviewId);
      if (!findReview) {
  
        return res.status(400).send({status:false, message: "Please enter valid reviewId"})
        
      }
      if (findReview.isDeleted==true) {
      
        return res.status(400).send({status:false, message:"Review has already been deleted"});
        
      }

      
      if (!data.reviewedBy) {
        return res.status(400).send({status:false, message: "Please enter reviewedBy"});
        
      }
      if (!data.rating) {
        return res.status(400).send({status:false, message: "Please enter rating"});
        
      }
      if (data.rating <1 || data.rating >5) {
        return res.status(400).send({status:false, message: "Please enter rating Range b/w 1 to 5"});
        
      }
      if (!data.review) {
        return res.status(400).send({status:false, message: "Please enter review Content"});
        
      }

     const updateReview = await reviewModel.findOneAndUpdate({_id:reviewId},
    {$set:{reviewedBy:data.reviewedBy, rating:data.rating, review:data.review}},
    {new:true})
  
    return res.status(200).send({status:true,message:"BookReview details updated successfully", data:updateReview})
  
  
  
      
    } catch (error) {
      res.status(500).send({status:false, error:error.message})
    }
  }

  module.exports.updateReview=updateReview;