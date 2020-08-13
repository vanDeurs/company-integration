const mongoose = require('mongoose')

const MONGO_HOST = "mongo"
const MONGO_PORT = 27017
const MONGO_DATABASE = "api"

const url = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB.`)
})

module.exports = mongoose
