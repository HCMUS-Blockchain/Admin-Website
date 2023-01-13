import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Stack,
  TextField,
  Link,
  Avatar,
  CssBaseline,
} from '@mui/material'
import { InputField } from '../form'
import GoogleLogo from '@/images/google.svg'
import GitHubLogo from '@/images/github.svg'
import { OauthMuiLink } from '@/utils/login'
import Image from 'next/image'
import { useAuth } from '@/hooks'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { LoginPayload, RegisterPayload } from '@/models'
import { useRouter } from 'next/router'

export function RegisterForm() {
  const methods = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const { handleSubmit } = methods
  const { register } = useAuth()
  const route = useRouter()
  async function handleLoginSubmit(values: RegisterPayload) {
    try {
      values.role = 'Admin'
      console.log(values)
      await register(values)
      route.push('/login')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <FormProvider {...methods}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ height: '85vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' }, borderRadius: '5%' }}
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(handleLoginSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  placeholder="Full name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  placeholder="Email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  autoComplete="given-name"
                  name="password"
                  required
                  fullWidth
                  id="password"
                  type="password"
                  placeholder="Password"
                  label="Password"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  autoComplete="given-name"
                  name="confirmPassword"
                  required
                  fullWidth
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </FormProvider>
  )
}
