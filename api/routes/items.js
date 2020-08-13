const router = require('express').Router();
const items = require('../controllers/items');

const {
  getitems,
  additem,
  deleteitem
} = items;

router.get('/', getitems);
router.post('/', additem);
router.delete('/', deleteitem);

module.exports = router;