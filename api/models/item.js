const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  name: {
    type: String
  }
});

const ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;
