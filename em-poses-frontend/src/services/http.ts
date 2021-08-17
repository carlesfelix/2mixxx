import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

function get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axios.get<T>(url, config);
}

function post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axios.post<T>(url, data, config);
}

function put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axios.put<T>(url, data, config);
}

function patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axios.patch<T>(url, data, config);
}

function _delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axios.delete<T>(url, config);
}

function addCommonHeader(headerKey: string, headerValue: string): void {
  axios.defaults.headers.common[headerKey] = headerValue;
}

function removeCommonHeader(headerKey: string): void {
  delete axios.defaults.headers.common[headerKey];
}

function addRequestInterceptor(onFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>, onRejected?: (error: any) => void): number {
  return axios.interceptors.request.use(onFulfilled, onRejected);
}

function removeRequestInterceptor(id: number): void {
  axios.interceptors.request.eject(id);
}

function addResponseInterceptor(onFulfilled?: (config: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>, onRejected?: (error: any) => void): number {
  return axios.interceptors.response.use(onFulfilled, onRejected);
}

function removeResponseInterceptor(id: number): void {
  axios.interceptors.response.eject(id);
}

function setBaseUrl(url: string): void {
  axios.defaults.baseURL = url;
}

const http = {
  get, post, put, patch, delete: _delete,
  addCommonHeader, removeCommonHeader,
  addRequestInterceptor, removeRequestInterceptor,
  addResponseInterceptor, removeResponseInterceptor,
  setBaseUrl
};

export default http;
