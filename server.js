const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const PORT = process.env.PORT ? process.env.PORT : "3000"

const authCtrl = require('./controllers/auth')
const usersCtrl = require('./controllers/users')
const categoryCtrl = require('./controllers/category')
const transactionCtrl = require('./controllers/transaction')

const verifyToken = require('./middleware/verify-token')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}. 🥭`)
})

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.post('/auth/sign-up', authCtrl.signUp)
app.post('/auth/sign-in', authCtrl.signIn)
app.post('/categories', verifyToken, categoryCtrl.create)
app.get('/categories/:categoryId', verifyToken, categoryCtrl.show)
app.post('/transactions', verifyToken, transactionCtrl.create)
app.get('/transactions/:transactionId', verifyToken, transactionCtrl.show)
app.get('/users', verifyToken, usersCtrl.index)
app.put('/transactions/:transactionId', verifyToken, transactionCtrl.update)
app.get('/transactions', verifyToken, transactionCtrl.index)
app.delete('/transactions/:transactionId', verifyToken, transactionCtrl.deleteTransaction)
app.put('/categories/:categoryId', verifyToken, categoryCtrl.update)
app.get('/categories', verifyToken, categoryCtrl.index)


app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}! 😀`)
})
