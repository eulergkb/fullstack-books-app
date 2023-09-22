import React from 'react'
import { Container, CssBaseline, Box, Typography, Avatar } from '@mui/material'

interface DefaultProps {
  icon?: React.ReactNode
  children: React.ReactNode
  title?: string
}

function DefaultLayout (props: DefaultProps): React.ReactNode {
  return <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
        >
            {props.icon && <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {props.icon}
            </Avatar>}
            {props?.title && <Typography component="h1" variant="h5">
                {props.title}
            </Typography>}
            {props.children}
        </Box>
    </Container>
}

export default DefaultLayout
