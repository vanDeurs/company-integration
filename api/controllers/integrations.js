const Integration = require("../models/integration");

exports.getApiKeys = async (req, res) => {
  try {
    const apiKeys = await Integration.find({ owner: req.me._id }).populate("owner");
    res.status(200).json(apiKeys);
  } catch (error) {
    console.log("error: ", error);
    res.status(400);
  }
}
exports.createApiKey = async (req, res) => {
  try {
    const apiKey = await Integration.create({ owner: req.me });
    res.status(201).json(apiKey);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).send();
  }
}
exports.deleteApiKey = async (req, res) => {
  const { id } = req.params;
  try {
    await Integration.findOneAndDelete({ _id: id, owner: req.me._id });
    res.status(200).send();
  } catch (error) {
    console.log("error: ", error);
    res.status(400).send();
  }
}