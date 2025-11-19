import { FC } from "react";
import { FieldArrayCompnent } from "@/components/ui/fieldArrayCompnent";

export const StepTwo: FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">الطلبات</h3>
        <p className="text-sm text-muted-foreground">أضف طلبات القضية</p>
      </div>

      <FieldArrayCompnent
        name="objectives"
        label="الطلبات"
        placeholder="أدخل نص الطلب"
        required={false}
        errorMessage="الطلب مطلوب"
      />
    </div>
  );
};
