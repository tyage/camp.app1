import { Box, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { fetchNotification, fetchNotificationToken } from '../lib/api'
import { UserContext } from '../lib/context'

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

  useEffect(() => {
    if (user === null) {
      router.push('/login')
    }
  }, [user, router])

  useEffect(() => {
    if (user === null) {
      return
    }
    fetchNotificationFromAPI(
      user.username,
      user.password
    ).then(notificaion => {
      setNotification(notificaion)
    })
  }, [user])

  return (
    <>
      {user &&
        <>
          <Typography variant="h5">ようこそ</Typography>
          <Box mt={4}>
            <Typography variant="h6">お知らせ</Typography>
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
