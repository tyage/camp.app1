import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { UserContext } from '../lib/context'

const Home: NextPage = () => {
  const { user } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      router.push('/login')
    }
  }, [user, router])

  return (
    <div>
    </div>
  )
}

export default Home
