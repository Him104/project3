const booksModel = require("../models/bookModel");

const updateBook = async function(req,res){
    try {
  
      let data = req.body;
  
      let bookId = req.params.bookId;
  
      if (!bookId) {
        return res.status(400).send({status:false, message: "Please enter bookId"});
        
      }
  
      const book = await booksModel.findById(bookId);
  
      if (!book) {
  
        return res.status(400).send({status:false, message: "Please enter valid user id"})
        
      }
      if (book.isDeleted==true) {
      
        return res.status(400).send({status:false, message:"book has already been deleted"});
        
      }

      const duplicateTitle = await booksModel.findOne({ title: data.title });
  
      if (duplicateTitle) {
        return res
          .status(400)
          .send({ status: false, msg: "This Book Title already exists Please Choose Other" });
      }
      const duplicateISBN = await booksModel.findOne({ ISBN: data.ISBN });
  
      if (duplicateISBN) {
        return res
          .status(400)
          .send({ status: false, msg: "ISBN already exists Please Choose Other" });
      }
      
      if (!data.excerpt) {
        return res.status(400).send({status:false, message: "Please enter excerpt"});
        
      }
      if (!data.authorId) {
        return res.status(400).send({status:false, message: "Please enter authorId"});
        
      }
      if (!data.category) {
        return res.status(400).send({status:false, message: "Please enter category"});
        
      }

     const updateBook = await booksModel.findOneAndUpdate({_id:bookId},
    {$set:{title:data.title, excerpt:data.excerpt, ISBN:data.ISBN, releasedAt:data.releasedAt}},
    {new:true})
  
    return res.status(200).send({status:true,message:"Book details updated successfully", data:updateBook})
  
  
  
      
    } catch (error) {
      res.status(500).send({status:false, error:error.message})
    }
  }

  module.exports.updateBook=updateBook;