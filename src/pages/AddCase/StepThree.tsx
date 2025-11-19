import { FieldArrayCompnent } from "@/components/ui/fieldArrayCompnent";
import NewHijriDateField from "@/components/ui/NewHijriDateField";
import { FC } from "react";

const StepThree: FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">الاحكام</h3>
        <p className="text-sm text-muted-foreground">أضف تفاصيل الحكم</p>
      </div>
      <div className="flex flex-col gap-2">
        <NewHijriDateField name="rulings_date" />
        <FieldArrayCompnent
          name="rulings"
          label="الحكم"
          placeholder="أدخل نص الحكم"
          required={false}
          errorMessage="الحكم مطلوب"
        />
      </div>
    </div>
  );
};

export default StepThree;
