const express = require('express')
const bodyParser = require('body-parser');

const JWT_SECRET = "JWT SECRET"

// TODO: issue JWT
const genJWT = (path) => {
  return path
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

app.post('/auth', (req, res) => {
  const { username, password, path } = req.body

  // try login
  const user = login(username, password)

  if (user && pathAllowed(user, path)) {
    res.send({
      success: true,
      token: genJWT(path)
    })
  } else {
    res.send({
      success: false
    })
  }
})

app.listen(3000)
