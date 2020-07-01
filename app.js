const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const postsRouter = require('./controllers/posts.js')

const middleware = require('./utils/middleware')
const config = require('./utils/config')

const logger = require('./utils/logger')
const mongoose = require('mongoose')

app.use('/',express.static('build')) // look in the build directory to serve frontend

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((err) => {
		logger.error('error connecting to MongoDB:', err.message)
	})

app.use(cors()) // allow cross origin reference to ensure local requests work
app.use(express.json()) // allow json parsing
app.use(middleware.requestLogger) // run our middleware that handles logging requests (like morgan)

app.use('/api/posts', postsRouter) // handles calls to /api/posts

app.use(middleware.unknownEndpoint) // our middleware for 404/unknown requests
app.use(middleware.errorHandler) // our middleware for handling errors

module.exports = app
