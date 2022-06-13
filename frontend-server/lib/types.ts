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
  success: boolean,
  message?: string,
  user?: UserModel
}

export type ForgetPasswordRequestBody = {
  email: string
}
export type ForgetPasswordResult = {
}

export type ResetPasswordRequestBody = {
  token: string,
  newPassword: string
}
export type ResetPasswordResult = {
  success: boolean
}

export interface UserContextProps {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
}
export type UserModel = {
  username: string,
  password: string
}
