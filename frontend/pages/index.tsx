import { Box, Button, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import { fetchNotification, fetchNotificationToken } from '../lib/api'
import { UserContext } from '../lib/context'
import { UserModel } from '../lib/types'

const fetchNotificationFromAPI = async (username: string, password: string): Promise<string> => {
  const notificationPath = `/${username}`
  const { token } = await fetchNotificationToken(
    username,
    password,
    notificationPath
  )
  if (token === undefined) {
    return ''
  }
  return await fetchNotification(
    notificationPath,
    token
  )
}

const Home: NextPage = () => {
  const { user } = useContext(UserContext)
  const router = useRouter()
  const [notification, setNotification] = useState('')
  const [previousUser, setPreviousUser] = useState<UserModel | null>(null)

  const updateNotification = useCallback(async () => {
    if (user === null) {
      return
    }
    const notification = await fetchNotificationFromAPI(
      user.username,
      user.password
    )
    setNotification(notification)
  }, [user])

  useEffect(() => {
    if (user === null) {
      router.push('/login')
    }
  }, [user, router])

  if (user && user !== previousUser) {
    updateNotification()
    setPreviousUser(user)
  }

  return (
    <>
      {user &&
        <>
          <Typography variant="h5">ようこそ</Typography>
          <Box mt={4}>
            <Box style={{ display: 'flex' }}>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                お知らせ
              </Typography>
              <Button onClick={updateNotification}>更新</Button>
            </Box>
            <pre>
              {notification}
            </pre>
          </Box>
        </>
      }
    </>
  )
}

export default Home
