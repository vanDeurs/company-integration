const router = require('express').Router();
const integration = require('../controllers/integration');
const { authenticate} = require('../middlewares/authenticate');
const { authenticateWall } = require('../middlewares/authenticateWall');

const {
  getApiKeys,
  createApiKey,
  deleteApiKey
} = integration;

router.get('/', authenticate, authenticateWall, getApiKeys);
router.post('/', authenticate, authenticateWall, createApiKey);
router.delete('/', authenticate, authenticateWall, deleteApiKey);

module.exports = router;