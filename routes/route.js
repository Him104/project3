const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorController.js');
const loginController = require('../controllers/loginController.js');
const bookCreateController = require('../controllers/bookCreatController.js');
const getBooksController = require('../controllers/getBooksController.js');
const updateBooksController = require('../controllers/updateBookController.js');
const deleteBooksController = require('../controllers/deleteBookController.js');
const reviewBooksController = require('../controllers/reviewBookController.js');
const updateReviewController = require('../controllers/updateReviewController.js');
const deleteReviewController = require('../controllers/deleteReviewController.js');

const middlewares = require('../middleware/auth.js'); 

 

router.post('/register', authorController.createAuthor);
router.post('/login', loginController.login);
router.post('/books', middlewares.authentication, bookCreateController.createBook);
router.post('/books/:bookId/review', reviewBooksController.createBookReview);


router.get('/books', middlewares.authentication, getBooksController.getBooks);
router.get('/books/:bookId', middlewares.authentication, getBooksController.getBooksById);

router.put('/books/:bookId', updateBooksController.updateBook);
router.put('/books/:bookId/review/:reviewId',  updateReviewController.updateReview); 

router.delete('/books/:bookId', middlewares.authentication, deleteBooksController.deleteBook);
router.delete('/books/:bookId/review/:reviewId', deleteReviewController.deleteReview);



module.exports = router;