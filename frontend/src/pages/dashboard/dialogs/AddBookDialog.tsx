import React from 'react'

import { Formik } from 'formik'
import { type UseDialogState } from '../../../shared/hooks/useDialog'
import { Box, Typography } from '@mui/material'
import Dialog from '../../../components/Dialog'
import BookForm, { validationSchema } from './BookForm'
import { booksClient } from '../../../api'
import { type CreateBookDto } from '../../../shared/dto/create-book-dto'
import { type BookDto } from '../../../shared/dto/book-dto'

const AddBookDialog = (props: { onCreated: (book: BookDto) => void } & UseDialogState): React.ReactNode => {
  const handleSubmit = async (values: any) => {
    const created = await booksClient.createBook(values as CreateBookDto)
    if (created) {
      props.onCreated(created)
    }
  }

  return (
        <Formik
            initialValues={{
              title: '',
              isbn: '',
              author: ''
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await handleSubmit(values)
              } finally {
                setSubmitting(false)
                props.close()
              }
            }}
        >
            {({ isSubmitting, handleSubmit, submitForm }) => (
                <Dialog
                    title={
                        <Box display="flex" alignItems="center">
                            {/* <AddAlertIcon /> */}
                            <Typography variant="h6" style={{ marginLeft: 10 }}>
                                Add New Book
                            </Typography>
                        </Box>
                    }
                    open={props.isOpen}
                    maxWidth="sm"
                    onClose={props.close}
                    closeOnAction={false}
                    actions={[
                      {
                        text: 'Create Book',
                        onClick: submitForm,
                        disabled: isSubmitting,
                        type: 'submit',
                        'data-testid': 'add-book-button'
                      }
                    ]}
                >
                    <BookForm onSubmit={handleSubmit} />
                </Dialog>
            )}
        </Formik>)
}

export default AddBookDialog
