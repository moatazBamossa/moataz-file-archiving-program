import { useThemeStore } from '@/store/themeStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export default function Settings() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">الإعدادات</h1>
        <p className="text-muted-foreground">قم بإدارة إعدادات التطبيق والمظهر</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>المظهر</CardTitle>
          <CardDescription>
            خصّص مظهر التطبيق بين الوضعين الفاتح والداكن
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>الوضع اللوني</Label>
              <p className="text-sm text-muted-foreground">
                اختر بين الوضع الفاتح والوضع الداكن
              </p>
            </div>
            <Button variant="outline" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <>
                  <Sun className="ml-2 h-4 w-4" />
                  الوضع الفاتح
                </>
              ) : (
                <>
                  <Moon className="ml-2 h-4 w-4" />
                  الوضع الداكن
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

