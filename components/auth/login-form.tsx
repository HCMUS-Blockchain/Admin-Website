import { useAuth } from '@/hooks'
import { LoginPayload } from '@/models'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
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
export function LoginForm() {
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { handleSubmit } = methods
  const { login } = useAuth()
  const route = useRouter()

  async function handleLoginSubmit(values: LoginPayload) {
    try {
      await login(values)
      route.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <FormProvider {...methods}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ height: '65vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' }, borderRadius: '5%' }}
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </FormProvider>
  )
}
