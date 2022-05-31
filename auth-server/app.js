const express = require('express')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const NOTIFICATION_JWT_SECRET = process.env.NOTIFICATION_JWT_SECRET
const NOTIFICATION_BASE_URL = process.env.NOTIFICATION_BASE_URL

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

  // allow users to access http://notificationServer/${username}
  const notificationUrl = `${NOTIFICATION_BASE_URL}/${username}`
  const notificationToken = issueNotificationToken(notificationUrl)

  if (user) {
    res.send({
      success: true,
      notificationToken,
      notificationUrl
    })
  } else {
    res.send({
      success: false
    })
  }
})

app.post('/signup', (req, res) => {
  const { username, password } = req.body

  const result = signup(username, password)

  res.send({
    success: result
  })
})

app.listen(process.env.PORT || 3000)
