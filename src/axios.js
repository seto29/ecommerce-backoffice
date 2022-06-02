import axios from "axios";
import Cookies from "js-cookie";
import { reCreate } from './services/Token'

const instance = axios.create({
  baseURL: "https://api-dev.hijiofficial.com/v2",
});
instance.defaults.timeout = 5000;
instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = 'Bearer ' + Cookies.get('token')
  return config;
});
instance.interceptors.response.use((response) => {
  if (response.data.status === 401) {
    reCreate().then(({ status }) => {
      if (status === 200) {
        const originalRequest = response.originalRequest;
        originalRequest.headers['Authorization'] = 'Bearer ' + Cookies.get('token')
        return axios.request(originalRequest.url, originalRequest.data, originalRequest.method, {}, false);
      }
    })

  } else {
    return response;

  }
});
export default instance;
