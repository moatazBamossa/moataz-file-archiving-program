import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const objectives = [
  { id: "1", name: "استرداد المسروقات" },
  { id: "2", name: "تسوية النزاع" },
  { id: "3", name: "حماية الضحية" },
];

const typeCases = [
  { id: "personla", name: "شخصي" },
  { id: "civilian", name: "مدني" },
  { id: "criminal", name: "جنائي" },
  { id: "administrative", name: "ادري" },
  { id: "performance", name: "اوامر الاداء" },
  { id: "wide", name: "الامر على عريضه" },
];

const judges = [
  { id: "1", name: "القاضي أحمد علي" },
  { id: "2", name: "القاضي محمد حسن" },
  { id: "3", name: "القاضي سارة محمود" },
];

const caseSchema = z.object({
  case_number: z.string().min(1, "رقم القضية مطلوب"),
  supply_date: z.string().min(1, "تاريخ الورود مطلوب"),
  case_type: z.string().min(1, "نوع القضية مطلوب"),
  case_type_title: z.string().optional(),
  prosecutor: z.string().optional(),
  defendant: z.string().optional(),
  topic_id: z.string().optional(),
  objective_id: z.string().optional(),
  judge_id: z.string().optional(),
  history_of_ruling: z.string().optional(),
  judgment_date: z.string().optional(),
  comments: z.string().optional(),
});

type CaseFormData = z.infer<typeof caseSchema>;

export default function AddCase() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema),
  });

  const onSubmit = async (data: CaseFormData) => {
    // Mock API call to save the case
    console.log("Saving case:", data);
    // After saving, navigate back to cases list
    navigate("/cases");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">إضافة قضية جديدة</h1>
        <p className="text-muted-foreground">قم بإنشاء ملف جديد في الأرشيف</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>بيانات القضية</CardTitle>
          <CardDescription>أدخل تفاصيل القضية الجديدة</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="case_number">
                  رقم القضية <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="case_number"
                  {...register("case_number")}
                  placeholder="أدخل رقم القضية"
                />
                {errors.case_number && (
                  <p className="text-sm text-destructive">
                    {errors.case_number.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="supply_date">
                  تاريخ الورود <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="supply_date"
                  type="date"
                  {...register("supply_date")}
                />
                {errors.supply_date && (
                  <p className="text-sm text-destructive">
                    {errors.supply_date.message}
                  </p>
                )}
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="case_type">
                  نوع القضية <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="case_type"
                  {...register('case_type')}
                  placeholder="حدد نوع القضية"
                />
                {errors.case_type && (
                  <p className="text-sm text-destructive">
                    {errors.case_type.message}
                  </p>
                )}
              </div> */}

              <div className="space-y-2">
                <Label htmlFor="case_type">
                  نوع القضية
                  <span className="text-destructive">*</span>
                </Label>{" "}
                <Select
                  value={watch("objective_id") || undefined}
                  onValueChange={(value) =>
                    setValue("objective_id", value || undefined)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع القضية" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeCases?.map((objective) => (
                      <SelectItem key={objective.id} value={objective.id}>
                        {objective.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="case_type_title">
                  وصف نوع القضية
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="case_type_title"
                  {...register("case_type_title")}
                  placeholder="أدخل وصفاً مختصراً"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prosecutor">
                  المدعي
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="prosecutor"
                  {...register("prosecutor")}
                  placeholder="أدخل اسم المدعي"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defendant">
                  المدعى عليه
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="defendant"
                  {...register("defendant")}
                  placeholder="أدخل اسم المدعى عليه"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defendant"> طرف آخر</Label>
                <Input
                  id="defendant"
                  {...register("defendant")}
                  placeholder="أدخل اسم الطرف الاخر"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="objective_id">الهدف</Label>
                <Select
                  value={watch("objective_id") || undefined}
                  onValueChange={(value) =>
                    setValue("objective_id", value || undefined)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الهدف" />
                  </SelectTrigger>
                  <SelectContent>
                    {objectives?.map((objective) => (
                      <SelectItem key={objective.id} value={objective.id}>
                        {objective.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="judge_id">القاضي</Label>
                <Select
                  value={watch("judge_id") || undefined}
                  onValueChange={(value) =>
                    setValue("judge_id", value || undefined)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القاضي" />
                  </SelectTrigger>
                  <SelectContent>
                    {judges?.map((judge) => (
                      <SelectItem key={judge.id} value={judge.id}>
                        {judge.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="judgment_date">تاريخ الحكم</Label>
                <Input
                  id="judgment_date"
                  type="date"
                  {...register("judgment_date")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="history_of_ruling">سجل الأحكام السابقة</Label>
              <Textarea
                id="history_of_ruling"
                {...register("history_of_ruling")}
                placeholder="أدخل ملخصاً لسجل الأحكام"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">ملاحظات</Label>
              <Textarea
                id="comments"
                {...register("comments")}
                placeholder="أضف ملاحظات إضافية إن وجدت"
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "جاري الحفظ..." : "حفظ القضية"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/cases")}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
