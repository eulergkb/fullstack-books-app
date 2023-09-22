import { useState } from 'react'

export interface UseDialogState {
  isOpen: boolean
  dialogState: any
  show: (state?: any) => void
  close: () => void
}

export default function useDialog (): UseDialogState {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogState, setDialogState] = useState(null)
  const handleShow = (state?: any) => {
    setDialogState(state)
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
    setDialogState(null)
  }
  return { isOpen, dialogState, show: handleShow, close: handleClose }
}
