const express = require('express');
const ProductController = require('../controllers/product.controller');
const ProductSchema = require('../schemas/product.schema');
const validatorLogin = require('../middlewares/validator.login');
const validatorHandler = require('../middlewares/validator.handler');
const { connect } = require('../database/database');

const router = express.Router();
const Controller = new ProductController();
router.get('/:id?', validatorLogin, ProductController.get)
router.post('/', [validatorLogin, validatorHandler(ProductSchema)] , Controller.create)
router.put('/',[validatorLogin, validatorHandler(ProductSchema)], ProductController.update)
router.patch('/:id',[validatorLogin, validatorHandler(ProductSchema)], ProductController.state)
router.delete('/:id', validatorLogin, ProductController.delete)

module.exports = router;