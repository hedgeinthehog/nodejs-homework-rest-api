const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')

require('./configs/passport-config')

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((_, res) => {
  res.status(404).json({ status: 'error', code: '404', message: 'Not found' })
})

app.use((err, req, res, next) => {
  err.status = err.status || 500
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
  })
})

module.exports = app
