import React, { forwardRef } from 'react'
import * as yup from 'yup'
import TextInput from '../../../components/TextInput'
import { Box } from '@mui/material'

interface BookFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void
}

export const validationSchema = yup.object().shape({
  title: yup.string().required('Enter book title'),
  isbn: yup.string().required('Enter book ISBN'),
  author: yup.string().required('Enter book author')
})

const BookForm = forwardRef<HTMLFormElement, BookFormProps>(function BookForm (props, ref) {
  return <Box ref={ref} component="form" onSubmit={props.onSubmit} noValidate sx={{ mt: 1 }}>
    <TextInput
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        placeholder="Enter book title"
    />

    <TextInput
        margin="normal"
        required
        fullWidth
        id="isbn"
        label="ISBN"
        placeholder="Enter book ISBN"
        name="isbn"
    />

    <TextInput
        margin="normal"
        required
        fullWidth
        id="author"
        label="Author"
        placeholder="Enter the name of book author"
        name="author"
    />
  </Box>
})

export default BookForm
