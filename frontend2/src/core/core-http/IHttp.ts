import { HttpRequestOptions, HttpResponse, RequestHeadersInterceptor } from './types'

export default interface IHttp {
  get<T = unknown>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  post<T = unknown>(url: string, data: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  put<T = unknown>(url: string, data: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  patch<T = unknown>(url: string, data: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  delete<T = unknown>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  useRequestHeadersInterceptor(interceptor: RequestHeadersInterceptor): number;
  ejectRequestInterceptor(id: number): void;
}
