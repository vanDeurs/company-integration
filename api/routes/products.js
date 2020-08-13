const router = require('express').Router();
const products = require('../controllers/products');

const {
  getProducts,
  addProduct,
  deleteProduct
} = products;

router.get('/', getProducts);
router.post('/', addProduct);
router.delete('/', deleteProduct);

module.exports = router;