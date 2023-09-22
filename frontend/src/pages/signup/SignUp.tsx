import DefaultLayout from '../../layouts/default/DefaultLayout'
import { Formik } from 'formik'
import { Box, Button, Divider, FormHelperText, Link } from '@mui/material'
import TextInput from '../../components/TextInput'
import React, { useState } from 'react'
import * as yup from 'yup'
import { authClient } from '../../api'
import { type RegisterUserDto } from '../../shared/dto/register-user-dto'
import { type RegisterResponseDto } from '../../shared/dto/register-response-dto'
import useAuthProvider from '../../shared/hooks/useAuthProvider'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { type BaseResultDto } from '../../shared/dto/base-result-dto'

const formValidation = yup.object().shape({
  username: yup.string().required('Enter your username'),
  password: yup.string().min(3, 'Password should be made up of at least 3 letters').required('Enter your password'),
  firstName: yup.string().required('Enter your first name'),
  lastName: yup.string().required('Enter your last name'),
  email: yup.string().email('Please enter a valid email').optional(),
  phone: yup.string().optional()
})

const SignUp: React.FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null)
  const authProvider = useAuthProvider()

  return <DefaultLayout icon={''} title={'Register'}>
        <Formik
            initialValues={{
              username: '',
              password: '',
              firstName: '',
              lastName: '',
              email: '',
              phone: ''
            }}
            validationSchema={formValidation}
            onSubmit={async (values, { setSubmitting }) => {
              setError(null)
              let registerResponse: RegisterResponseDto | BaseResultDto | null = null
              try {
                registerResponse = await authClient.register(values as RegisterUserDto)
              } catch (error) {
                setError('An error occurred while processing sign up')
              } finally {
                setSubmitting(false)
                if (registerResponse !== null) {
                  if ('accessToken' in registerResponse) {
                    const { user, accessToken } = registerResponse
                    await authProvider.activateSession(user, accessToken, false)
                    window.location.reload()
                  } else {
                    const { error } = registerResponse
                    setError(error as string)
                  }
                }
              }
            }}
        >
            {({ handleSubmit, isSubmitting }) => (
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
                        id="firstName"
                        label="First Name"
                        name="firstName"
                    />

                    <TextInput
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
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

                    <Divider/>

                    <TextInput
                        margin="normal"
                        required
                        fullWidth
                        type="email"
                        id="email"
                        label="Email"
                        name="email"
                    />

                    <TextInput
                        margin="normal"
                        required
                        fullWidth
                        type="phone"
                        id="phone"
                        label="Phone Number"
                        name="phone"
                    />

                    {(error != null) && <FormHelperText error variant="outlined" sx={{ textAlign: 'center' }}>{error}</FormHelperText>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isSubmitting}
                        data-testid="register"
                    >
                        Register
                    </Button>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                        <ChevronLeftIcon sx={{ color: 'primary.main' }}/>
                        <Link href="/login" variant="body2">
                            {'Already have an account'}
                        </Link>
                    </Box>
                </Box>)}
        </Formik>
    </DefaultLayout>
}

export default SignUp
