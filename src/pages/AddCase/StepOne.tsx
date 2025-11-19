import { SelectItem } from "@/components/ui/select";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { MultiNameField } from "@/components/ui/MultiNameField";
import { FC } from "react";

import { CASE_TYPES, JUDGES } from "@/constants";
// import { useToast } from "@/components/ui/use-toast";
// import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import NewHijriDateField from "@/components/ui/NewHijriDateField";

export const StepOne: FC = () => {
  const loader = false; // Placeholder for loading state
  // const { toast } = useToast();
  // const [loading, setLoading] = useState(true);
  // const [judges, setJudges] = useState<Judge[]>([]);

  // const fetchJudges = async () => {
  //   try {
  //     setLoading(true);
  //     const { data, error } = await supabase
  //       .from("judges")
  //       .select("id, name")
  //       .order("name", { ascending: true });

  //     if (error) throw error;

  //     setJudges(data || []);
  //   } catch (error) {
  //     console.error("Error fetching judges:", error);
  //     toast({
  //       title: "خطأ",
  //       description: "فشل في تحميل بيانات القضاة",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchJudges();
  // }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {loader ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <InputField
            name="case_number"
            label="رقم القضية"
            placeholder="أدخل رقم القضية"
            errorMessage="رقم القضية مطلوب"
          />

          <div className="flex items-end">
            <NewHijriDateField name="supply_date" />
          </div>

          <SelectField
            name="case_type"
            label="نوع القضية"
            placeholder="اختر نوع القضية"
            errorMessage="نوع القضية مطلوب"
          >
            {CASE_TYPES?.map((caseType) => (
              <SelectItem key={caseType.id} value={caseType.value}>
                {caseType.name}
              </SelectItem>
            ))}
          </SelectField>

          <InputField
            name="case_type_title"
            label="وصف نوع القضية"
            placeholder="أدخل وصفاً مختصراً"
            errorMessage="وصف نوع القضية مطلوب"
          />

          <MultiNameField
            name="prosecutor"
            label="المدعي"
            placeholder="أدخل اسم المدعي"
            errorMessage="المدعي مطلوب"
          />

          <MultiNameField
            name="defendant"
            label="المدعى عليه"
            placeholder="أدخل اسم المدعى عليه"
            errorMessage="المدعى عليه مطلوب"
          />

          <MultiNameField
            name="other_party"
            label="طرف آخر"
            placeholder="أدخل اسم الطرف الاخر"
            required={false}
          />

          <SelectField
            name="judge_id"
            label="القاضي"
            placeholder="اختر القاضي"
            errorMessage="القاضي مطلوب"
          >
            {JUDGES?.map((judge) => (
              <SelectItem key={judge.id} value={judge.id}>
                {judge.name}
              </SelectItem>
            ))}
          </SelectField>
        </>
      )}
    </div>
  );
};
