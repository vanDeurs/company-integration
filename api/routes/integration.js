const router = require('express').Router();
const integration = require('../controllers/integration');

const {
  getApiKeys,
  createApiKey,
  deleteApiKey
} = integration;

router.get('/', getApiKeys);
router.post('/', createApiKey);
router.delete('/', deleteApiKey);

module.exports = router;