import { BaseClient } from './base-client'
import { type BookDto } from '../shared/dto/book-dto'
import { type CreateBookDto } from '../shared/dto/create-book-dto'
import { type BaseResultDto } from '../shared/dto/base-result-dto'

interface PaginationQuery {
  page?: number
  size?: number
}

interface FilterQuery {
  filter?: string
}

type GetAllBooksQuery = PaginationQuery & FilterQuery

interface PaginationResult<TData> {
  totalCount: number
  items: TData[]
}

export class BooksClient extends BaseClient {
  constructor (protected baseUrl: string) {
    super(baseUrl)
  }

  async getAllBooks (query: GetAllBooksQuery): Promise<PaginationResult<BookDto>> {
    const params = new URLSearchParams(query as Record<string, string>)
    const response = await fetch(this.getAbsoluteUrl(`/books?${String(params)}`), {
      method: 'get',
      headers: this.defaultHeaders
    })

    return await response.json() as PaginationResult<BookDto>
  }

  async getById (id: number): Promise<BookDto | null> {
    const response = await fetch(this.getAbsoluteUrl(`/books/${id}`), {
      method: 'get',
      headers: this.defaultHeaders
    })

    const payload = await response.json() as BaseResultDto<BookDto>
    return payload.data as BookDto
  }

  async createBook (model: CreateBookDto) {
    const response = await fetch(this.getAbsoluteUrl('/books'), {
      method: 'post',
      headers: this.defaultHeaders,
      body: JSON.stringify(model)
    })

    const payload = await response.json() as BaseResultDto<BookDto>
    return payload.data as BookDto
  }

  async updateById (id: number, body: CreateBookDto): Promise<BookDto | null> {
    const response = await fetch(this.getAbsoluteUrl(`/books/${id}`), {
      method: 'put',
      headers: this.defaultHeaders,
      body: JSON.stringify(body)
    })

    const payload = await response.json() as BaseResultDto<BookDto>
    return payload.data as BookDto
  }

  async removeById (id: number): Promise<boolean> {
    const response = await fetch(this.getAbsoluteUrl(`/books/${id}`), {
      method: 'delete',
      headers: this.defaultHeaders
    })

    return response.status.toString().startsWith('2')
  }
}
