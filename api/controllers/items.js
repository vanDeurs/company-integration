const Item = require("../models/item");

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ owner: req.me._id }).populate("owner");
    res.status(200).json(items);
  } catch (error) {
    console.log("error: ", error);
    res.status(400);
  }
}
exports.createItem = async (req, res) => {
  const { label } = req.body;
  try {
    const item = await Item.create({ owner: req.me, label });
    res.status(201).json(item);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).send();
  }
}
exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findOneAndDelete({ _id: id, owner: req.me._id });
    res.status(200).send();
  } catch (error) {
    console.log("error: ", error);
    res.status(400).send();
  }
}