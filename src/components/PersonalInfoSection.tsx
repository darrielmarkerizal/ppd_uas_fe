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
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "lucide-react";
import { PredictionRequest } from "@/types/prediction";

interface PersonalInfoSectionProps {
  formData: Partial<PredictionRequest>;
  updateFormData: (field: keyof PredictionRequest, value: any) => void;
}

export function PersonalInfoSection({
  formData,
  updateFormData,
}: PersonalInfoSectionProps) {
  return (
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
            <Label htmlFor="age" className="text-sm font-medium text-slate-700">
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
              checked={formData.is_family_history_with_overweight || false}
              onCheckedChange={(checked) =>
                updateFormData("is_family_history_with_overweight", checked)
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
                Apakah ada anggota keluarga yang memiliki masalah obesitas?
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
