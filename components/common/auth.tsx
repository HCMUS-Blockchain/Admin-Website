import { useAuth } from '@/hooks'
import { CircularProgress, Box } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export function Auth({ children }: { children: any }) {
  const router = useRouter()

  const { profile, firstLoading } = useAuth()

  useEffect(() => {
    if (!firstLoading && !profile?.data?._id) {
      router.push('/login')
    }
  }, [router, profile, firstLoading])
  if (!profile?.data?._id)
    return (
      <Box textAlign="center" position="relative" height="100vh">
        <CircularProgress
          sx={{
            margin: '0',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Box>
    )
  return <div>{children}</div>
}
