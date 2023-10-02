//import router from express
const Router = require('express');

//new object typo Router
const router = new Router();

const userController = require('../controllers/userController');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', userController.check);

module.exports = router