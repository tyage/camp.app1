import { LoginRequestBody, LoginResult, NotificationTokenRequestBody, NotificationTokenResult, SignupRequestBody, SignupResult } from "./types"

const AUTH_API_BASE = process.env.NEXT_PUBLIC_AUTH_API_BASE
const NOTIFICATION_API_BASE = process.env.NEXT_PUBLIC_NOTIFICATION_API_BASE

export async function signup(username: string, password: string): Promise<SignupResult> {
  const url = `${AUTH_API_BASE}/signup`
  const data: SignupRequestBody = { username, password }
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await response.json()
}

export async function login(username: string, password: string): Promise<LoginResult> {
  const url = `${AUTH_API_BASE}/login`
  const data: LoginRequestBody = { username, password }
  const request = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await request.json()
}

export async function fetchNotificationToken(username: string, password: string, notificationPath: string): Promise<NotificationTokenResult> {
  const url = `${AUTH_API_BASE}/notificationToken`
  const data: NotificationTokenRequestBody = {
    username,
    password,
    notificationPath
  }
  const request = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await request.json()
}

export async function fetchNotification(path: string, token: string): Promise<string> {
  const url = `${NOTIFICATION_API_BASE}${path}`
  const request = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return await request.text()
}