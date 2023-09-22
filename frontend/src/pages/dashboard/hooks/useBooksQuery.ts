import { type BookDto } from '../../../shared/dto/book-dto'
import { useEffect, useState, useMemo } from 'react'
import { booksClient } from '../../../api'
import debounce from 'lodash/debounce'

interface BooksQueryState {
  books: BookDto[]
  totalBooks: number
  isLoading: boolean
  canLoadMore: boolean
  refresh: () => Promise<any>
  error?: any
  fetchMore: () => Promise<boolean>
}

function useBooksQuery ({ pageSize = 10, searchKeyword }: { pageSize?: number, searchKeyword: string | null }): BooksQueryState {
  const [page, setPage] = useState(1)
  const [totalBooks, setTotalBooks] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [books, setBooks] = useState<BookDto[]>([])
  const [error, setError] = useState<any>(null)

  const canLoadMore = !isLoading && books.length < totalBooks

  const fetchPage = async (currentPage: number, size: number, filter: string | null) => {
    setError(null)
    setIsLoading(true)

    try {
      return await booksClient.getAllBooks({
        page: currentPage,
        filter: filter ?? '',
        size
      })
    } catch (error) {
      setError(error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedSearch = useMemo(() => debounce(async (filter: string | null) => {
    const activePage = 1
    const result = await fetchPage(activePage, pageSize, filter)
    if (result !== null) {
      setTotalBooks(result.totalCount)
      setBooks(result.items)
      setPage(activePage + 1)
    }
  }, 480), [pageSize])

  const handleFetchCurrentPage = async () => {
    const result = await fetchPage(page, pageSize, searchKeyword)
    if (result !== null) {
      setTotalBooks(result.totalCount)
      setBooks(prevBooks => [...prevBooks, ...result.items])
      setPage(prevPage => prevPage + 1)
    }
  }

  const handleFetchMore = async (): Promise<boolean> => {
    if (!canLoadMore || isLoading) return false

    await handleFetchCurrentPage()

    return true
  }

  const handleRefresh = async () => {
    if (isLoading) return

    const activePage = 1
    const result = await fetchPage(activePage, pageSize, searchKeyword)
    if (result !== null) {
      setTotalBooks(result.totalCount)
      setBooks(result.items)
      setPage(activePage + 1)
    }
  }

  useEffect(() => {
    void handleFetchCurrentPage()
  }, [])

  useEffect(() => {
    if (searchKeyword === null) return

    if (searchKeyword) {
      debouncedSearch(searchKeyword)
    } else {
      handleRefresh()
    }
  }, [searchKeyword])

  return { books, totalBooks, canLoadMore, fetchMore: handleFetchMore, isLoading, error, refresh: handleRefresh }
}

export default useBooksQuery
