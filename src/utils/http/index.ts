import axios, { AxiosInstance } from 'axios';

axios.defaults['headers']['x-csrf-token'] = (window as any)._csrf;
const http: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  timeoutErrorMessage: '哎呀服务器走丢了～',
});

http.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

http.interceptors.response.use(
  response => {
    const {data} = response;
    if(data.status === 'NOT_LOGIN' || data.code === 0) {
      window.location.href='/login';
      return Promise.resolve(response);
    }
    return Promise.resolve(response);
  },
  error => Promise.reject(error)
)

export default http;

