const express = require('express');
const product = require('../controllers/product');
const router = express.Router();

router.get('/', product.getAll);
router.get('/:id', product.getById);
router.post('/', product.create);
router.patch('/:id', product.getById);
router.delete('/:id', product.remove);

module.exports = router;

