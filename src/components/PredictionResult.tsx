import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Scale, Brain, AlertCircle } from "lucide-react";
import {
  PredictionResponse,
  obesityClasses,
  classDisplayNames,
} from "@/types/prediction";

interface PredictionResultProps {
  prediction: PredictionResponse | null;
  error: string | null;
}

export function PredictionResult({ prediction, error }: PredictionResultProps) {
  const getClassColor = (className: string) => {
    switch (className) {
      case "Insufficient_Weight":
        return "from-blue-50 to-cyan-50 border-blue-200 text-blue-600";
      case "Normal_Weight":
        return "from-emerald-50 to-green-50 border-emerald-200 text-emerald-600";
      case "Overweight_Level_I":
        return "from-yellow-50 to-amber-50 border-yellow-200 text-yellow-600";
      case "Overweight_Level_II":
        return "from-orange-50 to-orange-50 border-orange-200 text-orange-600";
      case "Obesity_Type_I":
        return "from-red-50 to-pink-50 border-red-200 text-red-600";
      case "Obesity_Type_II":
        return "from-red-50 to-red-50 border-red-300 text-red-700";
      case "Obesity_Type_III":
        return "from-red-100 to-red-50 border-red-400 text-red-800";
      default:
        return "from-gray-50 to-gray-50 border-gray-200 text-gray-600";
    }
  };

  if (error) {
    return (
      <Card className="mt-8 border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Error: {error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!prediction || !prediction.success) {
    return null;
  }

  return (
    <Card className="mt-12 shadow-lg border-slate-200">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Scale className="w-5 h-5 text-emerald-600" />
          </div>
          Hasil Prediksi
        </CardTitle>
        <CardDescription className="text-base">
          Berdasarkan data yang Anda masukkan, berikut adalah hasil prediksi AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Main Prediction */}
        <div className="mb-8">
          <div
            className={`text-center p-8 bg-gradient-to-r rounded-xl border ${getClassColor(
              prediction.data.class_name
            )}`}
          >
            <div className="text-4xl font-bold mb-3">
              {
                classDisplayNames[
                  prediction.data.class_name as keyof typeof classDisplayNames
                ]
              }
            </div>
            <div className="text-lg font-medium opacity-80">
              Predicted Class: {prediction.data.predicted_class}
            </div>
            <div className="text-sm opacity-70 mt-2">
              Confidence:{" "}
              {(
                prediction.data.class_probabilities[
                  prediction.data.predicted_class
                ] * 100
              ).toFixed(1)}
              %
            </div>
          </div>
        </div>

        {/* Class Probabilities */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            Probabilitas Semua Kelas:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {obesityClasses.map((className, index) => (
              <div
                key={className}
                className={`p-3 rounded-lg border transition-all ${
                  index === prediction.data.predicted_class
                    ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-200"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="text-sm font-medium text-slate-700 mb-1">
                  {
                    classDisplayNames[
                      className as keyof typeof classDisplayNames
                    ]
                  }
                </div>
                <div className="text-lg font-bold text-slate-900">
                  {(prediction.data.class_probabilities[index] * 100).toFixed(
                    1
                  )}
                  %
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
