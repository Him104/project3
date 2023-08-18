const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorController.js');
const loginController = require('../controllers/loginController.js');
const bookCreateController = require('../controllers/bookCreatController.js');
const getBooksController = require('../controllers/getBooksController.js');
const updateBooksController = require('../controllers/updateBookController.js');
const deleteBooksController = require('../controllers/deleteBookController.js');



router.post('/register', authorController.createAuthor);
router.post('/login', loginController.login);
router.post('/books', bookCreateController.createBook);
router.get('/books', getBooksController.getBooks);
router.get('/books/:bookId', getBooksController.getBooksById);
router.put('/books/:bookId', updateBooksController.updateBook);
router.delete('/books/:bookId', deleteBooksController.deleteBook);



module.exports = router;