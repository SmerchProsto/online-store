//import router from express
const Router = require('express');

//new object typo Router
const router = new Router();

const deviceController = require('../controllers/deviceController');

router.post('/', deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

module.exports = router