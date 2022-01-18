import api from "../../middlewares/api";
import { AxiosRequestConfig } from "axios";
import TokenStorageService from "@/services/storage/token-storage.service";

const setupApiInterceptor = (): void => {
  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = TokenStorageService.getTokens()?.access;
      if (token) (config.headers as Record<string, string>)["Authorization"] = `Token ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default setupApiInterceptor;