import { HttpRequestOptions, HttpResponse, RequestHeadersInterceptor } from "./types";

export default interface IHttp {
  get<T = any>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  post<T = any>(url: string, data: any, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  put<T = any>(url: string, data: any, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  patch<T = any>(url: string, data: any, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  delete<T = any>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  useRequestHeadersInterceptor(interceptor: RequestHeadersInterceptor): number;
  ejectRequestInterceptor(id: number): void;
}
