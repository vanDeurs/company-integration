const authenticationWall = (req, res, next) => {
    if (!req.me) {
      throw Error('NOT AUTHENTICATED')
    }
    next()

}

module.exports = {
  authenticationWall
}