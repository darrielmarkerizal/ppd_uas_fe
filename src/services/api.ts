import axios, { AxiosError } from "axios";
import { PredictionRequest, PredictionResponse } from "@/types/prediction";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const predictionAPI = {
  predict: async (data: PredictionRequest): Promise<PredictionResponse> => {
    try {
      const response = await apiClient.post<PredictionResponse>(
        "/api/predict/",
        data
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Prediction failed");
      }
      throw error;
    }
  },
};
