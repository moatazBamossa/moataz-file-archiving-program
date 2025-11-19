import { InputField } from "./InputField";
import { SelectItem } from "./select";
import { SelectField } from "./SelectField";

const HIJRI_MONTHS = [
  { value: 1, name: "محرم" },
  { value: 2, name: "صفر" },
  { value: 3, name: "ربيع الأول" },
  { value: 4, name: "ربيع الآخر" },
  { value: 5, name: "جمادى الأولى" },
  { value: 6, name: "جمادى الآخرة" },
  { value: 7, name: "رجب" },
  { value: 8, name: "شعبان" },
  { value: 9, name: "رمضان" },
  { value: 10, name: "شوال" },
  { value: 11, name: "ذو القعدة" },
  { value: 12, name: "ذو الحجة" },
];

type NewHijriDateFieldProps = {
  name: string;
};
const NewHijriDateField = (props: NewHijriDateFieldProps) => {
  const { name } = props;
  return (
    <div className="flex gap-2 items-center">
      <InputField placeholder="اليوم" name={`${name}_day`} />
      <SelectField
        name={`${name}_month`}
        placeholder="اختر الشهر"
        errorMessage="الشهر مطلوب"
      >
        {HIJRI_MONTHS.map((month) => (
          <SelectItem key={month.value} value={String(month.value)}>
            {month.name}
          </SelectItem>
        ))}
      </SelectField>
      <InputField type="number" placeholder="السنة هـ" name={`${name}_year`} />
    </div>
  );
};

export default NewHijriDateField;
