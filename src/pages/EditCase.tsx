import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'

const caseSchema = z.object({
  case_number: z.string().min(1, 'رقم القضية مطلوب'),
  supply_date: z.string().min(1, 'تاريخ الورود مطلوب'),
  case_type: z.string().min(1, 'نوع القضية مطلوب'),
  case_type_title: z.string().optional(),
  prosecutor: z.string().optional(),
  defendant: z.string().optional(),
  topic_id: z.string().optional(),
  objective_id: z.string().optional(),
  judge_id: z.string().optional(),
  history_of_ruling: z.string().optional(),
  judgment_date: z.string().optional(),
  comments: z.string().optional(),
})

const caseData = {
  id: '1',
  case_number: '123/2023',
  supply_date: '2023-01-15',
  case_type: 'جنائي',
  case_type_title: 'قضية سرقة منازل',
  prosecutor: 'علي محمد',
  defendant: 'خالد أحمد',
  topic_id: '1',
  objective_id: '1',
  judge_id: '1',
  history_of_ruling:
    'في الجلسة السابقة، تم الاستماع إلى شهود الدفاع وتم تأجيل القضية لجلسة أخرى.',
  judgment_date: '2023-03-20',
  comments: 'القضية معقدة وتتطلب المزيد من التحقيقات.',
}

const topics = [
  { id: '1', name: 'السرقة' },
  { id: '2', name: 'النزاعات العقارية' },
  { id: '3', name: 'العنف الأسري' },
]

const objectives = [
  { id: '1', name: 'استرداد المسروقات' },
  { id: '2', name: 'تسوية النزاع' },
  { id: '3', name: 'حماية الضحية' },
]

const judges = [
  { id: '1', name: 'القاضي أحمد علي' },
  { id: '2', name: 'القاضي محمد حسن' },
  { id: '3', name: 'القاضي سارة محمود' },
]

type CaseFormData = z.infer<typeof caseSchema>

export default function EditCase() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema),
  })

  useEffect(() => {
    if (caseData) {
      reset({
        case_number: caseData.case_number,
        supply_date: caseData.supply_date,
        case_type: caseData.case_type,
        case_type_title: caseData.case_type_title || '',
        prosecutor: caseData.prosecutor || '',
        defendant: caseData.defendant || '',
        topic_id: caseData.topic_id || '',
        objective_id: caseData.objective_id || '',
        judge_id: caseData.judge_id || '',
        history_of_ruling: caseData.history_of_ruling || '',
        judgment_date: caseData.judgment_date || '',
        comments: caseData.comments || '',
      })
    }
  }, [caseData, reset])

  const onSubmit = async (data: CaseFormData) => {
    if (!id) return
    // Mock API call to update the case
    console.log('Updating case id:', id, 'with data:', data)
  }

  // if (isLoading) {
  //   return (
  //     <div className="space-y-6">
  //       <Skeleton className="h-8 w-48" />
  //       <Skeleton className="h-96" />
  //     </div>
  //   )
  // }

  if (!caseData) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">القضية غير موجودة</h1>
        <Button onClick={() => navigate('/cases')}>العودة إلى الملفات</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">تعديل القضية</h1>
        <p className="text-muted-foreground">قم بتحديث بيانات القضية الحالية</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>بيانات القضية</CardTitle>
          <CardDescription>قم بتعديل تفاصيل هذه القضية</CardDescription>
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
                  {...register('case_number')}
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
                  {...register('supply_date')}
                />
                {errors.supply_date && (
                  <p className="text-sm text-destructive">
                    {errors.supply_date.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="case_type_title">وصف نوع القضية</Label>
                <Input
                  id="case_type_title"
                  {...register('case_type_title')}
                  placeholder="أدخل وصفاً مختصراً"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prosecutor">المدعي</Label>
                <Input
                  id="prosecutor"
                  {...register('prosecutor')}
                  placeholder="أدخل اسم المدعي"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defendant">المدعى عليه</Label>
                <Input
                  id="defendant"
                  {...register('defendant')}
                  placeholder="أدخل اسم المدعى عليه"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic_id">الموضوع</Label>
                <Select
                  value={watch('topic_id') || undefined}
                  onValueChange={(value) => setValue('topic_id', value || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الموضوع" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics?.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objective_id">الهدف</Label>
                <Select
                  value={watch('objective_id') || undefined}
                  onValueChange={(value) => setValue('objective_id', value || undefined)}
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
                  value={watch('judge_id') || undefined}
                  onValueChange={(value) => setValue('judge_id', value || undefined)}
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
                  {...register('judgment_date')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="history_of_ruling">سجل الأحكام السابقة</Label>
              <Textarea
                id="history_of_ruling"
                {...register('history_of_ruling')}
                placeholder="أدخل ملخصاً لسجل الأحكام"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">ملاحظات</Label>
              <Textarea
                id="comments"
                {...register('comments')}
                placeholder="أضف ملاحظات إضافية إن وجدت"
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'جاري التحديث...' : 'تحديث القضية'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/cases')}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

