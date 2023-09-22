import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({})

function MuiThemeRoot (props: any): React.ReactNode {
  return <ThemeProvider theme={theme} {...props}></ThemeProvider>
}

export default MuiThemeRoot
