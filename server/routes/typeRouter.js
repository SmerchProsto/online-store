//import router from express
const Router = require('express');

//new object typo Router
const router = new Router();

const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);

module.exports = router