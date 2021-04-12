const express = require('express');
const user = require('../controllers/user');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), user.getAll);
router.get('/my-account', passport.authenticate('jwt', {session: false}), user.getMyAccount);
router.get('/:id', passport.authenticate('jwt', {session: false}), user.getById);
router.patch('/', passport.authenticate('jwt', {session: false}), user.update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), user.remove);
router.post('/buy-token', passport.authenticate('jwt', {session: false}), user.buyToken);

module.exports = router;

