const express = require('express');
const passport = require('passport');
const product = require('../controllers/product');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', product.getAll);
router.get('/:id', product.getById);
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'),  product.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), product.update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), product.remove);

module.exports = router;

