const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorController.js');


router.post('/register', authorController.createAuthor);


module.exports = router; 