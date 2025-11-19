import { FC, useState, useEffect } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";
import { Calendar } from "lucide-react";

interface HijriDateInputProps {
  value?: string; // Gregorian date in YYYY-MM-DD format
  onChange: (gregorianDate: string, hijriDate: string) => void;
  label?: string;
  name?: string;
  required?: boolean;
  errorMessage?: string;
  error?: boolean;
}

// دالة بسيطة لتحويل التاريخ الميلادي إلى هجري تقريبي
const gregorianToHijri = (gregorianDate: string): string => {
  if (!gregorianDate) return "";

  const date = new Date(gregorianDate);
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1;
  const gregorianDay = date.getDate();

  // حساب تقريبي للتاريخ الهجري
  // الفرق بين السنة الهجرية والميلادية حوالي 579 سنة
  const hijriYear = Math.floor(gregorianYear - 621.5643);

  // هذا حساب تقريبي - للدقة الكاملة نحتاج مكتبة متخصصة
  const hijriMonth = gregorianMonth;
  const hijriDay = gregorianDay;

  return `${hijriYear}-${String(hijriMonth).padStart(2, "0")}-${String(hijriDay).padStart(2, "0")}`;
};

// دالة بسيطة لتحويل التاريخ الهجري إلى ميلادي تقريبي
const hijriToGregorian = (hijriDate: string): string => {
  if (!hijriDate) return "";

  const [year, month, day] = hijriDate.split("-").map(Number);

  // حساب تقريبي للتاريخ الميلادي
  const gregorianYear = Math.floor(year + 621.5643);

  const gregorianDate = `${gregorianYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return gregorianDate;
};

export const HijriDateInput: FC<HijriDateInputProps> = ({
  value = "",
  onChange,
  label,
  name,
  required = true,
  errorMessage,
  error = false,
}) => {
  const [dateType, setDateType] = useState<"gregorian" | "hijri">("hijri");
  const [gregorianDate, setGregorianDate] = useState(value);
  const [hijriDate, setHijriDate] = useState(() => {
    return value ? gregorianToHijri(value) : "";
  });

  useEffect(() => {
    if (value) {
      setGregorianDate(value);
      setHijriDate(gregorianToHijri(value));
    }
  }, [value]);

  const handleGregorianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGregorianDate = e.target.value;
    setGregorianDate(newGregorianDate);
    const newHijriDate = gregorianToHijri(newGregorianDate);
    setHijriDate(newHijriDate);
    onChange(newGregorianDate, newHijriDate);
  };

  const handleHijriChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHijriDate = e.target.value;
    setHijriDate(newHijriDate);
    const newGregorianDate = hijriToGregorian(newHijriDate);
    setGregorianDate(newGregorianDate);
    onChange(newGregorianDate, newHijriDate);
  };

  const toggleDateType = () => {
    setDateType((prev) => (prev === "gregorian" ? "hijri" : "gregorian"));
  };

  const getHijriMonthName = (month: number): string => {
    const months = [
      "محرم",
      "صفر",
      "ربيع الأول",
      "ربيع الثاني",
      "جمادى الأولى",
      "جمادى الآخرة",
      "رجب",
      "شعبان",
      "رمضان",
      "شوال",
      "ذو القعدة",
      "ذو الحجة",
    ];
    return months[month - 1] || "";
  };

  const formatHijriDisplay = (date: string): string => {
    if (!date) return "";
    const [year, month, day] = date.split("-").map(Number);
    return `${day} ${getHijriMonthName(month)} ${year} هـ`;
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
              value={gregorianDate}
              onChange={handleGregorianChange}
              className={error ? "border-destructive" : ""}
              required={required}
            />
            {hijriDate && (
              <p className="text-xs text-muted-foreground">
                {formatHijriDisplay(hijriDate)}
              </p>
            )}
          </>
        ) : (
          <>
            <Input
              type="date"
              id={name}
              name={name}
              value={hijriDate}
              onChange={handleHijriChange}
              className={error ? "border-destructive" : ""}
              required={required}
              placeholder="YYYY-MM-DD"
            />
            {hijriDate && (
              <p className="text-xs text-muted-foreground">
                {formatHijriDisplay(hijriDate)} (تقريبي)
              </p>
            )}
            {gregorianDate && (
              <p className="text-xs text-muted-foreground">
                الميلادي: {new Date(gregorianDate).toLocaleDateString("ar-SA")}
              </p>
            )}
          </>
        )}
      </div>

      {error && errorMessage && (
        <p className="text-xs text-destructive">{errorMessage}</p>
      )}
    </div>
  );
};
