export interface PredictionRequest {
  gender: string;
  age: number;
  height: number;
  weight: number;
  is_family_history_with_overweight: boolean;
  favc: boolean;
  fcvc: number;
  ncp: number;
  caec: string;
  smoke: boolean;
  ch2o: number;
  scc: boolean;
  faf: number;
  tue: number;
  calc: string;
  mtrans: string;
}

export interface PredictionResponse {
  data: {
    class_name: string;
    class_probabilities: number[];
    predicted_class: number;
  };
  success: boolean;
}

export const obesityClasses = [
  "Insufficient_Weight",
  "Normal_Weight",
  "Overweight_Level_I",
  "Overweight_Level_II",
  "Obesity_Type_I",
  "Obesity_Type_II",
  "Obesity_Type_III",
];

export const classDisplayNames = {
  Insufficient_Weight: "Berat Badan Kurang",
  Normal_Weight: "Berat Badan Normal",
  Overweight_Level_I: "Kelebihan Berat Badan Tingkat I",
  Overweight_Level_II: "Kelebihan Berat Badan Tingkat II",
  Obesity_Type_I: "Obesitas Tipe I",
  Obesity_Type_II: "Obesitas Tipe II",
  Obesity_Type_III: "Obesitas Tipe III",
};
