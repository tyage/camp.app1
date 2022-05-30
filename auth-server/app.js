const express = require('express')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "JWT SECRET"

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
  let role = 'normal'
  if (username === 'admin') {
    role = 'admin'
  }
  return {
    role, username, password
  }
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

app.post('/auth', (req, res) => {
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

app.listen(process.env.PORT || 3000)
