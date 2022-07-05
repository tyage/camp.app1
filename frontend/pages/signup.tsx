import { Box, Button, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { signup } from '../lib/api'

const Signup: NextPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = await signup(username, password)
    if (result.success) {
      toast.success('ユーザ登録に成功しました')
      router.push('/login')
    } else {
      toast.error('ユーザ登録に失敗しました')
    }
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        ユーザ登録
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
          登録
        </Button>
      </Box>
    </>
  )
}

export default Signup
