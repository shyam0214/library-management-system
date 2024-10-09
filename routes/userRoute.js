const express = require('express');
const userController = require('../controllers/userController');
const {authorization,authentication} = require('../middleware/auth');


const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', authentication, userController.getUsers);
router.get('/:id', authentication, userController.getUserById);
router.put('/:id', authentication,authorization, userController.updateUser);
router.delete('/:id', authentication,authorization, userController.deleteUser);

module.exports = router;
