import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
  IconButton,
  Box,
  type Breakpoint
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'

interface DialogProps {
  title: React.ReactNode
  children: React.ReactNode
  open: boolean
  onClose: () => void
  maxWidth: Breakpoint
  showCloseButton?: boolean
  fullWidth?: boolean
  closeOnAction?: boolean
  actions: any[]
}

const Dialog = ({
  title,
  children,
  open,
  onClose,
  maxWidth,
  showCloseButton = true,
  fullWidth = true,
  closeOnAction = true,
  actions
}: DialogProps) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      {title && (
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>{title}</Box>
            {showCloseButton && (
              <Box>
                <IconButton size="small" onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
      {actions && (
        <DialogActions>
          {actions.map(({ onClick, text, ...action }, index) => (
            <Button
              key={index}
              color="primary"
              {...action}
              onClick={async () => {
                try {
                  await onClick()
                } finally {
                  if (closeOnAction) onClose()
                }
              }}
            >
              {text}
            </Button>
          ))}
        </DialogActions>
      )}
    </MuiDialog>
  )
}

export default Dialog
