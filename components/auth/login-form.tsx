import { useAuth } from '@/hooks'
import { LoginPayload } from '@/models'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { LoadingButton } from '@mui/lab'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { InputField } from '../form'
import React, { useState } from 'react'
export function LoginForm() {
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [loading, setLoading] = useState(false)
  const { handleSubmit } = methods
  const { login } = useAuth()
  const route = useRouter()

  async function handleLoginSubmit(values: LoginPayload) {
    try {
      setLoading(true)
      await login(values)
      route.push('/')
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ height: '100%', backgroundColor: { xs: '#fff', md: '#f4f4f4' }, borderRadius: '5%' }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit(handleLoginSubmit)}
          >
            <InputField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              placeholder="Email"
              autoFocus
            />
            <InputField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              placeholder="Password"
              autoComplete="current-password"
            />

            <LoadingButton
              loading={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </FormProvider>
  )
}
