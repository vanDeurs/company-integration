const authenticateWall = (req, res, next) => {
    if (!req.me) {
      return res.status(401).json({ message: "NOT AUTHENTICATED" });
    }
    next();
}

module.exports = {
  authenticateWall
};