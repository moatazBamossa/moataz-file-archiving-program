import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2, Gavel, Search, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export type Judge = {
  id: string;
  name: string;
};

export default function Judges() {
  const [judges, setJudges] = useState<Judge[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedJudge, setSelectedJudge] = useState<Judge | null>(null);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // Filter judges based on search query
  const filteredJudges = judges.filter((judge) =>
    judge.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch all judges from Supabase
  const fetchJudges = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("judges")
        .select("id, name")
        .order("name", { ascending: true });

      if (error) throw error;

      setJudges(data || []);
    } catch (error) {
      console.error("Error fetching judges:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات القضاة",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Create a new judge
  const handleCreateJudge = async () => {
    if (!formData.name.trim()) return;

    try {
      setSubmitting(true);
      const { data, error } = await supabase
        .from("judges")
        .insert([{ name: formData.name.trim() }])
        .select()
        .single();

      if (error) throw error;

      // Add the new judge to the local state
      setJudges([...judges, data]);
      setFormData({ name: "" });
      setDialogOpen(false);

      toast({
        title: "تم بنجاح",
        description: "تم إضافة القاضي بنجاح",
      });
    } catch (error) {
      console.error("Error creating judge:", error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة القاضي",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Update an existing judge
  const handleEditJudge = async () => {
    if (!selectedJudge || !formData.name.trim()) return;

    try {
      setSubmitting(true);
      const { error } = await supabase
        .from("judges")
        .update({ name: formData.name.trim() })
        .eq("id", selectedJudge.id);

      if (error) throw error;

      // Update the local state
      setJudges(
        judges.map((judge) =>
          judge.id === selectedJudge.id
            ? { ...judge, name: formData.name.trim() }
            : judge
        )
      );
      setFormData({ name: "" });
      setSelectedJudge(null);
      setEditDialogOpen(false);

      toast({
        title: "تم بنجاح",
        description: "تم تحديث بيانات القاضي بنجاح",
      });
    } catch (error) {
      console.error("Error updating judge:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث بيانات القاضي",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Delete a judge
  const handleDeleteJudge = async () => {
    if (!selectedJudge) return;

    try {
      setSubmitting(true);
      const { error } = await supabase
        .from("judges")
        .delete()
        .eq("id", selectedJudge.id);

      if (error) throw error;

      // Remove from local state
      setJudges(judges.filter((judge) => judge.id !== selectedJudge.id));
      setSelectedJudge(null);
      setDeleteDialogOpen(false);

      toast({
        title: "تم بنجاح",
        description: "تم حذف القاضي بنجاح",
      });
    } catch (error) {
      console.error("Error deleting judge:", error);
      toast({
        title: "خطأ",
        description: "فشل في حذف القاضي",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const openEditDialog = (judge: Judge) => {
    setSelectedJudge(judge);
    setFormData({ name: judge.name });
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (judge: Judge) => {
    setSelectedJudge(judge);
    setDeleteDialogOpen(true);
  };

  // Fetch judges on component mount
  useEffect(() => {
    fetchJudges();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">جاري تحميل بيانات القضاة...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            القضاة
          </h1>
          <p className="text-muted-foreground text-lg">
            إدارة قائمة القضاة في النظام
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Plus className="ml-2 h-5 w-5" />
          إضافة قاضي جديد
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="ابحث عن قاضي..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 h-12 border-2 focus:border-primary transition-all duration-300"
        />
      </div>

      {/* Stats Card */}
      <Card className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border-2 border-primary/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary/20 rounded-full">
              <Gavel className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">إجمالي عدد القضاة</p>
              <p className="text-3xl font-bold text-primary">{judges.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Judges Grid */}
      {filteredJudges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJudges.map((judge, index) => (
            <Card
              key={judge.id}
              className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Animated border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />

              <CardContent className="relative p-6 space-y-4">
                {/* Judge Icon & ID */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Gavel className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        معرف القاضي
                      </p>
                      <p className="text-sm font-mono font-semibold text-primary">
                        #{judge.id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Judge Name */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {judge.name}
                  </h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-primary via-purple-600 to-pink-600 rounded-full group-hover:w-full transition-all duration-500" />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-4 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(judge)}
                    className="flex-1 group/btn hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  >
                    <Edit className="ml-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                    تعديل
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openDeleteDialog(judge)}
                    className="flex-1 group/btn hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
                  >
                    <Trash2 className="ml-2 h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    حذف
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="p-6 bg-muted rounded-full mb-4">
              <Gavel className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">لا توجد نتائج</h3>
            <p className="text-muted-foreground text-center">
              {searchQuery
                ? "لم يتم العثور على قضاة مطابقين لبحثك"
                : "لا يوجد قضاة في النظام حالياً"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Create Judge Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="text-right sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              إضافة قاضي جديد
            </DialogTitle>
            <DialogDescription>
              قم بإضافة قاضي جديد إلى النظام
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                اسم القاضي
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
                placeholder="أدخل اسم القاضي الكامل"
                className="h-12 border-2 focus:border-primary transition-all duration-300"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !submitting) handleCreateJudge();
                }}
                disabled={submitting}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                setFormData({ name: "" });
              }}
              className="hover:bg-muted"
              disabled={submitting}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleCreateJudge}
              disabled={!formData.name.trim() || submitting}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary"
            >
              {submitting ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                "حفظ القاضي"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Judge Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="text-right sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              تعديل بيانات القاضي
            </DialogTitle>
            <DialogDescription>قم بتحديث معلومات القاضي</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit_name" className="text-base font-semibold">
                اسم القاضي
              </Label>
              <Input
                id="edit_name"
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
                placeholder="أدخل اسم القاضي الكامل"
                className="h-12 border-2 focus:border-primary transition-all duration-300"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !submitting) handleEditJudge();
                }}
                disabled={submitting}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setEditDialogOpen(false);
                setSelectedJudge(null);
                setFormData({ name: "" });
              }}
              className="hover:bg-muted"
              disabled={submitting}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleEditJudge}
              disabled={!formData.name.trim() || submitting}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary"
            >
              {submitting ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                "حفظ التعديلات"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Judge Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="text-right sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-destructive">
              حذف القاضي
            </DialogTitle>
            <DialogDescription>
              هل أنت متأكد من حذف القاضي "{selectedJudge?.name}"؟ لا يمكن
              التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setSelectedJudge(null);
              }}
              className="hover:bg-muted"
              disabled={submitting}
            >
              إلغاء
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteJudge}
              className="hover:bg-destructive/90"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الحذف...
                </>
              ) : (
                "حذف"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
