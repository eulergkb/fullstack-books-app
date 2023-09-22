import { AuthClient } from './auth-client'
import { BooksClient } from './books-client'
import { type BaseClient } from './base-client'

const BASE_URL = process.env.REACT_APP_API_CLIENT_BASE_URL ?? ''

function createClient<TClient extends BaseClient> (ApiClient: new (baseUrl: string) => any): TClient {
  return new ApiClient(BASE_URL)
}

export const authClient = createClient<AuthClient>(AuthClient)
export const booksClient = createClient<BooksClient>(BooksClient)
