import React from 'react'
import { type UseDialogState } from '../../../shared/hooks/useDialog'
import { Formik } from 'formik'
import { type BookDto } from '../../../shared/dto/book-dto'
import Dialog from '../../../components/Dialog'
import { Box, Typography } from '@mui/material'
import BookForm, { validationSchema } from './BookForm'
import { booksClient } from '../../../api'

const EditBookDialog = (props: { onUpdate: (updated: BookDto) => void } & UseDialogState) => {
  const book = props.dialogState as BookDto

  const handleSubmit = async (values: any) => {
    const updated = await booksClient.updateById(book.id, {
      title: values.title,
      isbn: values.isbn,
      author: values.author
    })

    if (updated) {
      props.onUpdate(updated)
    }
  }

  return (
        <Formik
            initialValues={book}
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
            {({ submitForm, handleSubmit }) => (
                <Dialog
                    title={
                        <Box display="flex" alignItems="center">
                            {/* <AddAlertIcon /> */}
                            <Typography variant="h6" style={{ marginLeft: 10 }}>
                                Edit Book
                            </Typography>
                        </Box>
                    }
                    open={props.isOpen}
                    onClose={props.close}
                    maxWidth="sm"
                    closeOnAction={false}
                    actions={[
                      {
                        text: 'Save Changes',
                        onClick: submitForm,
                        type: 'submit',
                        'data-testid': 'edit-book-button'
                      }
                    ]}
                >
                    <BookForm onSubmit={handleSubmit}/>
                </Dialog>
            )}
        </Formik>
  )
}

export default EditBookDialog
