import { LoginRequestBody, LoginResult, SignupRequestBody, SignupResult } from "./types"

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
