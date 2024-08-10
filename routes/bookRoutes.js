const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.post('/', bookController.createBook);
router.get('/:id', bookController.getBookById);
router.get('/', bookController.getAllBooks);

module.exports = router;