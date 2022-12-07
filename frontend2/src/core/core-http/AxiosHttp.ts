import {
  HttpRequestOptions,
  HttpResponse,
  AxiosHttpConfig,
  RequestHeadersInterceptor
} from './types'
import IHttp from './IHttp'
import axios, { AxiosInstance } from 'axios'

export default class AxiosHttp implements IHttp {
  #axiosInstance: AxiosInstance
  constructor (config: AxiosHttpConfig) {
    const { baseUrl } = config
    this.#axiosInstance = axios.create({
      baseURL: baseUrl
    })
  }

  get<T = unknown> (url: string, options?: HttpRequestOptions | undefined): Promise<HttpResponse<T>> {
    return this.#axiosInstance.get(url, options)
  }

  post<T = unknown> (url: string, data: unknown, options?: HttpRequestOptions | undefined): Promise<HttpResponse<T>> {
    return this.#axiosInstance.post<T>(url, data, options)
  }

  put<T = unknown> (url: string, data: unknown, options?: HttpRequestOptions | undefined): Promise<HttpResponse<T>> {
    return this.#axiosInstance.put<T>(url, data, options)
  }

  patch<T = unknown> (url: string, data: unknown, options?: HttpRequestOptions | undefined): Promise<HttpResponse<T>> {
    return this.#axiosInstance.patch<T>(url, data, options)
  }

  delete<T = unknown> (url: string, options?: HttpRequestOptions | undefined): Promise<HttpResponse<T>> {
    return this.#axiosInstance.delete<T>(url, options)
  }

  useRequestHeadersInterceptor (interceptor: RequestHeadersInterceptor): number {
    return this.#axiosInstance.interceptors.request.use(async (config) => {
      const headers = await interceptor()
      Object.entries(headers).forEach(([headerKey, headerValue]) => {
        if (!config.headers) {
          config.headers = {}
        }
        config.headers[headerKey] = headerValue
      })
      return config
    })
  }

  ejectRequestInterceptor (id: number): void {
    this.#axiosInstance.interceptors.request.eject(id)
  }
}
