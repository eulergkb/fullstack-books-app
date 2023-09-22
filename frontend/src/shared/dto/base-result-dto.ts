export type ResultStatus =
    | 'ok'
    | 'not-found'
    | 'validation-error'
    | 'bad-request'
    | 'internal-server-error'
    | 'unauthorized'

export interface BaseResultDto<Type = any> {
  status: ResultStatus
  error?: any
  validationErrors?: any[]
  data?: Type
}
