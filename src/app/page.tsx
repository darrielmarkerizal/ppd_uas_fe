"use client";

import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Brain,
  Activity,
  User,
  Utensils,
  Droplets,
  Scale,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface PredictionRequest {
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

interface PredictionResponse {
  data: {
    class_name: string;
    class_probabilities: number[];
    predicted_class: number;
  };
  success: boolean;
}

const obesityClasses = [
  "Insufficient_Weight",
  "Normal_Weight",
  "Overweight_Level_I",
  "Overweight_Level_II",
  "Obesity_Type_I",
  "Obesity_Type_II",
  "Obesity_Type_III",
];

const classDisplayNames = {
  Insufficient_Weight: "Berat Badan Kurang",
  Normal_Weight: "Berat Badan Normal",
  Overweight_Level_I: "Kelebihan Berat Badan Tingkat I",
  Overweight_Level_II: "Kelebihan Berat Badan Tingkat II",
  Obesity_Type_I: "Obesitas Tipe I",
  Obesity_Type_II: "Obesitas Tipe II",
  Obesity_Type_III: "Obesitas Tipe III",
};

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

      // Log request body ke console
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));

      // Menggunakan axios untuk melakukan request
      const response = await axios.post<PredictionResponse>(
        "http://172.20.10.5:5000/api/predict/",
        requestBody
      );

      setPrediction(response.data);
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
          {/* Personal Information Section */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                Informasi Personal
              </CardTitle>
              <CardDescription className="text-base">
                Data dasar tentang profil fisik Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="gender"
                    className="text-sm font-medium text-slate-700"
                  >
                    Jenis Kelamin *
                  </Label>
                  <Select
                    value={formData.gender || ""}
                    onValueChange={(value) => updateFormData("gender", value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Laki-laki</SelectItem>
                      <SelectItem value="Female">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="age"
                    className="text-sm font-medium text-slate-700"
                  >
                    Usia (tahun) *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    min="10"
                    max="80"
                    className="h-11"
                    value={formData.age || ""}
                    onChange={(e) =>
                      updateFormData("age", parseInt(e.target.value) || "")
                    }
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="height"
                    className="text-sm font-medium text-slate-700"
                  >
                    Tinggi Badan (cm) *
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="172"
                    min="140"
                    max="200"
                    className="h-11"
                    value={formData.height || ""}
                    onChange={(e) =>
                      updateFormData("height", parseInt(e.target.value) || "")
                    }
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="weight"
                    className="text-sm font-medium text-slate-700"
                  >
                    Berat Badan (kg) *
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="55"
                    min="30"
                    max="150"
                    step="0.1"
                    className="h-11"
                    value={formData.weight || ""}
                    onChange={(e) =>
                      updateFormData("weight", parseFloat(e.target.value) || "")
                    }
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="is_family_history_with_overweight"
                    checked={
                      formData.is_family_history_with_overweight || false
                    }
                    onCheckedChange={(checked) =>
                      updateFormData(
                        "is_family_history_with_overweight",
                        checked
                      )
                    }
                    className="mt-1"
                  />
                  <div>
                    <Label
                      htmlFor="is_family_history_with_overweight"
                      className="text-sm font-medium text-slate-700 cursor-pointer"
                    >
                      Riwayat keluarga dengan kelebihan berat badan
                    </Label>
                    <p className="text-xs text-slate-500 mt-1">
                      Apakah ada anggota keluarga yang memiliki masalah
                      obesitas?
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eating Habits Section */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Utensils className="w-5 h-5 text-green-600" />
                </div>
                Kebiasaan Makan
              </CardTitle>
              <CardDescription className="text-base">
                Pola konsumsi makanan dan minuman sehari-hari
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* FAVC Checkbox */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="favc"
                  checked={formData.favc || false}
                  onCheckedChange={(checked) => updateFormData("favc", checked)}
                  className="mt-1"
                />
                <div>
                  <Label
                    htmlFor="favc"
                    className="text-sm font-medium text-slate-700 cursor-pointer"
                  >
                    Sering mengonsumsi makanan berkalori tinggi (FAVC)
                  </Label>
                  <p className="text-xs text-slate-500 mt-1">
                    Apakah Anda sering makan makanan cepat saji, gorengan, atau
                    makanan manis?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* FCVC Slider */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-slate-700">
                    Frekuensi konsumsi sayuran (FCVC): {formData.fcvc}
                  </Label>
                  <div className="px-3 py-2">
                    <Slider
                      value={[formData.fcvc || 2]}
                      onValueChange={(value) =>
                        updateFormData("fcvc", value[0])
                      }
                      max={3}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
                      <span>Jarang (1)</span>
                      <span>Sedang (2)</span>
                      <span>Sering (3)</span>
                    </div>
                  </div>
                </div>

                {/* NCP Slider */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-slate-700">
                    Jumlah makanan utama per hari (NCP): {formData.ncp}
                  </Label>
                  <div className="px-3 py-2">
                    <Slider
                      value={[formData.ncp || 3]}
                      onValueChange={(value) => updateFormData("ncp", value[0])}
                      max={3}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
                      <span>1x</span>
                      <span>2x</span>
                      <span>3x</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CAEC Select */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">
                    Konsumsi makanan di antara waktu makan (CAEC) *
                  </Label>
                  <Select
                    value={formData.caec || ""}
                    onValueChange={(value) => updateFormData("caec", value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Pilih frekuensi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">Tidak pernah</SelectItem>
                      <SelectItem value="Sometimes">Kadang-kadang</SelectItem>
                      <SelectItem value="Frequently">Sering</SelectItem>
                      <SelectItem value="Always">Selalu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* CH2O Slider */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    Konsumsi air per hari (CH2O): {formData.ch2o}L
                  </Label>
                  <div className="px-3 py-2">
                    <Slider
                      value={[formData.ch2o || 2]}
                      onValueChange={(value) =>
                        updateFormData("ch2o", value[0])
                      }
                      max={3}
                      min={1}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
                      <span>1L</span>
                      <span>2L</span>
                      <span>3L</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lifestyle & Physical Activity Section */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Activity className="w-5 h-5 text-orange-600" />
                </div>
                Gaya Hidup & Aktivitas Fisik
              </CardTitle>
              <CardDescription className="text-base">
                Kebiasaan hidup, aktivitas fisik, dan penggunaan teknologi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Checkboxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="smoke"
                    checked={formData.smoke || false}
                    onCheckedChange={(checked) =>
                      updateFormData("smoke", checked)
                    }
                    className="mt-1"
                  />
                  <div>
                    <Label
                      htmlFor="smoke"
                      className="text-sm font-medium text-slate-700 cursor-pointer"
                    >
                      Merokok
                    </Label>
                    <p className="text-xs text-slate-500 mt-1">
                      Apakah Anda perokok aktif?
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="scc"
                    checked={formData.scc || false}
                    onCheckedChange={(checked) =>
                      updateFormData("scc", checked)
                    }
                    className="mt-1"
                  />
                  <div>
                    <Label
                      htmlFor="scc"
                      className="text-sm font-medium text-slate-700 cursor-pointer"
                    >
                      Monitor konsumsi kalori (SCC)
                    </Label>
                    <p className="text-xs text-slate-500 mt-1">
                      Apakah Anda memantau asupan kalori harian?
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* FAF Slider */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-purple-500" />
                    Frekuensi aktivitas fisik per minggu (FAF): {formData.faf}
                  </Label>
                  <div className="px-3 py-2">
                    <Slider
                      value={[formData.faf || 1]}
                      onValueChange={(value) => updateFormData("faf", value[0])}
                      max={3}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
                      <span>0x</span>
                      <span>1x</span>
                      <span>2x</span>
                      <span>3x+</span>
                    </div>
                  </div>
                </div>

                {/* TUE Slider */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    Waktu penggunaan teknologi (TUE): {formData.tue}
                  </Label>
                  <div className="px-3 py-2">
                    <Slider
                      value={[formData.tue || 1]}
                      onValueChange={(value) => updateFormData("tue", value[0])}
                      max={2}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
                      <span>Rendah (0)</span>
                      <span>Sedang (1)</span>
                      <span>Tinggi (2)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CALC Select */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">
                    Konsumsi alkohol (CALC) *
                  </Label>
                  <Select
                    value={formData.calc || ""}
                    onValueChange={(value) => updateFormData("calc", value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Pilih frekuensi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">Tidak pernah</SelectItem>
                      <SelectItem value="Sometimes">Kadang-kadang</SelectItem>
                      <SelectItem value="Frequently">Sering</SelectItem>
                      <SelectItem value="Always">Selalu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* MTRANS Select */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">
                    Transportasi utama (MTRANS) *
                  </Label>
                  <Select
                    value={formData.mtrans || ""}
                    onValueChange={(value) => updateFormData("mtrans", value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Pilih transportasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Walking">Jalan kaki</SelectItem>
                      <SelectItem value="Bike">Sepeda</SelectItem>
                      <SelectItem value="Motorbike">Motor</SelectItem>
                      <SelectItem value="Public Transportation">
                        Transportasi umum
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

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

        {/* Error Message */}
        {error && (
          <Card className="mt-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Error: {error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Result Section */}
        {prediction && prediction.success && (
          <Card className="mt-12 shadow-lg border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Scale className="w-5 h-5 text-emerald-600" />
                </div>
                Hasil Prediksi
              </CardTitle>
              <CardDescription className="text-base">
                Berdasarkan data yang Anda masukkan, berikut adalah hasil
                prediksi AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Main Prediction */}
              <div className="mb-8">
                <div
                  className={`text-center p-8 bg-gradient-to-r rounded-xl border ${getClassColor(prediction.data.class_name)}`}
                >
                  <div className="text-4xl font-bold mb-3">
                    {
                      classDisplayNames[
                        prediction.data
                          .class_name as keyof typeof classDisplayNames
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
                        {(
                          prediction.data.class_probabilities[index] * 100
                        ).toFixed(1)}
                        %
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
