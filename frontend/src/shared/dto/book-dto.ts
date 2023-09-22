export interface BookDto {
  id: number
  title: string
  author: string
  isbn: string
  createdAt: Date
  updatedAt: Date | null
}
