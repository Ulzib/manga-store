import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard } from "lucide-react";

const PaymentSection = ({ formData, handleInputChange }) => {
  const radioClass =
    "border-white text-white [&_svg]:fill-white [&_svg]:stroke-white";
  return (
    <Card className="p-6 bg-gray-700/40 border-none text-white">
      <div className="flex items-center gap-2 mb-0 md:mb-4">
        <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
        <h2 className="text-lg md:text-xl font-semibold">Төлбөрийн арга</h2>
      </div>
      <div className="space-y-3">
        <RadioGroup
          value={formData.paymentMethod}
          onValueChange={(value) =>
            handleInputChange({
              target: { name: "paymentMethod", value },
            })
          }
        >
          <Label
            htmlFor="cash"
            className="flex items-center p-3 md:p-4 border rounded-lg cursor-pointer hover:bg-neutral-700/50 border-neutral-700 "
          >
            <RadioGroupItem id="cash" value="cash" className={radioClass} />
            <span className="ml-3 font-medium text-xs md:text-sm">
              Дансаар шилжүүлэх
            </span>
          </Label>

          <Label
            htmlFor="card"
            className="flex items-center p-3 md:p-4 border rounded-lg cursor-pointer hover:bg-neutral-700/50 border-neutral-700"
          >
            <RadioGroupItem id="card" value="card" className={radioClass} />
            <span className="ml-3 font-medium text-xs md:text-sm">
              Картаар төлөх
            </span>
          </Label>

          <Label
            htmlFor="qpay"
            className="flex items-center p-3 md:p-4 border rounded-lg cursor-pointer hover:bg-neutral-700/50 border-neutral-700"
          >
            <RadioGroupItem id="qpay" value="qpay" className={radioClass} />
            <span className="ml-3 font-medium text-xs md:text-sm">QPay</span>
          </Label>
        </RadioGroup>
      </div>
    </Card>
  );
};
export default PaymentSection;
