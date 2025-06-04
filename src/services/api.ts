import axios from "axios";
import { PredictionRequest, PredictionResponse } from "@/types/prediction";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const predictionAPI = {
  predict: async (data: PredictionRequest): Promise<PredictionResponse> => {
    const response = await axios.post<PredictionResponse>(
      `${API_URL}/api/predict/`,
      data
    );
    return response.data;
  },
};
