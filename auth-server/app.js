const express = require('express')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { match } = require("path-to-regexp");

const NOTIFICATION_JWT_SECRET = process.env.NOTIFICATION_JWT_SECRET
const NOTIFICATION_USER_PATH = "/:username"

const passwordTable = new Map()
passwordTable.set('admin', 'secretadminpassword.gzuOmraX0TXytCw0')

const issueNotificationToken = (url) => {
  return jwt.sign(
    {
      aud: [url]
    },
    NOTIFICATION_JWT_SECRET,
    { algorithm: 'HS256' }
  );
}

const notificationPathAllowedForUser = (user, notificationPath) => {
  // allow all paths for admin
  if (user.role === 'admin') {
    return true
  }

  // normal users can access to the pattern /:username
  const matchedPath = match(NOTIFICATION_USER_PATH)(notificationPath)
  if (!matchedPath) {
    return false
  }
  // user can only access to their own notification URL
  return user.username === matchedPath.params.username
}

const login = (username, password) => {
  // verify password
  const savedPassword = passwordTable.get(username)
  if (!savedPassword || savedPassword !== password) {
    return false
  }

  let role = 'normal'
  if (username === 'admin') {
    role = 'admin'
  }
  return {
    role, username, password
  }
}

const signup = (username, password) => {
  // if user is already registered, signup should be failed
  if (passwordTable.has(username)) {
    return false
  }

  passwordTable.set(username, password)
  return true
}

const app = express()

app.use(bodyParser.json());

// allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.post('/login', (req, res) => {
  const { username, password } = req.body

  // try login
  const user = login(username, password)
  if (user) {
    res.send({ success: true })
  } else {
    res.send({ success: false })
  }
})

app.post('/signup', (req, res) => {
  const { username, password } = req.body

  const result = signup(username, password)
  res.send({ success: result })
})

app.post('/notificationToken', (req, res) => {
  const { username, password, notificationPath } = req.body

  // try login
  const user = login(username, password)

  // check if user can access to the path
  if (user && notificationPathAllowedForUser(user, notificationPath)) {
    const notificationToken = issueNotificationToken(notificationPath)
    res.send({
      success: true,
      token: notificationToken
    })
  } else {
    res.send({ success: false })
  }
})

app.listen(process.env.PORT || 3000)
