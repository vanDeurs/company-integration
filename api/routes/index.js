const router = require('express').Router();
const users = require('./users');
const integration = require('./integration');
const items = require('./items');


router.use('/users', users);
router.use('/integration', integration);
router.use('/items', items);

module.exports = router;


