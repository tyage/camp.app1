const express = require('express')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "JWT SECRET"

const passwordTable = new Map()
passwordTable.set('admin', 'secretadminpassword.gzuOmraX0TXytCw0')

const issueToken = (path) => {
  return jwt.sign(
    {
      aud: [path]
    },
    JWT_SECRET,
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

const pathAllowed = (user, path) => {
  switch (user.role) {
    case 'admin':
      return true;
    default:
      // normal users are only allowed to access /{user.username}
      return `/${user.username}` === path
  }
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
  const { username, password, path } = req.body

  // try login
  const user = login(username, password)

  if (user && pathAllowed(user, path)) {
    res.send({
      success: true,
      token: issueToken(path)
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
