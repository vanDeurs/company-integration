const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = Schema({
  label: {
    type: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  created: {
    type: Number,
    default: Date.now,
    required: true
  }
});

const ItemModel = mongoose.model("Item", ItemSchema);

module.exports = ItemModel;
