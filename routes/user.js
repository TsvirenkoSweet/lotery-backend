const express = require('express');
const user = require('../controllers/user');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), user.getAll);
router.get('/:id', user.getById);
router.post('/', user.create);
router.patch('/:id', user.getById);
router.delete('/:id', user.remove);

module.exports = router;

