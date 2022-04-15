import api from "./api";
import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import TokenStorageService from "@/services/storage/token-storage.service";


const setupTokenInterceptor = (): void => {
  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = TokenStorageService.getTokens()?.access;

      if (token) {
        (config.headers as AxiosRequestHeaders)["Authorization"] = `Token ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default setupTokenInterceptor;
