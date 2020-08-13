const User = require('../models/user');
const Integration = require('../models/integration');

const authenticate = (req, res, next) => {
  /**
   * Authenticate the user either by the token (logged in),
   * or by the apiKey (integration).
   */
    const token = req.headers['x-auth'];
    const apiKey = req.headers['x-api-key'];

    if (token) {
      try {
        const user = await User.findByToken(token);
        if (user) {
          req.me = user;
        }
      } catch (error) {
        console.log(error);
      }
    } else if (apiKey) {
      try {
        const integration = await Integration.findByKey(apiKey);
        if (integration) {
          req.me = integration.owner;
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }

    next();

}

module.exports = {
    authenticate
}