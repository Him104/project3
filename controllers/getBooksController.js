const booksModel = require("../models/bookModel");
//const authorModel = require("../models/authorModel.js");

const getBooks = async function(req,res){
    
        try {

const query = req.query;

if (Object.keys(query).length==0) {

  const allBooks = await booksModel.find({isPublished:true,isDeleted:false}).sort({ title: 'asc' }).select("_id title excerpt authorId category subcategory reviews releasedAt");

   
  if (allBooks.length !=0 ) {

    return res.status(200).send({status:true,data:allBooks})
    
  }

}

if (Object.keys(query).length!=0) {

  query.isDeleted = false; query.isPublished = true;
      const getByQuery = await booksModel.find(query).sort({ title: 'asc' }).select("_id title excerpt authorId category subcategory reviews releasedAt");

           if(getByQuery.length !=0){
            return res.status(200).send({status:true , data:getByQuery})
          }

          if (getByQuery.length ==0){
            return  res.status(404).send({ status: false, msg: "No blogs found by filter"});
          }
  
  
}

      
    } catch (error) {
      res.status(500).send({status:false, error:message.error})
      
    }
}


const getBooksById = async function(req,res){   
    
    try {

    const bookId = req.params.bookId;
    if (!bookId) {
        return res.status(400).send({status:false,message:"Please provide a valid bookId"})
        
      }

      const book = await booksModel.findById(bookId); 

      if (!book) {

        return res.status(404).send({status:false, message: "No book found according to your search"})
        
      }
      
      if (book.isDeleted==true) {
      
        return res.status(400).send({status:false, message:"book has already been deleted"});
        
      }
      if (book.reviews==0) {
      
        return res.status(400).send({status:false, message:"book has no review"});
        
      }
      
      return res.status(200).send({status:true, message: "Book details found", data:book});
  
} catch (error) {
  res.status(500).send({status:false, error:message.error})
  
}
}


module.exports.getBooks=getBooks;
module.exports.getBooksById=getBooksById;