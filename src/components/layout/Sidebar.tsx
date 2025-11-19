import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FilePlus,
  Files,
  Search,
  Users,
  Gavel,
  Settings,
} from "lucide-react";

const navigation = [
  { name: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
  { name: "إضافة قضيه جديده", href: "/cases/new", icon: FilePlus },
  { name: "جميع القضايا", href: "/cases", icon: Files },
  { name: "بحث", href: "/search", icon: Search },
  { name: "المستخدمون", href: "/users", icon: Users },
  { name: "القضاه", href: "/judges", icon: Gavel },
  { name: "الإعدادات", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:right-0 animate-slide-in-right">
      <div className="flex-1 flex flex-col min-h-0 border-l bg-card">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 animate-fade-in-down">
            <h1 className="text-xl font-bold text-gradient">أرشيف القضايا</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    "hover:-translate-x-1",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-6 w-6 transition-transform duration-200",
                      isActive
                        ? "text-primary-foreground scale-110"
                        : "text-muted-foreground group-hover:text-accent-foreground group-hover:scale-110"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
