import type { InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse, AxiosInterceptorManager, AxiosInterceptorOptions } from 'axios'

export type HttpRequestHeaders = Record<string, string | number | boolean>
export type HttpResponseHeaders = Partial<Record<string, string> & {
  'set-cookie'?: string[]
}>

export type HttpResponse<TData = unknown> = AxiosResponse<TData>
export type HttpRequestOptions<T = unknown> = AxiosRequestConfig<T>
export type HttpRequestInterceptor = AxiosInterceptorManager<InternalAxiosRequestConfig>
export type HttpInterceptorOptions = AxiosInterceptorOptions
export type HttpRequestInterceptorOnFulfilled<TValue> = ((value: TValue) => TValue | Promise<TValue>) | null
export type HttpRequestInterceptorOnRejected = (error: unknown) => unknown
export type HttpResponseInterceptorUse<TValue> = (
  onFulfilled: HttpRequestInterceptorOnFulfilled<TValue>,
  onRejected?: HttpRequestInterceptorOnRejected,
  options?: HttpInterceptorOptions
) => number
export type HttpInterceptorEject = (id: number) => void
export type HttpInterceptorClear = () => void
export interface HttpResponseInterceptorManager<TValue> {
  use: HttpResponseInterceptorUse<TValue>
}

export interface AxiosHttpConfig {
  baseUrl: string
}
