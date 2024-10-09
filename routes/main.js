const express = require('express');
const bookRoutes = require('./bookRoute');
const userRoutes = require('./userRoute');
const borrowRoutes = require('./borrowRoute');

const router = express.Router();

router.use('/books', bookRoutes);
router.use('/users', userRoutes);
router.use('/borrow', borrowRoutes);

module.exports = router;
