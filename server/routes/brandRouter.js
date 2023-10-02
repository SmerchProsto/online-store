//import router from express
const Router = require('express');

//new object typo Router
const router = new Router();

const brandController = require('../controllers/brandController');

router.post('/', brandController.create);
router.get('/', brandController.getAll);

module.exports = router