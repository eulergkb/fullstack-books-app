import React, { useState } from 'react'
import DashboardLayout from '../../layouts/dashboard/DashboardLayout'
import DeleteBookDialog from './dialogs/DeleteBookDialog'
import useDialog from '../../shared/hooks/useDialog'
import { type BookDto } from '../../shared/dto/book-dto'
import AddBookDialog from './dialogs/AddBookDialog'
import EditBookDialog from './dialogs/EditBookDialog'
import {
  Box, Container, Divider, LinearProgress, Paper, TextField, Typography, Button,
  List,
  Chip,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material'
import useBooksQuery from './hooks/useBooksQuery'
import { Waypoint } from 'react-waypoint'
import LayersIcon from '@mui/icons-material/Layers'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RefreshIcon from '@mui/icons-material/Refresh'

function EmptyView (props: { onAddBook?: () => void }) {
  return <Box sx={{ p: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <LayersIcon sx={{ color: 'primary.main', fontSize: 66 }}/>
      <Typography variant="subtitle1">There are no books to show yet!</Typography>
      {(props.onAddBook) && <Button variant="outlined" sx={{ mt: 2 }} size="small" onClick={props.onAddBook}>Add New Book</Button>}
    </Box>
}

interface BookItemViewProps {
  book: BookDto
  onDelete: (book: BookDto) => void
  onUpdate: (book: BookDto) => void
}

function BookItemView ({ book, onDelete, onUpdate }: BookItemViewProps) {
  return <ListItem
      secondaryAction={
          <>
              <IconButton edge="end" aria-label="delete" onClick={() => { onUpdate(book) }}>
                  <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" sx={{ ml: 2 }} onClick={() => { onDelete(book) }}>
                  <DeleteIcon />
              </IconButton>
          </>
      }
  >
      <ListItemAvatar>
          <Box
              component="img"
              src="https://placehold.co/600x400"
              width={128}
              sx={{ mr: 2, borderRadius: 2, boxShadow: 1 }}
          />
      </ListItemAvatar>
      <ListItemText
          primary={book.title}
          primaryTypographyProps={{
            fontSize: 18,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
          secondary={
              <>
                  <Box component="span" display="flex" alignItems="flex-end">
                      <Typography
                          variant="body1"
                          component="span"
                          sx={{ fontWeight: 600, color: 'black' }}
                      >
                          ISBN:
                      </Typography>
                      <Typography
                          sx={{
                            ml: 0.5,
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden'
                          }}
                          component="span"
                          variant="body1"
                          color="text.primary"
                      >
                          {book.isbn}
                      </Typography>
                  </Box>
                  <Chip component="span" label={book.author} color="primary" size="small" />
              </>
          }
      />
  </ListItem>
}

const Dashboard: React.FunctionComponent = (): React.ReactNode => {
  const [filter, setFilter] = useState<string | null>(null)
  const deleteDialog = useDialog()
  const addDialog = useDialog()
  const updateDialog = useDialog()
  const dataSource = useBooksQuery({ searchKeyword: filter })

  const handleShowAddDialog = () => { addDialog.show() }
  const handleShowDeleteDialog = (book: BookDto) => { deleteDialog.show(book) }
  const handleShowUpdateDialog = (book: BookDto) => { updateDialog.show(book) }

  const handleBookDeleted = (book: BookDto) => {
    dataSource.refresh()
  }

  const handleBookAdded = (book: BookDto) => {
    dataSource.refresh()
  }

  const handleBookUpdate = (book: BookDto) => {
    dataSource.refresh()
  }

  const handleSearchKeywordChanged = (keyword: string) => {
    setFilter(keyword)
  }

  const handleFetchMore = async (args: any) => {
    if (dataSource.canLoadMore) {
      await dataSource.fetchMore()
    }
  }

  return <DashboardLayout title={'Books Libray Ap'}>
          <Container disableGutters maxWidth="md" sx={{ pt: 2, pb: 6 }}>
              <Paper sx={{ mt: 0.1, p: 1 }} >

                 <Chip label={`Total Books: ${dataSource.totalBooks}`} sx={{ mb: 2 }} size="small" color={dataSource.totalBooks > 0 ? 'success' : 'default'}/>

                  <Box display="flex" flexDirection="row">
                      <Box sx={{ flexGrow: 1, alignItems: 'flex-end', mr: 4 }}>
                          <TextField placeholder="Search books by title, isbn or author"
                                     value={filter ?? ''}
                                     fullWidth
                                     variant="standard"
                                     onChange={e => { handleSearchKeywordChanged(e.target.value) }}/>
                      </Box>
                      <Button variant="contained" sx={{ mx: 0.2 }} startIcon={<AddBoxIcon/>} onClick={handleShowAddDialog}>Create Book</Button>
                      <Button variant="outlined" startIcon={<RefreshIcon/>} onClick={dataSource.refresh}>Refresh</Button>
                  </Box>
                  <Divider sx={{ my: 2.5 }}/>

                  {dataSource.isLoading && <Box sx={{ width: '100%' }}>
                      <LinearProgress/>
                  </Box>}
                  <List sx={{ width: '100%', minHeight: 380, maxHeight: 'calc(60vh)', overflow: 'auto' }}>
                      {dataSource.books.length === 0 ? <EmptyView onAddBook={handleShowAddDialog}/> : dataSource.books.map(book => <BookItemView key={book.id} book={book} onUpdate={handleShowUpdateDialog} onDelete={handleShowDeleteDialog} />)}
                      <Waypoint onEnter={handleFetchMore} />
                  </List>

              </Paper>
          </Container>
      {addDialog.isOpen && <AddBookDialog onCreated={handleBookAdded} {...addDialog}/>}
      {updateDialog.isOpen && <EditBookDialog onUpdate={handleBookUpdate} {...updateDialog}/>}
      {deleteDialog.isOpen && <DeleteBookDialog onDelete={handleBookDeleted} {...deleteDialog}/>}
    </DashboardLayout>
}

export default Dashboard
