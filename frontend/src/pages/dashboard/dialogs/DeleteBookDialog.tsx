import React from 'react'
import Dialog from '../../../components/Dialog'
import { type BookDto } from '../../../shared/dto/book-dto'
import { type UseDialogState } from '../../../shared/hooks/useDialog'
import { booksClient } from '../../../api'

const DeleteBookDialog = (props: { onDelete: (book: BookDto) => void } & UseDialogState) => {
  const handleDeleteBook = async () => {
    try {
      const book = props.dialogState as BookDto
      if (book && await booksClient.removeById(book.id)) {
        props.onDelete(book)
      }
    } finally {
      props.close()
    }
  }

  return (
        <Dialog
            title={'Delete Book'}
            open={props.isOpen}
            closeOnAction={false}
            onClose={props.close}
            maxWidth="xs"
            actions={[
              {
                text: 'Delete',
                color: 'secondary',
                type: 'submit',
                onClick: handleDeleteBook
              }
            ]}
        >
            Are you sure you really want to delete selected book?
        </Dialog>
  )
}
export default DeleteBookDialog
