const router = require('express').Router();
const users = require('./users');
const integration = require('./integration');
const products = require('./products');


router.use('/users', users);
router.use('/integration', integration);
router.use('/products', products);

module.exports = router;


