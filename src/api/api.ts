import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";

const REACT_APP_API_BASE_URL = 4200 || process.env.REACT_APP_API_BASE_URL;
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${REACT_APP_API_BASE_URL}/api/`,
  withCredentials: true,
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    // Сделайте что-нибудь перед отправкой запроса
    // config.headers["authorization"] = window.localStorage.getItem("authorization");
    return config;
  },
  (error) => {
    // Сделайте что-нибудь с ошибкой запроса
    return Promise.reject(error);
  }
);

// Добавить перехватчик ответа
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
    // Сделайте что-нибудь с данными ответа
    return response;
  },
  (error) => {
    // Сделайте что-нибудь с ошибкой ответа
    return Promise.reject(error);
  }
);

class HttpRequest {
  public axios: AxiosInstance;
  constructor() {
    this.axios = axiosInstance;
  }

  public setHeader(header: any) {
    // this.axios.defaults.headers.common[header.key] = header.value;
    // this.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  public fetch<T = any>(methodName: string, config: AxiosRequestConfig): AxiosPromise<T> {
    const { data } = config;
    return this.axios.get(methodName, {
      params: data,
    });
  }

  public create<T = any>(methodName: string, config: AxiosRequestConfig): AxiosPromise<T> {
    return this.axios.post(methodName, config);
  }

  public update<T = any>(methodName: string, config: AxiosRequestConfig): AxiosPromise<T> {
    const { data } = config;
    return this.axios.put(methodName, data);
  }

  public patch<T = any>(methodName: string, config: AxiosRequestConfig): AxiosPromise<T> {
    const { data } = config;
    return this.axios.patch(methodName, data);
  }

  public delete(methodName: string, config: AxiosRequestConfig): AxiosPromise {
    const { data } = config;

    return this.axios.delete(methodName);
    // return this.axios.delete(methodName, { params: { id: data } });
  }

  public request<T = any>(type: string, url: string, config: AxiosRequestConfig): AxiosPromise<T> {
    const { data } = config;
    let promise: AxiosPromise<T>;
    switch (type) {
      case "GET":
        promise = axios.get(url, { params: data });
        break;
      case "POST":
        promise = axios.post(url, data);
        break;
      case "PUT":
        promise = axios.put(url, data);
        break;
      case "PATCH":
        promise = axios.patch(url, data);
        break;
      case "DELETE":
        promise = axios.delete(url, data);
        break;
      default:
        promise = axios.get(url, { params: data });
        break;
    }
    return promise;
  }
}

export default HttpRequest;
