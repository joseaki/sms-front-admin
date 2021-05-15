import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// import {routesNames} from '../../Presentation/Routes';
declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface AxiosResponse<T = any> extends Promise<T> {}
}
/**
 * @export
 * @class HttpClient
 */
export default class HttpClient {
  protected readonly instance: AxiosInstance;

  /**
   *Creates an instance of HttpClident.
   * @param {string} baseURL
   * @memberof HttpClient
   */
  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL: 'https://authentication-hanpiy.herokuapp.com',
    });

    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      return new Promise((resolve) => {
        const token = localStorage.getItem('token');
        config.headers.Authorization = `Bearer ${token}`;
        resolve(config);
      });
    });
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError,
    );
  };

  /**
   * @private
   * @memberof HttpClient
   * @param {a} a is the axios response
   * @return {AxiosResponse}
   */
  private handleResponse = (a: AxiosResponse) => {
    return a;
  };

  /**
   * @protected
   * @memberof HttpClient
   * @param {error} error is the error for any request
   * @return {Promise}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected handleError = (error: any) => {
    return Promise.reject(error.response);
  };
}
