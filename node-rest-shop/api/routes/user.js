const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user')

router.post('/signup', UserController.user_SignUp);
router.post("/login", UserController.user_Login);
router.delete("/:userId", checkAuth, UserController.user_DeleteUser);

module.exports = router;