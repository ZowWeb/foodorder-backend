/* eslint-disable no-console */
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const dotenv = require('dotenv')
const path = require('path')

const connectDB = require('./config/db')

// Routes
const users = require('./routes/api/users')
const orders = require('./routes/api/orders')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())

// Body parser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// Use Routes
app.use('/api/users', users)
app.use('/api/orders', orders)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, async () => {
  // Connect to Mongoose
  await connectDB()
  console.log(`🚀 Server running at ${PORT} in ${process.env.NODE_ENV} mode`)
})
