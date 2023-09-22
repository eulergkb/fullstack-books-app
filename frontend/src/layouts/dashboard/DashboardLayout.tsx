import React from 'react'
import { CssBaseline, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box } from '@mui/material'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import AccountCircle from '@mui/icons-material/AccountCircle'
import useAuthProvider from '../../shared/hooks/useAuthProvider'

interface DashboardLayoutProps {
  title?: string
  children: React.ReactNode
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  const authProvider = useAuthProvider()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      await authProvider.clearSession(false)
      window.location.reload()
    }
  }

  return <Box component="main" sx={{ flexGrow: 1 }}>
        <CssBaseline/>
      <AppBar position="static">
          <Toolbar>
              <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
              >
                  <LibraryBooksIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {props.title ?? 'Books Library App'}
              </Typography>
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  data-testid="user-profile-icon"
                  onClick={handleMenu}
              >
                  <AccountCircle />
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
              >
                  <MenuItem onClick={handleSignOut} data-testid="logout">Sign Out</MenuItem>
              </Menu>
          </Toolbar>
      </AppBar>
        {props.children}
    </Box>
}

export default DashboardLayout
