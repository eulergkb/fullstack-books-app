import React from 'react'
import { useField } from 'formik'
import { TextField } from '@mui/material'

interface TextInputProps {
  id: string
  inputProps?: TextInputProps
  name: string
  [key: string]: any
}

const TextInput = ({ id, name, inputProps, ...props }: TextInputProps) => {
  const [field, meta, helpers] = useField({
    name
  })

  return (
    <TextField
        id={id}
      helperText={meta.error}
      {...field}
      {...props}
        inputProps={{
          ...inputProps,
          'data-testid': id
        }}

      onChange={(evt) => {
        helpers.setValue(evt.target.value)
      }}
      error={meta.touched && Boolean(meta.error)}
    />
  )
}

export default TextInput
