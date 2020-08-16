const router = require("express").Router();
const items = require("../controllers/items");
const { authenticate} = require("../middlewares/authenticate");
const { authenticateWall } = require("../middlewares/authenticateWall");

const {
  getItems,
  createItem,
  deleteItem
} = items;

router.get("/", authenticate, authenticateWall, getItems);
router.post("/", authenticate, authenticateWall, createItem);
router.delete("/:id", authenticate, authenticateWall, deleteItem);

module.exports = router;