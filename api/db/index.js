const mongoose = require("mongoose");

const { DB_PASSWORD, DB_USER, DB_NAME } = process.env;
const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mdlzo.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Connected to MongoDB.");
}).catch(error => console.log("MongoDB error: ", error));