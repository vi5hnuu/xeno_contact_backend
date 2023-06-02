const mongoose = require('mongoose')


const connectDatabase = () => {
  const dburi = process.env.DATABASE_URL
    .replace('<MONGO_USERNAME>', process.env.MONGO_USERNAME)
    .replace('<MONGO_PASSWORD>', process.env.MONGO_PASSWORD)

  mongoose.connection.on('connected', () => {
    console.log('Connected to database.');
  })
  mongoose.connection.on('error', () => {
    console.log('failed to Connect to database. exiting....');
    process.exit(-1)
  })
  mongoose.connect(dburi)
}

module.exports.connectDatabase = connectDatabase