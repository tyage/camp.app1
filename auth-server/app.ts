import express, { Request } from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import { match } from 'path-to-regexp'
import { NotificationPathMatcher, User } from './types'

const NOTIFICATION_JWT_SECRET = process.env.NOTIFICATION_JWT_SECRET || 'superdupersecretkey'
const NOTIFICATION_USER_PATH = "/:username"

// 手抜き。メモリにユーザ情報を保持
const passwordTable = new Map()
passwordTable.set('admin', 'secretadminpassword.gzuOmraX0TXytCw0')

const issueNotificationToken = (url: string) => {
  return jwt.sign(
    {
      aud: [url]
    },
    NOTIFICATION_JWT_SECRET,
    { algorithm: 'HS256' }
  );
}

const notificationPathAllowedForUser = (user: User, notificationPath: string) => {
  // roleがadmin場合は、全てのURLを許可
  if (user.role === 'admin') {
    return true
  }

  // admin以外のユーザは /:username のみ許可
  const matchedPath = match<NotificationPathMatcher>(NOTIFICATION_USER_PATH)(notificationPath)
  if (!matchedPath) {
    return false
  }

  // ユーザ専用のURLにしかアクセスできない
  return user.username === matchedPath.params.username
}

const login = (username: string, password: string) => {
  // パスワードチェック
  const savedPassword = passwordTable.get(username)
  if (!savedPassword || savedPassword !== password) {
    return false
  }

  // ユーザ名「admin」はroleも「admin」
  let role = 'normal'
  if (username === 'admin') {
    role = 'admin'
  }
  return {
    role, username, password
  }
}

const signup = (username: string, password: string) => {
  // 登録済みのユーザがいれば失敗
  if (passwordTable.has(username)) {
    return false
  }

  passwordTable.set(username, password)
  return true
}

const app = express()

app.use(bodyParser.json());

// CORS許可
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.post('/login', (req, res) => {
  const { username, password } = req.body

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

// お知らせ用トークン返却API
// ログインセッションの代わりにユーザ名、パスワードを受け取っているのは手抜き
app.post('/notificationToken', (req, res) => {
  const { username, password, notificationPath } = req.body

  const user = login(username, password)

  // ユーザが「notificationPath」にアクセスする権限を有していればトークンを返却
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
