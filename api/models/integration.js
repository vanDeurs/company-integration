const mongoose = require("mongoose");
const { uuidv4 } = require("../utils/uuid4");

const Schema = mongoose.Schema;

const IntegrationSchema = Schema({
  apiKey: {
    type: String,
    default: uuidv4,
    required: true
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

IntegrationSchema.statics.findByKey = async function (apiKey) {
  const Integration = this;
  try {
    const integration = await Integration.findOne({ apiKey })
    .populate("owner");

    return integration;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
}

const IntegrationModel = mongoose.model("Integration", IntegrationSchema);

module.exports = IntegrationModel;
