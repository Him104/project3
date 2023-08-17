const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorController.js');
const bookCreateController = require('../controllers/bookCreatController.js');


router.post('/register', authorController.createAuthor);
router.post('/books', bookCreateController.createBook);


module.exports = router; 