
export type HttpResponse<Data = any> = {
  data: Data;
  status: number;
  headers: HttpResponseHeaders;
};

export type HttpRequestHeaders = Record<string, string | number | boolean>;
export type HttpResponseHeaders = Partial<Record<string, string> & {
  "set-cookie"?: string[]
}>;

export type HttpResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';

export type HttpRequestOptions = {
  params?: any;
  headers?: HttpRequestHeaders;
  responseType?: HttpResponseType;
};
export type RequestHeadersInterceptor = () => Promise<HttpRequestHeaders>;
export type AxiosHttpConfig = {
  baseUrl: string;
};
