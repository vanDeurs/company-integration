const authenticateWall = (req, res, next) => {
    if (!req.me) {
      throw Error("NOT AUTHENTICATED")
    }
    next()

}

module.exports = {
  authenticateWall
}