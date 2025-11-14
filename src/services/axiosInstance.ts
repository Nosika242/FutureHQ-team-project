

import axios, { AxiosError } from "axios";

const baseURL = "https://titusukpono.pythonanywhere.com";

const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// custom error format
export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

// Intercept responses globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API Error:", error);
    const responseData = error.response?.data as any;
    const formattedError: ApiError = {
      message:
        responseData?.detail || 
        responseData?.message ||
        error.message ||
        "An unknown error occurred",
      status: error.response?.status,
      details: responseData,
    };

    return Promise.reject(formattedError);
  }
);

export default axiosInstance;
