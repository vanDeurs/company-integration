const router = require("express").Router();
const users = require("./users");
const integrations = require("./integrations");
const items = require("./items");


router.use("/users", users);
router.use("/integrations", integrations);
router.use("/items", items);

module.exports = router;


