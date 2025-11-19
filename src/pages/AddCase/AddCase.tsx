import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StepOne } from "./StepOne";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Form } from "react-final-form";
import z from "zod";
import { StepTwo } from "./StepTwo";
import { useState } from "react";
import arrayMutators from "final-form-arrays";
import StepThree from "./StepThree";

const caseSchema = z.object({
  case_number: z.string().min(1, "رقم القضية مطلوب"),
  supply_date: z.string().min(1, "تاريخ الورود مطلوب"),
  case_type: z
    .string({ required_error: "نوع القضية مطلوب" })
    .min(1, "نوع القضية مطلوب"),
  case_type_title: z.string().min(1, "وصف نوع القضية مطلوب"),
  prosecutor: z.string().min(1, "المدعي مطلوب"),
  defendant: z.string().min(1, "المدعى عليه مطلوب"),
  other_party: z.string().optional(),
  topic_id: z.string().optional(),
  objectives: z
    .array(
      z.object({
        text: z.string().optional(),
      })
    )
    .optional(),
  objective_id: z.string().optional(),
  judge_id: z.string({ required_error: "القاضي مطلوب" }).min(1, "القاضي مطلوب"),
  history_of_ruling: z.string().optional(),
  judgment_date: z.string().optional(),
  comments: z.string().optional(),
});

type CaseFormData = z.infer<typeof caseSchema>;

const initialValues = {
  case_number: "",
  case_type: "",
  case_type_title: "",
  prosecutor: "",
  defendant: "",
  other_party: "",
  topic_id: "",
  objectives: [{ text: "" }],
  objective_id: "",
  judge_id: "",
  history_of_ruling: "",
  judgment_date: "",
  comments: "",
};
const CasesComponents = {
  0: StepOne,
  1: StepTwo,
  2: StepThree,
};

const AddCase = () => {
  const [activeStep, setActiveStep] = useState<0 | 1 | 2>(0);
  const navigate = useNavigate();

  const handleOnSubmit = (data: CaseFormData) => {
    console.log("submit", data);
  };

  const CasesComponentsSteps = CasesComponents[activeStep];

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
          <Form
            onSubmit={handleOnSubmit}
            mutators={{
              ...(arrayMutators as any),
            }}
            initialValues={initialValues}
            keepDirtyOnReinitialize
          >
            {({ handleSubmit, dirty, valid }) => {
              return (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-4">
                    <CasesComponentsSteps />
                    <div className="flex gap-4">
                      <Button
                        type={activeStep === 2 ? "submit" : "button"}
                        onClick={() => {
                          if (activeStep < 2)
                            setActiveStep((activeStep + 1) as 0 | 1 | 2);
                        }}
                        disabled={!valid || !dirty}
                      >
                        التالي
                      </Button>
                      {activeStep > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setActiveStep((activeStep - 1) as 0 | 1 | 2);
                          }}
                        >
                          السابق
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => navigate("/cases")}
                      >
                        إلغاء
                      </Button>
                    </div>
                  </div>
                </form>
              );
            }}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCase;
