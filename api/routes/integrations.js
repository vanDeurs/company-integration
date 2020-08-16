const router = require("express").Router();
const integrations = require("../controllers/integrations");
const { authenticate} = require("../middlewares/authenticate");
const { authenticateWall } = require("../middlewares/authenticateWall");

const {
  getApiKeys,
  createApiKey,
  deleteApiKey
} = integrations;

router.get("/", authenticate, authenticateWall, getApiKeys);
router.post("/", authenticate, authenticateWall, createApiKey);
router.delete("/:id", authenticate, authenticateWall, deleteApiKey);

module.exports = router;