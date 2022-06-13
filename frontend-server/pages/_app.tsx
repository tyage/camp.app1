import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { Container, CssBaseline, Box, AppBar, Typography, Toolbar, Button } from '@mui/material'
import Head from 'next/head'
import { UserContext } from '../lib/context'
import { useState } from 'react'
import { UserModel } from '../lib/types'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserModel | null>(null)
  const router = useRouter()

  const logout = () => {
    setUser(null)
    router.push('/login')
  }

  return <>
    <Head>
      <title>SECCAMP APP</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <UserContext.Provider value={{
      user, setUser
    }}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <NextLink href="/" passHref>
              <Typography
                variant="h6"
                component="a"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                SECCAMP APP
              </Typography>
            </NextLink>

          </Box>
          {user === null ? (
            <NextLink href="/login">
              <Button color="inherit">
                ログイン
              </Button>
            </NextLink>
          ) : (
            <Button color="inherit" onClick={logout}>
              ログアウト
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Component {...pageProps} />
        </Box>
      </Container>
    </UserContext.Provider>
    <ToastContainer />
  </>
}

export default MyApp
