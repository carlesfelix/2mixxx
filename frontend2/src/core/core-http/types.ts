export type HttpRequestHeaders = Record<string, string | number | boolean>
export type HttpResponseHeaders = Partial<Record<string, string> & {
  'set-cookie'?: string[]
}>

export type HttpResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream'

export interface HttpResponse<Data = unknown> {
  data: Data
  status: number
  headers: HttpResponseHeaders
}

export interface HttpRequestOptions {
  params?: unknown
  headers?: HttpRequestHeaders
  responseType?: HttpResponseType
}
export type RequestHeadersInterceptor = () => Promise<HttpRequestHeaders>
export interface AxiosHttpConfig {
  baseUrl: string
}
