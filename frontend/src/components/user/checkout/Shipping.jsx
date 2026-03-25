import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from "lucide-react";

const ShippingSection = ({ formData, onChange }) => {
  return (
    <Card className="bg-gray-700/40 border-none text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
          Хүргэлийн хаяг
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4 ">
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2">
              Хот / Аймаг <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="city"
              placeholder="Улаанбаатар"
              value={formData.city}
              onChange={onChange}
              className="border-neutral-700 text-xs md:text-base"
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2">
              Дүүрэг / Сум <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="district"
              placeholder="Сүхбаатар"
              value={formData.district}
              onChange={onChange}
              className="border-neutral-700 text-xs md:text-base"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs md:text-sm font-medium mb-2">
            Хаяг <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Байр , тоот, давхар"
            className="border-neutral-700 text-xs md:text-base"
          />
        </div>
        <div>
          <label className="block text-xs md:text-sm font-medium mb-2">
            Утасны дугаар <span className="text-red-500">*</span>
          </label>
          <Input
            type="tel"
            name="phone"
            placeholder="99999999"
            value={formData.phone}
            onChange={onChange}
            className="border-neutral-700 text-xs md:text-base"
          />
        </div>
        <div>
          <label className="block text-xs md:text-sm font-medium mb-2">
            Нэмэлт тэмдэглэл
          </label>
          <Textarea
            name="note"
            placeholder="Хүргэлттэй холбоотой нэмэлт мэдээлэл"
            value={formData.note}
            onChange={onChange}
            rows={4}
            className="pt-3 border-neutral-700 text-xs md:text-base"
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default ShippingSection;
