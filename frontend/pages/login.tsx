import { Box, Button, Link, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { login } from '../lib/api'
import { UserContext } from '../lib/context'

const Login: NextPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { setUser } = useContext(UserContext)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = await login(username, password)
    if (result.success) {
      setUser({
        username,
        password
      })
      toast.success('ログイン完了')
      router.push('/')
    } else {
      toast.error('ログイン失敗')
    }
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        ログイン
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          label="ユーザ名"
          type="text"
          onChange={
            (e) => setUsername(e.target.value)
          } />
        <TextField
          margin="normal"
          fullWidth
          label="パスワード"
          type="password"
          onChange={
            (e) => setPassword(e.target.value)
          } />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          ログイン
        </Button>
        <Box sx={{ mt: 2 }}>
          <NextLink href="/signup" passHref>
            <Link>
              ユーザ登録
            </Link>
          </NextLink>
        </Box>
      </Box>
    </>
  )
}

export default Login
