import {
  type HttpRequestOptions,
  type HttpResponse,
  type AxiosHttpConfig,
  type HttpRequestInterceptor,
  type HttpResponseInterceptorManager
} from './types'
import type IHttp from './IHttp'
import axios, { type AxiosInstance } from 'axios'

export default class AxiosHttp implements IHttp {
  readonly #axiosInstance: AxiosInstance
  constructor (config: AxiosHttpConfig) {
    const { baseUrl } = config
    this.#axiosInstance = axios.create({
      baseURL: baseUrl
    })
  }

  async get<T = unknown> (url: string, options?: HttpRequestOptions | undefined): Promise<HttpResponse<T>> {
    return await this.#axiosInstance.get(url, options)
  }

  async post<T = unknown> (url: string, data: unknown, options?: HttpRequestOptions | undefined): Promise<HttpResponse<T>> {
    return await this.#axiosInstance.post<T>(url, data, options)
  }

  async put<T = unknown> (url: string, data: unknown, options?: HttpRequestOptions | undefined): Promise<HttpResponse<T>> {
    return await this.#axiosInstance.put<T>(url, data, options)
  }

  async patch<T = unknown> (url: string, data: unknown, options?: HttpRequestOptions | undefined): Promise<HttpResponse<T>> {
    return await this.#axiosInstance.patch<T>(url, data, options)
  }

  async delete<T = unknown> (url: string, options?: HttpRequestOptions | undefined): Promise<HttpResponse<T>> {
    return await this.#axiosInstance.delete<T>(url, options)
  }

  requestInterceptors (): HttpRequestInterceptor {
    return this.#axiosInstance.interceptors.request
  }

  responseInterceptors (): HttpResponseInterceptorManager<HttpResponse> {
    return this.#axiosInstance.interceptors.response
  }
}
