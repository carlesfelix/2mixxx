import { type HttpRequestOptions, type HttpResponse, type HttpRequestInterceptor, type HttpResponseInterceptorManager } from './types'

export default interface IHttp {
  get: <T = unknown>(url: string, options?: HttpRequestOptions) => Promise<HttpResponse<T>>
  post: <T = unknown>(url: string, data: unknown, options?: HttpRequestOptions) => Promise<HttpResponse<T>>
  put: <T = unknown>(url: string, data: unknown, options?: HttpRequestOptions) => Promise<HttpResponse<T>>
  patch: <T = unknown>(url: string, data: unknown, options?: HttpRequestOptions) => Promise<HttpResponse<T>>
  delete: <T = unknown>(url: string, options?: HttpRequestOptions) => Promise<HttpResponse<T>>
  requestInterceptors: () => HttpRequestInterceptor
  responseInterceptors: () => HttpResponseInterceptorManager<HttpResponse>
}
