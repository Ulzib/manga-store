import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard } from "lucide-react";

const PaymentSection = ({ formData, handleInputChange }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Төлбөрийн арга</h2>
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
            className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <RadioGroupItem id="cash" value="cash" />
            <span className="ml-3 font-medium">Дансаар шилжүүлэх</span>
          </Label>

          <Label
            htmlFor="card"
            className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <RadioGroupItem id="card" value="card" />
            <span className="ml-3 font-medium">Картаар төлөх</span>
          </Label>

          <Label
            htmlFor="qpay"
            className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <RadioGroupItem id="qpay" value="qpay" />
            <span className="ml-3 font-medium">QPay</span>
          </Label>
        </RadioGroup>
      </div>
    </Card>
  );
};
export default PaymentSection;
