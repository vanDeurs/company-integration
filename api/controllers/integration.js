const Integration = require('../models/integration');

exports.getApiKeys = async (req, res) => {
  try {
    const apiKeys = await Integration.find({ owner: req.me._id });
    res.status(200).json(apiKeys);
  } catch (error) {
    console.log('error: ', error);
    res.status(400);
  }
}
exports.createApiKey = async (req, res) => {
  try {
    const apiKey = await Integration.create({ owner: req.me._id });
    res.send(201).json(apiKey);
  } catch (error) {
    console.log('error: ', error);
    res.status(400).send();
  }
}
exports.deleteApiKey = async (req, res) => {

}