export type SignupRequestBody = {
  username: string,
  password: string
}
export type SignupResult = {
  success: boolean
}

export type LoginRequestBody = {
  username: string,
  password: string
}
export type LoginResult = {
  success: boolean
}

export type NotificationTokenRequestBody = {
  username: string,
  password: string,
  notificationPath: string
}
export type NotificationTokenResult = {
  success: boolean,
  token?: string
}

export interface UserContextProps {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
}
export type UserModel = {
  username: string,
  password: string
}
