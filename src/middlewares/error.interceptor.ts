import api from "./api";
import { AxiosResponse } from "axios";


const setupErrorInterceptor = (): void => {
  api.interceptors.response.use((response: AxiosResponse) => {
      return response;
    },
    (error) => {
      const message = error?.error_message;


      return Promise.reject(error);
    });
};

export default setupErrorInterceptor;
