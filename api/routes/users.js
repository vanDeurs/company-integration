const router = require("express").Router();
const users = require("../controllers/users");
const { authenticate} = require("../middlewares/authenticate");
const { authenticateWall } = require("../middlewares/authenticateWall");

const {
  signIn,
  signOut,
  signUp
} = users;

router.post("/sign-in", signIn);
router.delete("/sign-out", authenticate, signOut);
router.post("/sign-up", signUp);
router.post("/authenticate", authenticate, authenticateWall, (req, res) => res.status(200).json(req.me));

module.exports = router;