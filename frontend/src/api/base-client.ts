import { USER_SESSION_KEY } from '../shared/constants'

export abstract class BaseClient {
  protected constructor (protected baseUrl: string) {
  }

  protected get accessToken () {
    const session = window.localStorage.getItem(USER_SESSION_KEY)
    if (session) {
      return JSON.parse(session).accessToken as string
    }
    return null
  }

  protected getAbsoluteUrl (url: string) {
    return `${this.baseUrl.endsWith('/') ? this.baseUrl.substring(0, this.baseUrl.length - 1) : this.baseUrl}/${url.startsWith('/') ? url.substring(1) : url}`
  }

  protected get defaultHeaders () {
    const headers: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
    const _accessToken = this.accessToken

    if (_accessToken) {
      headers.Authorization = 'Bearer ' + _accessToken
    }

    return headers
  }
}
