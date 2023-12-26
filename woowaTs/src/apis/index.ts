import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;
class API {
  readonly method: Method;
  readonly url: string;
  baseURL?: string;
  headers?: AxiosRequestConfig['headers'];
  params?: AxiosRequestConfig['params'];
  data?: unknown; // request body
  timeout?: number;
  withCredentials?: boolean;

  constructor(method: Method, url: string) {
    this.method = method;
    this.url = url;
  }

  /** 실제 요청을 수행 */
  call<T>(): AxiosPromise<T> {
    const http = axios.create();

    if (this.withCredentials) {
      http.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response && error.response.status === 401) {
            /* 에러 처리 진행 */
          }
          return Promise.reject(error);
        }
      );
    }

    return http.request({ ...this });
  }
}

export class APIBuilder {
  private _instance: API;

  constructor(method: Method, url: string, data?: unknown) {
    this._instance = new API(method, url);
    this._instance.baseURL = BASE_URL;
    this._instance.data = data;
    this._instance.headers = {
      'Content-Type': 'application/json charset=utf-8',
    };
    this._instance.timeout = 5000;
    this._instance.withCredentials = false;
  }

  static get = (url: string) => new APIBuilder('GET', url);
  static put = (url: string, data: unknown) => new APIBuilder('PUT', url, data);
  static post = (url: string, data: unknown) =>
    new APIBuilder('POST', url, data);
  static delete = (url: string) => new APIBuilder('DELETE', url);

  baseURL(value: string): APIBuilder {
    this._instance.baseURL = value;
    return this;
  }
  // TODO: HTTP Header Type
  headers(value: any): APIBuilder {
    this._instance.headers = value;
    return this;
  }

  timeout(value: number): APIBuilder {
    this._instance.timeout = value;
    return this;
  }

  params(value: any): APIBuilder {
    this._instance.params = value;
    return this;
  }

  data(value: unknown): APIBuilder {
    this._instance.data = value;
    return this;
  }

  withCredentials(value: boolean): APIBuilder {
    this._instance.withCredentials = value;
    return this;
  }

  build(): API {
    return this._instance;
  }
}
