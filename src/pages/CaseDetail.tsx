import { useParams, Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { Edit, ArrowLeft } from 'lucide-react'
// import { Skeleton } from '@/components/ui/skeleton'

const caseData = {
  id: '1',
  case_number: '123/2023',
  supply_date: '2023-01-15',
  case_type: 'جنائي',
  case_type_title: 'قضية سرقة منازل',
  prosecutor: 'علي محمد',
  defendant: 'خالد أحمد',
  topic: { name: 'السرقة' },
  objective: { name: 'استرداد المسروقات' },
  judge: { name: 'القاضي أحمد علي' },
  history_of_ruling:
    'في الجلسة السابقة، تم الاستماع إلى شهود الدفاع وتم تأجيل القضية لجلسة أخرى.',
  judgment_date: '2023-03-20',
  comments: 'القضية معقدة وتتطلب المزيد من التحقيقات.',
}

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>()
 

  // if (isLoading) {
  //   return (
  //     <div className="space-y-6">
  //       <Skeleton className="h-8 w-48" />
  //       <Skeleton className="h-96" />
  //     </div>
  //   )
  // }

  // if (!caseData) {
  //   return (
  //     <div className="space-y-6">
  //       <h1 className="text-3xl font-bold tracking-tight">القضية غير موجودة</h1>
  //       <Link to="/cases">
  //         <Button>العودة إلى القضايا</Button>
  //       </Link>
  //     </div>
  //   )
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/cases">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="ml-2 h-4 w-4" />
              العودة إلى القضايا
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">
            القضية {caseData.case_number}
          </h1>
        </div>
        <Link to={`/cases/${id}/edit`}>
          <Button>
            <Edit className="ml-2 h-4 w-4" />
            تعديل القضية
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>المعلومات الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                رقم القضية
              </p>
              <p className="text-lg">{caseData.case_number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                تاريخ الورود
              </p>
              <p className="text-lg">{formatDate(caseData.supply_date)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                نوع القضية
              </p>
              <p className="text-lg">{caseData.case_type}</p>
            </div>
            {caseData.case_type_title && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  وصف نوع القضية
                </p>
                <p className="text-lg">{caseData.case_type_title}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>أطراف القضية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {caseData.prosecutor && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  المدعي
                </p>
                <p className="text-lg">{caseData.prosecutor}</p>
              </div>
            )}
            {caseData.defendant && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  المدعى عليه
                </p>
                <p className="text-lg">{caseData.defendant}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تفاصيل القضية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {caseData.topic && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  الموضوع
                </p>
                <p className="text-lg">{caseData.topic.name}</p>
              </div>
            )}
            {caseData.objective && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  الهدف
                </p>
                <p className="text-lg">{caseData.objective.name}</p>
              </div>
            )}
            {caseData.judge && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  القاضي
                </p>
                <p className="text-lg">{caseData.judge.name}</p>
              </div>
            )}
            {caseData.judgment_date && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  تاريخ الحكم
                </p>
                <p className="text-lg">{formatDate(caseData.judgment_date)}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {(caseData.history_of_ruling || caseData.comments) && (
          <Card>
            <CardHeader>
              <CardTitle>معلومات إضافية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {caseData.history_of_ruling && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    سجل الأحكام
                  </p>
                  <p className="text-lg whitespace-pre-wrap">
                    {caseData.history_of_ruling}
                  </p>
                </div>
              )}
              {caseData.comments && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    ملاحظات
                  </p>
                  <p className="text-lg whitespace-pre-wrap">
                    {caseData.comments}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

