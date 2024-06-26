import { useAuth } from "@/store/auth";
import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000,
});

// Request Interceptor
client.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = useAuth.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response Interceptor
client.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
