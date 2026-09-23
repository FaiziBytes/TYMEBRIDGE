import axios from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    /** Forwarded as the X-Session-Token header (guest/upload flows). */
    sessionToken?: string;
  }
}

export const apiBaseURL = import.meta.env.VITE_API_URL ?? "/api";

export const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (config.sessionToken) {
    config.headers["X-Session-Token"] = config.sessionToken;
  }
  // let the browser set the multipart boundary itself
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

export default axiosInstance;
