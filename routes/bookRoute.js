const express = require('express');
const bookController = require('../controllers/bookController');
const {authorization,authentication} = require('../middleware/auth');


const router = express.Router();

router.post('/', authentication,authorization, bookController.createBook);
router.get('/',bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', authentication,authorization, bookController.updateBook);
router.delete('/:id', authentication,authorization, bookController.deleteBook);


module.exports = router;
