const router = require('express').Router();
const users = require('../controllers/users');
const { authenticate} = require('../middlewares/authenticate');
const { authenticateWall } = require('../middlewares/authenticateWall');

const {
  signIn,
  signOut,
  signUp
} = users;

router.post('/sign-in', signIn);
router.delete('/sign-out', authenticate, authenticateWall, signOut);
router.post('/sign-up', signUp);

module.exports = router;