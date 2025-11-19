import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useThemeStore } from '@/store/themeStore'
import { Button } from '@/components/ui/button'
import { Moon, Sun, LogOut, Menu, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function TopNav({ onMenuClick }: { onMenuClick?: () => void }) {
  const { signOut, user } = useAuth()
  const { theme, toggleTheme } = useThemeStore()
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const getInitials = () => {
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase()
    }
    return 'U'
  }

  const handleLogout = async () => {
    setLogoutDialogOpen(false)
    await signOut()
  }

  return (
    <>
      <div className="sticky flex-row-reverse top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 animate-fade-in-down">
        <div className="flex items-center gap-x-4 lg:gap-x-6">

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="تبديل الوضع"
            className="hover:scale-110 transition-transform hover:bg-accent"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 animate-fade-in" />
            ) : (
              <Moon className="h-5 w-5 animate-fade-in" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full hover:scale-110 transition-transform hover:ring-2 hover:ring-primary"
              >
                <Avatar className="h-9 w-9 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-semibold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 animate-scale-in">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">الحساب</p>
                  <p className="text-xs leading-none text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                disabled
              >
                <User className="mr-2 h-4 w-4" />
                <span>الملف الشخصي</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setLogoutDialogOpen(true)}
                className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 transition-colors"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>تسجيل الخروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


        </div>

        <div className="flex flex-1"></div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:scale-110 transition-transform"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="animate-scale-in">
          <DialogHeader>
            <DialogTitle>تأكيد تسجيل الخروج</DialogTitle>
            <DialogDescription>
              هل أنت متأكد أنك تريد تسجيل الخروج؟ ستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى حسابك.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setLogoutDialogOpen(false)}
              className="hover:scale-105 transition-transform"
            >
              إلغاء
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="hover:scale-105 transition-transform glow-hover"
            >
              <LogOut className="mr-2 h-4 w-4" />
              تسجيل الخروج
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

