import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FilePlus, Files, Search, Users, TrendingUp } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatDate } from '@/lib/utils'

const stats = {
  totalCases: 42,
  casesByType: {
    'جنائي': 25,
    'مدني': 10,
    'إداري': 7,
  },
  casesByJudge: {
    'القاضي أحمد علي': 15,
    'القاضي محمد حسن': 12,
    'القاضي سارة محمود': 15,
  },
  latestCases: [
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
      judgment_date: '2023-04-25',
    },
  ],
}

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="animate-fade-in-down">
        <h1 className="text-3xl font-bold tracking-tight text-gradient">لوحة التحكم</h1>
        <p className="text-muted-foreground">
          نظرة عامة على نظام أرشفة القضايا
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي القضايا</CardTitle>
            <Files className="h-5 w-5 text-primary animate-pulse-slow" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary animate-scale-in">{stats?.totalCases || 0}</div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">أنواع القضايا</CardTitle>
            <TrendingUp className="h-5 w-5 text-accent animate-pulse-slow" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary animate-scale-in">
              0
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">أنواع القضايا</CardTitle>
            <TrendingUp className="h-5 w-5 text-primary animate-pulse-slow" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary animate-scale-in">
              0
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عدد القضاة</CardTitle>
            <Users className="h-5 w-5 text-primary animate-pulse-slow" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary animate-scale-in">
              0
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-fade-in-up glow-hover" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجراءات سريعة</CardTitle>
            <FilePlus className="h-5 w-5 text-primary animate-bounce-in" />
          </CardHeader>
          <CardContent>
            <Link to="/cases/new">
              <Button size="sm" className="w-full hover:scale-105 transition-transform">
                إضافة قضية جديدة
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Cases by Type */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover-lift animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="text-gradient">القضايا حسب النوع</CardTitle>
            <CardDescription>توزيع القضايا بحسب النوع</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">لا توجد قضايا حتى الآن</p>
            </div>
          </CardContent>
        </Card>

          <Card className="hover-lift animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="text-gradient">القضايا حسب القاضي</CardTitle>
              <CardDescription>توزيع القضايا بحسب القضاة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">لا توجد قضايا حتى الآن</p>
              </div>
            </CardContent>
          </Card>
        </div>
  
        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-lift animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عدد القضاة</CardTitle>
            <Users className="h-5 w-5 text-primary animate-pulse-slow" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary animate-scale-in">
              {stats ? Object.keys(stats.casesByJudge).length : 0}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-fade-in-up glow-hover" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجراءات سريعة</CardTitle>
            <FilePlus className="h-5 w-5 text-primary animate-bounce-in" />
          </CardHeader>
          <CardContent>
            <Link to="/cases/new">
              <Button size="sm" className="w-full hover:scale-105 transition-transform">
                إضافة قضية جديدة
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Cases by Type */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover-lift animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="text-gradient">القضايا حسب النوع</CardTitle>
            <CardDescription>توزيع القضايا بحسب النوع</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats && Object.entries(stats.casesByType).length > 0 ? (
                Object.entries(stats.casesByType)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([type, count], index) => (
                    <div 
                      key={type} 
                      className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 transition-colors animate-fade-in"
                      style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                    >
                      <span className="text-sm font-medium">{type}</span>
                      <span className="text-sm font-bold text-primary">{count}</span>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-muted-foreground">لا توجد قضايا حتى الآن</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle className="text-gradient">القضايا حسب القاضي</CardTitle>
            <CardDescription>توزيع القضايا بحسب القضاة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats && Object.entries(stats.casesByJudge).length > 0 ? (
                Object.entries(stats.casesByJudge)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([judge, count], index) => (
                    <div 
                      key={judge} 
                      className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 transition-colors animate-fade-in"
                      style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                    >
                      <span className="text-sm font-medium">{judge}</span>
                      <span className="text-sm font-bold text-primary">{count}</span>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-muted-foreground">لا توجد قضايا حتى الآن</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latest Cases */}
      <Card className="hover-lift animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gradient">أحدث القضايا</CardTitle>
              <CardDescription>القضايا المضافة مؤخراً</CardDescription>
            </div>
            <Link to="/cases">
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                عرض الكل
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {stats && stats.latestCases.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم القضية</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>المدعى عليه</TableHead>
                  <TableHead>القاضي</TableHead>
                  <TableHead>التاريخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.latestCases.map((caseItem, index) => (
                  <TableRow 
                    key={caseItem.id}
                    className="animate-fade-in hover:bg-accent/50 transition-colors"
                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                  >
                    <TableCell className="font-medium text-primary">
                      {caseItem.case_number}
                    </TableCell>
                    <TableCell>{caseItem.case_type}</TableCell>
                    <TableCell>{caseItem.defendant || '-'}</TableCell>
                    <TableCell>{caseItem.judge?.name || '-'}</TableCell>
                    <TableCell>{formatDate(caseItem.supply_date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">لا توجد قضايا حتى الآن</p>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link to="/cases/new">
          <Card className="hover-lift cursor-pointer bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <FilePlus className="h-5 w-5 animate-pulse-slow" />
                إضافة قضية جديدة
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/cases">
          <Card className="hover-lift cursor-pointer bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Files className="h-5 w-5 animate-pulse-slow" />
                عرض جميع القضايا
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/search">
          <Card className="hover-lift cursor-pointer bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Search className="h-5 w-5 animate-pulse-slow" />
                البحث في القضايا
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}

