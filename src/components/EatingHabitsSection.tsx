import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Utensils, Droplets } from "lucide-react";
import { PredictionRequest } from "@/types/prediction";

interface EatingHabitsSectionProps {
  formData: Partial<PredictionRequest>;
  updateFormData: (field: keyof PredictionRequest, value: any) => void;
}

export function EatingHabitsSection({
  formData,
  updateFormData,
}: EatingHabitsSectionProps) {
  return (
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
                onValueChange={(value) => updateFormData("fcvc", value[0])}
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
                onValueChange={(value) => updateFormData("ch2o", value[0])}
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
  );
}
