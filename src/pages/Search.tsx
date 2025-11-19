import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, exportToCSV } from "@/lib/utils";
import { Search as SearchIcon, Download } from "lucide-react";

const judges = [
  { id: "1", name: "القاضي أحمد علي" },
  { id: "2", name: "القاضي محمد حسن" },
  { id: "3", name: "القاضي سارة محمود" },
];
const results = [
  {
    id: "1",
    case_number: "123/2023",
    supply_date: "2023-01-15",
    case_type: "جنائي",
    prosecutor: "علي محمد",
    defendant: "خالد أحمد",
    judge: { name: "القاضي أحمد علي" },
    topic: { name: "السرقة" },
    objective: { name: "استرداد المسروقات" },
    judgment_date: "2023-03-20",
  },
  {
    id: "2",
    case_number: "456/2023",
    supply_date: "2023-02-10",
    case_type: "مدني",
    prosecutor: "سعيد حسن",
    defendant: "ليلى سمير",
    judge: { name: "القاضي محمد حسن" },
    topic: { name: "النزاعات العقارية" },
    objective: { name: "تسوية النزاع" },
    judgment_date: "2023-04-25",
  },
];

export default function Search() {
  const [filters, setFilters] = useState({
    case_number: "",
    defendant: "",
    prosecutor: "",
    judge_id: "",
    case_type: "",
    date_from: "",
    date_to: "",
  });
  const [searchEnabled, setSearchEnabled] = useState(false);
  // const { data: judges } = useJudges()

  console.log("searchEnabled", searchEnabled);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchEnabled(true);
  };

  const handleExport = () => {
    if (results) {
      const exportData = results.map((caseItem) => ({
        "رقم القضية": caseItem.case_number,
        "تاريخ الورود": formatDate(caseItem.supply_date),
        "نوع القضية": caseItem.case_type,
        المدعي: caseItem.prosecutor || "",
        "المدعى عليه": caseItem.defendant || "",
        القاضي: caseItem.judge?.name || "",
        الموضوع: caseItem.topic?.name || "",
        الهدف: caseItem.objective?.name || "",
        "تاريخ الحكم": formatDate(caseItem.judgment_date),
      }));
      exportToCSV(exportData, "cases-export");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">البحث في القضايا</h1>
        <p className="text-muted-foreground">
          ابحث في الأرشيف باستخدام معايير متقدمة
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>معايير البحث</CardTitle>
          <CardDescription>
            أدخل معطيات البحث للعثور على القضايا المناسبة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="case_number">رقم القضية</Label>
                <Input
                  id="case_number"
                  value={filters.case_number}
                  onChange={(e) =>
                    setFilters({ ...filters, case_number: e.target.value })
                  }
                  placeholder="أدخل رقم القضية"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defendant">المدعى عليه</Label>
                <Input
                  id="defendant"
                  value={filters.defendant}
                  onChange={(e) =>
                    setFilters({ ...filters, defendant: e.target.value })
                  }
                  placeholder="أدخل اسم المدعى عليه"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prosecutor">المدعي</Label>
                <Input
                  id="prosecutor"
                  value={filters.prosecutor}
                  onChange={(e) =>
                    setFilters({ ...filters, prosecutor: e.target.value })
                  }
                  placeholder="أدخل اسم المدعي"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="judge_id">القاضي</Label>
                <Select
                  value={filters.judge_id || undefined}
                  onValueChange={(value) => {
                    if (value) {
                      setFilters({ ...filters, judge_id: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="جميع القضاة" />
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
                <Label htmlFor="case_type">نوع القضية</Label>
                <Input
                  id="case_type"
                  value={filters.case_type}
                  onChange={(e) =>
                    setFilters({ ...filters, case_type: e.target.value })
                  }
                  placeholder="أدخل نوع القضية"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_from">من تاريخ</Label>
                <Input
                  id="date_from"
                  type="date"
                  value={filters.date_from}
                  onChange={(e) =>
                    setFilters({ ...filters, date_from: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_to">إلى تاريخ</Label>
                <Input
                  id="date_to"
                  type="date"
                  value={filters.date_to}
                  onChange={(e) =>
                    setFilters({ ...filters, date_to: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit">
                <SearchIcon className="ml-2 h-4 w-4" />
                بحث
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFilters({
                    case_number: "",
                    defendant: "",
                    prosecutor: "",
                    judge_id: "",
                    case_type: "",
                    date_from: "",
                    date_to: "",
                  });
                  setSearchEnabled(false);
                }}
              >
                مسح
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {results && results.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>نتائج البحث</CardTitle>
                <CardDescription>
                  تم العثور على {results.length} قضية
                </CardDescription>
              </div>
              <Button onClick={handleExport} variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير إلى CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((caseItem) => (
                    <TableRow key={caseItem.id}>
                      <TableCell className="font-medium">
                        {caseItem.case_number}
                      </TableCell>
                      <TableCell>{formatDate(caseItem.supply_date)}</TableCell>
                      <TableCell>{caseItem.case_type}</TableCell>
                      <TableCell>{caseItem.prosecutor || "-"}</TableCell>
                      <TableCell>{caseItem.defendant || "-"}</TableCell>
                      <TableCell>{caseItem.judge?.name || "-"}</TableCell>
                      <TableCell>{caseItem.topic?.name || "-"}</TableCell>
                      <TableCell>{caseItem.objective?.name || "-"}</TableCell>
                      <TableCell>
                        {formatDate(caseItem.judgment_date)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {results && results.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">لا توجد نتائج مطابقة</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
