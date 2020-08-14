const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = Schema({
  name: {
    type: String
  }
});

const ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;
