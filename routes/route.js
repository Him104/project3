const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorController.js');

const loginController = require('../controllers/loginController.js');


router.post('/register', authorController.createAuthor);
router.post('/login', loginController.login);

const bookCreateController = require('../controllers/bookCreatController.js');


router.post('/books', bookCreateController.createBook);



module.exports = router;