const express = require('express');

const CategoryController = require('../controllers/category.controller');
const validatorLogin = require('../middlewares/validator.login');

const router = express.Router();


router.get('/', validatorLogin, CategoryController.get);
router.post('/', validatorLogin, async function (req, res) { CategoryController.create(req, res); })
router.get('/all/:minimo?', validatorLogin, CategoryController.ProductosPorCategoria);


module.exports = router;