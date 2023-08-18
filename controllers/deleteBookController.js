const booksModel = require("../models/bookModel");

const deleteBook = async function (req,res) {
    try {
      const bookId = req.params.bookId
  
  
      const book = await booksModel.findById(bookId);
  if (!book) {
  
    return res.status(404).send({status:false,message:"book not found"})
  
  }
  if (book.isDeleted == true) {
  
    return res.status(400).send({status:false, message: "book has already been deleted"})
    
  }
  
  const deletedBook = await booksModel.findByIdAndUpdate(bookId ,
  {$set: {isDeleted:true}}, {new:true})
  
  return res.status(201).send({status:true,msg:"Book deleted successfully"})
  
  
    } catch (error) {
  
      res.status(500).send({status:false,error:error.msg})
    
      
    }
    
  }

  module.exports.deleteBook=deleteBook;