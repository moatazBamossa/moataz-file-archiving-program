import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatDate } from '@/lib/utils'
import { Eye, Edit, Trash2, Plus, Search } from 'lucide-react'
// import { Skeleton } from '@/components/ui/skeleton'

const cases = [
  {
    id: '1',
    case_number: '123/2023',
    supply_date: '2023-01-15',
    case_type: 'جنائي',
    prosecutor: 'علي محمد',
    defendant: 'خالد أحمد',
    judge: { name: 'القاضي أحمد علي' },
    topic: { name: 'السرقة' },
    objective: { name: 'استرداد المسروقات' },
    judgment_date: '2023-03-20',
  },
  {
    id: '2',
    case_number: '456/2023',
    supply_date: '2023-02-10',
    case_type: 'مدني',
    prosecutor: 'سعيد حسن',
    defendant: 'ليلى سمير',
    judge: { name: 'القاضي محمد حسن' },
    topic: { name: 'النزاعات العقارية' },
    objective: { name: 'تسوية النزاع' },
    judgment_date : '2023-04-25',
  },
]

export default function AllCases() {

  const [searchTerm, setSearchTerm] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [caseToDelete, setCaseToDelete] = useState<string | null>(null)

  const filteredCases = cases?.filter((caseItem) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      caseItem.case_number.toLowerCase().includes(searchLower) ||
      caseItem.defendant?.toLowerCase().includes(searchLower) ||
      caseItem.prosecutor?.toLowerCase().includes(searchLower) ||
      caseItem.case_type.toLowerCase().includes(searchLower) ||
      caseItem.judge?.name.toLowerCase().includes(searchLower)
    )
  })

  const handleDelete = async () => {
   // Mock API call to delete the case
   console.log('Deleting case with id:', caseToDelete)
  }

  // if (isLoading) {
  //   return (
  //     <div className="space-y-6">
  //       <Skeleton className="h-8 w-48" />
  //       <Skeleton className="h-96" />
  //     </div>
  //   )
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">جميع القضايا</h1>
          <p className="text-muted-foreground">
            اطّلع على جميع القضايا المؤرشفة وقم بإدارتها
          </p>
        </div>
        <Link to="/cases/new">
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            إضافة قضية جديدة
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث في القضايا..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-8 text-right"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>رقم القضية</TableHead>
              <TableHead>تاريخ الورود</TableHead>
              <TableHead>نوع القضية</TableHead>
              <TableHead>المدعي</TableHead>
              <TableHead>المدعى عليه</TableHead>
              <TableHead>القاضي</TableHead>
              <TableHead>الموضوع</TableHead>
              <TableHead>الهدف</TableHead>
              <TableHead>تاريخ الحكم</TableHead>
              <TableHead className="text-left">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases && filteredCases.length > 0 ? (
              filteredCases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium">
                    {caseItem.case_number}
                  </TableCell>
                  <TableCell>{formatDate(caseItem.supply_date)}</TableCell>
                  <TableCell>{caseItem.case_type}</TableCell>
                  <TableCell>{caseItem.prosecutor || '-'}</TableCell>
                  <TableCell>{caseItem.defendant || '-'}</TableCell>
                  <TableCell>{caseItem.judge?.name || '-'}</TableCell>
                  <TableCell>{caseItem.topic?.name || '-'}</TableCell>
                  <TableCell>{caseItem.objective?.name || '-'}</TableCell>
                  <TableCell>
                    {formatDate(caseItem.judgment_date)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-start gap-2">
                      <Link to={`/cases/${caseItem.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/cases/${caseItem.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCaseToDelete(caseItem.id)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center">
                  لا توجد قضايا مطابقة
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="text-right">
          <DialogHeader>
            <DialogTitle>حذف القضية</DialogTitle>
            <DialogDescription>
              هل أنت متأكد أنك تريد حذف هذه القضية؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false)
                setCaseToDelete(null)
              }}
            >
              إلغاء
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

