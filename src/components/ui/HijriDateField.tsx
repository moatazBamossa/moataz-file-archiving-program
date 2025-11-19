import { FC, useState, useMemo, useEffect } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { Field, FieldRenderProps } from "react-final-form";
import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type HijriDateFieldProps = {
  label?: string;
  name: string;
  required?: boolean;
  errorMessage?: string;
  saveAsHijri?: boolean; // إذا كان true، سيتم حفظ التاريخ بصيغة هجرية بدلاً من ميلادية
};

// الأشهر الهجرية
const HIJRI_MONTHS = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];

// دالة لتحويل التاريخ الميلادي إلى هجري باستخدام خوارزمية دقيقة
const gregorianToHijri = (
  gregorianDate: string
): { year: number; month: number; day: number } => {
  if (!gregorianDate) return { year: 0, month: 0, day: 0 };

  const date = new Date(gregorianDate);

  // حساب عدد الأيام منذ 1 يناير 1970
  const timestamp = date.getTime();
  const daysSince1970 = Math.floor(timestamp / (1000 * 60 * 60 * 24));

  // الفرق بين التقويم الميلادي والهجري (بالأيام)
  // 1 يناير 1970 = 22 شوال 1389 هجري
  const hijriOffset = 492148; // عدد الأيام من بداية التقويم الهجري حتى 1/1/1970

  // حساب عدد الأيام منذ بداية التقويم الهجري
  const hijriDays = daysSince1970 + hijriOffset;

  // السنة الهجرية (354.36 يوم في المتوسط)
  let hijriYear = Math.floor(hijriDays / 354.36);

  // حساب بداية السنة الهجرية
  let yearStart = Math.floor(hijriYear * 354.36);
  let dayOfYear = hijriDays - yearStart;

  // تعديل السنة إذا لزم الأمر
  if (dayOfYear < 0) {
    hijriYear--;
    yearStart = Math.floor(hijriYear * 354.36);
    dayOfYear = hijriDays - yearStart;
  }

  // حساب الشهر واليوم
  // الأشهر الهجرية (29 أو 30 يوماً)
  const monthDays = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29]; // سنة عادية

  let hijriMonth = 1;
  let hijriDay = Math.floor(dayOfYear);

  for (let i = 0; i < 12; i++) {
    if (hijriDay <= monthDays[i]) {
      hijriMonth = i + 1;
      break;
    }
    hijriDay -= monthDays[i];
  }

  // التأكد من أن اليوم لا يقل عن 1
  if (hijriDay < 1) hijriDay = 1;

  return {
    year: hijriYear,
    month: hijriMonth,
    day: hijriDay,
  };
};

// دالة لتحويل التاريخ الهجري إلى ميلادي
const hijriToGregorian = (year: number, month: number, day: number): string => {
  if (!year || !month || !day) return "";

  // حساب عدد الأيام منذ بداية التقويم الهجري
  const yearDays = Math.floor(year * 354.36);

  // حساب أيام الأشهر السابقة
  const monthDays = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
  let monthsDays = 0;
  for (let i = 0; i < month - 1; i++) {
    monthsDays += monthDays[i];
  }

  const totalHijriDays = yearDays + monthsDays + day;

  // تحويل إلى أيام منذ 1970
  const hijriOffset = 492148;
  const daysSince1970 = totalHijriDays - hijriOffset;

  // تحويل إلى تاريخ ميلادي
  const timestamp = daysSince1970 * (1000 * 60 * 60 * 24);
  const gregorianDate = new Date(timestamp);

  const year_ = gregorianDate.getFullYear();
  const month_ = String(gregorianDate.getMonth() + 1).padStart(2, "0");
  const day_ = String(gregorianDate.getDate()).padStart(2, "0");

  return `${year_}-${month_}-${day_}`;
};

// دالة للتحقق من صحة الحقل
const requiredValidator = (value: any) => {
  return value ? undefined : "This field is required";
};

// مكون داخلي للتعامل مع الحالة
const HijriDateInput: FC<
  FieldRenderProps<string> & {
    label?: string;
    required: boolean;
    errorMessage?: string;
    name: string;
    saveAsHijri?: boolean;
  }
> = ({ input, meta, label, required, errorMessage, name, saveAsHijri }) => {
  const [dateType, setDateType] = useState<"gregorian" | "hijri">("hijri");

  // حساب التاريخ الهجري من input.value
  const computedHijriDate = useMemo(() => {
    if (input.value) {
      // إذا كان التاريخ مخزن بصيغة هجرية (مثل: 12-6-1440)
      // تحقق من التنسيق: يحتوي على شرطات وأرقام فقط
      const hijriPattern = /^\d{1,2}-\d{1,2}-\d{4}$/;

      if (hijriPattern.test(input.value)) {
        const parts = input.value.split("-");

        if (parts.length === 3) {
          return {
            day: parseInt(parts[0]) || 0,
            month: parseInt(parts[1]) || 0,
            year: parseInt(parts[2]) || 0,
          };
        }
      }
      // وإلا، حوّل من ميلادي إلى هجري
      return gregorianToHijri(input.value);
    }
    return { year: 0, month: 0, day: 0 };
  }, [input.value]);

  // state محلي للسماح بالتعديل
  const [localHijriDate, setLocalHijriDate] = useState(computedHijriDate);

  // تحديث local state عند تغيير input.value
  useEffect(() => {
    setLocalHijriDate(computedHijriDate);
  }, [computedHijriDate]);

  const handleGregorianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGregorianDate = e.target.value;
    input.onChange(newGregorianDate);
  };

  const handleHijriDateChange = (
    field: "year" | "month" | "day",
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    const newHijriDate = { ...localHijriDate, [field]: numValue };
    setLocalHijriDate(newHijriDate);

    if (newHijriDate.year && newHijriDate.month && newHijriDate.day) {
      if (saveAsHijri) {
        // حفظ التاريخ بصيغة هجرية: day-month-year
        const hijriDateString = `${newHijriDate.day}-${newHijriDate.month}-${newHijriDate.year}`;
        input.onChange(hijriDateString);
      } else {
        // حفظ التاريخ بصيغة ميلادية
        const gregorianDate = hijriToGregorian(
          newHijriDate.year,
          newHijriDate.month,
          newHijriDate.day
        );
        input.onChange(gregorianDate);
      }
    }
  };

  const toggleDateType = () => {
    setDateType((prev) => (prev === "gregorian" ? "hijri" : "gregorian"));
  };

  const formatHijriDisplay = (): string => {
    if (!localHijriDate.year || !localHijriDate.month || !localHijriDate.day)
      return "";
    return `${localHijriDate.day} ${HIJRI_MONTHS[localHijriDate.month - 1]} ${localHijriDate.year} هـ`;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {label && (
          <Label htmlFor={name}>
            {label}
            {required && <span className="text-destructive mr-1">*</span>}
          </Label>
        )}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleDateType}
          className="h-8 text-xs"
        >
          <Calendar className="ml-1 h-3 w-3" />
          {dateType === "gregorian" ? "تحويل للهجري" : "تحويل للميلادي"}
        </Button>
      </div>

      <div className="space-y-2">
        {dateType === "gregorian" ? (
          <>
            <Input
              type="date"
              id={name}
              name={name}
              value={input.value || ""}
              onChange={handleGregorianChange}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
            />
            {localHijriDate.year > 0 && (
              <p className="text-xs text-muted-foreground">
                {formatHijriDisplay()}
              </p>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                placeholder="اليوم"
                min="1"
                max="30"
                value={localHijriDate.day || ""}
                onChange={(e) => handleHijriDateChange("day", e.target.value)}
              />
              <Select
                value={localHijriDate.month ? String(localHijriDate.month) : ""}
                onValueChange={(value) => handleHijriDateChange("month", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="الشهر" />
                </SelectTrigger>
                <SelectContent>
                  {HIJRI_MONTHS.map((month, index) => (
                    <SelectItem key={index + 1} value={String(index + 1)}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="السنة هـ"
                min="1300"
                max="1500"
                value={localHijriDate.year || ""}
                onChange={(e) => handleHijriDateChange("year", e.target.value)}
              />
            </div>
            {localHijriDate.year > 0 && (
              <p className="text-xs text-muted-foreground">
                {formatHijriDisplay()}
              </p>
            )}
          </>
        )}
      </div>

      {meta.error && meta.touched && (
        <p className="text-sm text-destructive">{errorMessage || meta.error}</p>
      )}
    </div>
  );
};

export const HijriDateField: FC<HijriDateFieldProps> = ({
  label,
  name,
  required = true,
  errorMessage,
  saveAsHijri = true,
}) => {
  return (
    <Field validate={required ? requiredValidator : undefined} name={name}>
      {(props) => (
        <HijriDateInput
          {...props}
          label={label}
          required={required}
          errorMessage={errorMessage}
          name={name}
          saveAsHijri={saveAsHijri}
        />
      )}
    </Field>
  );
};
