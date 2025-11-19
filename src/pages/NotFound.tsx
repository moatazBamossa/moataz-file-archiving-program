import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl">404</CardTitle>
          <CardDescription>الصفحة غير موجودة</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            الصفحة التي تحاول الوصول إليها غير متوفرة أو تم نقلها.
          </p>
          <Link to="/dashboard">
            <Button className="w-full">
              <Home className="ml-2 h-4 w-4" />
              العودة إلى لوحة التحكم
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

