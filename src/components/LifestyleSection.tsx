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
import { Activity, Scale, Clock } from "lucide-react";
import { PredictionRequest } from "@/types/prediction";

interface LifestyleSectionProps {
  formData: Partial<PredictionRequest>;
  updateFormData: (field: keyof PredictionRequest, value: any) => void;
}

export function LifestyleSection({
  formData,
  updateFormData,
}: LifestyleSectionProps) {
  return (
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
              onCheckedChange={(checked) => updateFormData("smoke", checked)}
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
              onCheckedChange={(checked) => updateFormData("scc", checked)}
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
  );
}
