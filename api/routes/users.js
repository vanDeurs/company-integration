const router = require('express').Router();
const users = require('../controllers/users');

const {
  signIn,
  signOut,
  signUp
} = users;

router.post('/sign-in', signIn);
router.delete('/sign-out', signOut);
router.post('/sign-up', signUp);

module.exports = router;