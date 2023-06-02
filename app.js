const express = require('express')
const cors = require('cors')
const { route: userRoute } = require('./Routes/UserRoute')
const { route: contactRoute } = require('./Routes/ContactRoute')
const { notFound, handleError } = require('./middlewares/ErrorHandler')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/v1', userRoute)
app.use('/api/v1', contactRoute)

//handler global route errors
app.use(notFound)
app.use(handleError)

module.exports.app = app;