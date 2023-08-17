const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorController.js');
const loginController = require('../controllers/loginController.js');


router.post('/register', authorController.createAuthor);
router.post('/login', loginController.login);


module.exports = router;