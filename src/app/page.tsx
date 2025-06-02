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
} from "lucide-react";

export default function MLPredictionPage() {
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

        <form className="space-y-8">
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
                    Jenis Kelamin
                  </Label>
                  <Select name="gender">
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
                    Usia (tahun)
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="25"
                    min="10"
                    max="80"
                    className="h-11"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="height"
                    className="text-sm font-medium text-slate-700"
                  >
                    Tinggi Badan (cm)
                  </Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    placeholder="172"
                    min="140"
                    max="200"
                    className="h-11"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="weight"
                    className="text-sm font-medium text-slate-700"
                  >
                    Berat Badan (kg)
                  </Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="55"
                    min="30"
                    max="150"
                    step="0.1"
                    className="h-11"
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="is_family_history_with_overweight"
                    name="is_family_history_with_overweight"
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
                <Checkbox id="favc" name="favc" className="mt-1" />
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
                    Frekuensi konsumsi sayuran (FCVC)
                  </Label>
                  <div className="px-3 py-2">
                    <Slider
                      name="fcvc"
                      defaultValue={[2]}
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
                    Jumlah makanan utama per hari (NCP)
                  </Label>
                  <div className="px-3 py-2">
                    <Slider
                      name="ncp"
                      defaultValue={[3]}
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
                    Konsumsi makanan di antara waktu makan (CAEC)
                  </Label>
                  <Select name="caec">
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
                    Konsumsi air per hari (CH2O) - Liter
                  </Label>
                  <div className="px-3 py-2">
                    <Slider
                      name="ch2o"
                      defaultValue={[2]}
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
                  <Checkbox id="smoke" name="smoke" className="mt-1" />
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
                  <Checkbox id="scc" name="scc" className="mt-1" />
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
                    Frekuensi aktivitas fisik per minggu (FAF)
                  </Label>
                  <div className="px-3 py-2">
                    <Slider
                      name="faf"
                      defaultValue={[1]}
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
                    Waktu penggunaan teknologi per hari (TUE) - Level
                  </Label>
                  <div className="px-3 py-2">
                    <Slider
                      name="tue"
                      defaultValue={[1]}
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
                    Konsumsi alkohol (CALC)
                  </Label>
                  <Select name="calc">
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
                    Transportasi utama (MTRANS)
                  </Label>
                  <Select name="mtrans">
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Pilih transportasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Walking">Jalan kaki</SelectItem>
                      <SelectItem value="Bike">Sepeda</SelectItem>
                      <SelectItem value="Motorbike">Motor</SelectItem>
                      <SelectItem value="Automobile">Mobil</SelectItem>
                      <SelectItem value="Public_Transportation">
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
              className="px-8 py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            >
              <Brain className="w-6 h-6 mr-3" />
              Prediksi Tingkat Obesitas
            </Button>
          </div>
        </form>

        {/* Result Section (Static Preview) */}
        <Card className="mt-12 shadow-lg border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Scale className="w-5 h-5 text-emerald-600" />
              </div>
              Hasil Prediksi
            </CardTitle>
            <CardDescription className="text-base">
              Berdasarkan data yang Anda masukkan, berikut adalah prediksi AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  Normal
                </div>
                <div className="text-sm text-emerald-700 font-medium">
                  Berat badan ideal
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  Confidence: 87.5%
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  BMI: 18.6
                </div>
                <div className="text-sm text-blue-700 font-medium">
                  Kategori sehat
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  Range: 18.5-24.9
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="text-lg font-bold text-purple-600 mb-2">
                  Risiko Rendah
                </div>
                <div className="text-sm text-purple-700 font-medium">
                  Kesehatan optimal
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  Pertahankan gaya hidup
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                Rekomendasi Kesehatan:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    Pertahankan pola makan seimbang dengan konsumsi sayuran yang
                    cukup
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    Lanjutkan aktivitas fisik rutin minimal 3x seminggu
                  </li>
                </ul>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Batasi konsumsi makanan berkalori tinggi dan junk food
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Pastikan konsumsi air putih minimal 2-3 liter per hari
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
