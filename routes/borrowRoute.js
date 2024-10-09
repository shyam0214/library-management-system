const express = require('express');
const borrowController = require('../controllers/borrowController');
const {authorization,authentication} = require('../middleware/auth');


const router = express.Router();

router.post('/', authentication,authorization, borrowController.borrowBook);
router.post('/return', authentication,authorization, borrowController.returnBook);
router.get('/', borrowController.getAllBorrowedBooks);

module.exports = router;
