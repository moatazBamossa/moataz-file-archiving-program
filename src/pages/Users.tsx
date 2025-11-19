import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2 } from 'lucide-react'
// import { Skeleton } from '@/components/ui/skeleton'
import { AppUser } from '@/types'

const users = [
  {
    id: '1',
    full_name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '0501234567',
    auth_user_id: 'auth-1',
  },
  {
    id: '2',
    full_name: 'سارة علي',
    email: 'sara@example.com',
    phone: '0509876543',
    auth_user_id: 'auth-2',
  },
]

const roles = [
  { id: 'admin', name: 'مدير' },
  { id: 'editor', name: 'محرر' },
  { id: 'viewer', name: 'مشاهد' },
]

export default function Users() {

  const [isAdmin] = useState(true)

  // Replace with actual admin check logic


  const [dialogOpen, setDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    auth_user_id: '',
  })
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  // Check if user is admin
  if (isAdmin === false) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">تم رفض الوصول</h1>
        <p className="text-muted-foreground">
          تحتاج إلى صلاحيات المدير للوصول إلى هذه الصفحة.
        </p>
      </div>
    )
  }

  const handleCreateUser = async () => {
   // Implement user creation logic here
  }

  const handleEditUser = async () => {
    if (!selectedUser) return
    // Implement user editing logic here
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return
    // Implement user deletion logic here
  }

  const handleAssignRoles = async (userId: string) => {
   // Implement role assignment logic here
   console.log('Assigning roles', selectedRoles, 'to user', userId)
      
  }

  const openEditDialog = (user: AppUser) => {
    setSelectedUser(user)
    setFormData({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone || '',
      auth_user_id: user.auth_user_id,
    })
    setEditDialogOpen(true)
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
          <h1 className="text-3xl font-bold tracking-tight">المستخدمون</h1>
          <p className="text-muted-foreground">إدارة مستخدمي النظام وصلاحياتهم</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة مستخدم
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>جميع المستخدمين</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم الكامل</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>رقم الجوال</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.full_name}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedUser(user)
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
                    <TableCell colSpan={4} className="text-center">
                      لا يوجد مستخدمون
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="text-right">
          <DialogHeader>
            <DialogTitle>إضافة مستخدم جديد</DialogTitle>
            <DialogDescription>
              قم بإنشاء حساب مستخدم جديد داخل النظام
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">الاسم الكامل</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                placeholder="أدخل الاسم الكامل"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الجوال</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="أدخل رقم الجوال"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth_user_id">معرّف المستخدم في Supabase</Label>
              <Input
                id="auth_user_id"
                value={formData.auth_user_id}
                onChange={(e) =>
                  setFormData({ ...formData, auth_user_id: e.target.value })
                }
                placeholder="أدخل معرّف المستخدم القادم من Supabase"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleCreateUser}>حفظ المستخدم</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="text-right">
          <DialogHeader>
            <DialogTitle>تعديل بيانات المستخدم</DialogTitle>
            <DialogDescription>
              قم بتحديث معلومات المستخدم وتعديل أدواره
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit_full_name">الاسم الكامل</Label>
              <Input
                id="edit_full_name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                placeholder="أدخل الاسم الكامل"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_email">البريد الإلكتروني</Label>
              <Input
                id="edit_email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_phone">رقم الجوال</Label>
              <Input
                id="edit_phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="أدخل رقم الجوال"
              />
            </div>
            {selectedUser && (
              <UserRolesManager
                userId={selectedUser.id}
                roles={roles || []}
                selectedRoles={selectedRoles}
                setSelectedRoles={setSelectedRoles}
                onAssign={handleAssignRoles}
              />
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditDialogOpen(false)
                setSelectedUser(null)
              }}
            >
              إلغاء
            </Button>
            <Button onClick={handleEditUser}>حفظ التعديلات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="text-right">
          <DialogHeader>
            <DialogTitle>حذف المستخدم</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false)
                setSelectedUser(null)
              }}
            >
              إلغاء
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function UserRolesManager({
  userId,
  roles,
  selectedRoles,
  setSelectedRoles,
  onAssign,
}: {
  userId: string
  roles: Array<{ id: string; name: string }>
  selectedRoles: string[]
  setSelectedRoles: (roles: string[]) => void
  onAssign: (userId: string) => void
}) {
  return (
    <div className="space-y-2">
      <Label>الأدوار</Label>
      <div className="space-y-2">
        {roles.map((role) => (
          <div key={role.id} className="flex items-center space-x-2 rtl:space-x-reverse">
            <input
              type="checkbox"
              id={`role-${role.id}`}
              checked={selectedRoles.includes(role.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedRoles([...selectedRoles, role.id])
                } else {
                  setSelectedRoles(selectedRoles.filter((id) => id !== role.id))
                }
              }}
            />
            <label
              htmlFor={`role-${role.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {role.name}
            </label>
          </div>
        ))}
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onAssign(userId)}
        className="mt-2"
      >
        تحديث الأدوار
      </Button>
    </div>
  )
}

