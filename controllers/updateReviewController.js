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

      if (!(data.rating>=1 && data.rating<=5)) {
        return res.status(400).send({status:false, message: "Please enter Rating value b/w 1 to 5"});
        
      }
  
      const book = await booksModel.findOne({_id:bookId, isDeleted:false});
  
      if (!book) {
  
        return res.status(400).send({status:false, message: "Please enter valid bookId"})
        
      }
     

      const findReview = await reviewModel.findOne({_id:reviewId, isDeleted:false}); 
      if (!findReview) {
  
        return res.status(400).send({status:false, message: "Please enter valid reviewId"})
        
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
     
      var reviewedAt = Date.now();
     const updateReview = await reviewModel.findOneAndUpdate({_id:reviewId, bookId: bookId},
    {$set:{reviewedBy:data.reviewedBy, rating:data.rating, review:data.review, reviewedAt: reviewedAt}},
    {new:true});

    let bookDetails = { title: book.title,
    excerpt: book.excerpt,
    authorId: book.authorId,
    ISBN: book.ISBN,
    category:book.category,
    subcategory: book.subcategory
 }
  
    return res.status(200).send({status:true,message:"BookReview details updated successfully", data:updateReview, bookDetails:bookDetails})
  
  
  
      
    } catch (error) {
      res.status(500).send({status:false, error:error.message})
    }
  }

  module.exports.updateReview=updateReview;