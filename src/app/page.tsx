"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Brain } from "lucide-react";
import { PersonalInfoSection } from "@/components/PersonalInfoSection";
import { EatingHabitsSection } from "@/components/EatingHabitsSection";
import { LifestyleSection } from "@/components/LifestyleSection";
import { PredictionResult } from "@/components/PredictionResult";
import { predictionAPI } from "@/services/api";
import { PredictionRequest, PredictionResponse } from "@/types/prediction";

export default function MLPredictionPage() {
  const [formData, setFormData] = useState<Partial<PredictionRequest>>({
    fcvc: 2,
    ncp: 3,
    ch2o: 2.0,
    faf: 1,
    tue: 1,
  });
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = (field: keyof PredictionRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const requiredFields: (keyof PredictionRequest)[] = [
        "gender",
        "age",
        "height",
        "weight",
        "caec",
        "calc",
        "mtrans",
      ];

      for (const field of requiredFields) {
        if (!formData[field]) {
          throw new Error(`Field ${field} harus diisi`);
        }
      }

      const requestBody: PredictionRequest = {
        gender: formData.gender!,
        age: Number(formData.age),
        height: Number(formData.height),
        weight: Number(formData.weight),
        is_family_history_with_overweight:
          formData.is_family_history_with_overweight || false,
        favc: formData.favc || false,
        fcvc: formData.fcvc || 2,
        ncp: formData.ncp || 3,
        caec: formData.caec!,
        smoke: formData.smoke || false,
        ch2o: formData.ch2o || 2.0,
        scc: formData.scc || false,
        faf: formData.faf || 1,
        tue: formData.tue || 1,
        calc: formData.calc!,
        mtrans: formData.mtrans!,
      };

      const response = await predictionAPI.predict(requestBody);
      setPrediction(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat melakukan prediksi"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-indigo-100 rounded-2xl">
              <Brain className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-800">
              Prediksi Tingkat Obesitas
            </h1>
          </div>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Masukkan informasi personal dan kebiasaan hidup Anda untuk
            mendapatkan prediksi tingkat obesitas menggunakan algoritma machine
            learning yang telah terlatih
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <PersonalInfoSection
            formData={formData}
            updateFormData={updateFormData}
          />
          <EatingHabitsSection
            formData={formData}
            updateFormData={updateFormData}
          />
          <LifestyleSection
            formData={formData}
            updateFormData={updateFormData}
          />

          {/* Prediction Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="px-8 py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Memproses Prediksi...
                </>
              ) : (
                <>
                  <Brain className="w-6 h-6 mr-3" />
                  Prediksi Tingkat Obesitas
                </>
              )}
            </Button>
          </div>
        </form>

        <PredictionResult prediction={prediction} error={error} />
      </div>
    </div>
  );
}
