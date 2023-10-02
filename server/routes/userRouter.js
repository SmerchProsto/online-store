//import router from express
const Router = require('express');

//new object typo Router
const router = new Router();

const userController = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
// authmiddleware - is second arg, which check user is auth
router.get('/auth', authMiddleware, userController.check);

module.exports = router