import React, { useState } from 'react'
import { Box, Button, FormHelperText, Link } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import TextInput from '../../components/TextInput'
import DefaultLayout from '../../layouts/default/DefaultLayout'
import { authClient } from '../../api'
import useAuthProvider from '../../shared/hooks/useAuthProvider'
import { type UserDto } from '../../shared/dto/user-dto'

const formValidation = yup.object().shape({
  username: yup.string().required('Enter your username'),
  password: yup.string().required('Enter your password')
})

const Login: React.FunctionComponent = () => {
  const authProvider = useAuthProvider()
  const [error, setError] = useState<string | null>(null)

  return <DefaultLayout icon={''} title={'Login'}>
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={formValidation}
            onSubmit={async (values, { setSubmitting }) => {
              setError(null)

              try {
                const response = await authClient.login({
                  username: values.username,
                  password: values.password
                })

                if (response.status === 'success') {
                  const { user, accessToken } = response
                  await authProvider.activateSession(user as UserDto, accessToken as string, false)
                  window.location.reload()
                } else if (response.status === 'invalid-credentials') {
                  setError('Invalid username or password')
                }
              } catch (error) {
                setError('An error occurred while processing request')
              } finally {
                setSubmitting(false)
              }
            }}
        >
            {({ handleSubmit, isSubmitting, isValid }) => (
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextInput
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                    />
                    <TextInput
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />

                    {(error != null) && <FormHelperText error variant="outlined" sx={{ textAlign: 'center' }}>{error}</FormHelperText>}

                    <Button
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        data-testid="login"
                    >
                        Sign In
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Link href="/register" variant="body2">
                            {"Don't have an account? Sign up"}
                        </Link>
                    </Box>
                </Box>)}
        </Formik>
    </DefaultLayout>
}

export default Login
