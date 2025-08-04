"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  FileText,
  User,
  Info,
  Menu,
  Briefcase,
  Layers,
  BookOpen,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import clsx from "clsx";
import { Button } from "../../ui/button";
import { AdminLogoutButton } from "../logout";
import { cn } from "@/app/lib/utils/cn/cn";
import LanguageSwitcher from "../../language/language-toggle";
import { useTranslation } from "react-i18next";

export function AdminNavigation() {
    const { t } = useTranslation("navigation");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const adminLinks = [
    { href: "/admin", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/admin/submissions", label: t("submission"), icon: FileText },
    { href: "/admin/contact-info", label: t("contactInfo"), icon: Mail },
    { href: "/admin/hero", label: t("hero"), icon: User },
    { href: "/admin/about", label: t("about"), icon: Info },
    { href: "/admin/skills", label: t("skills"), icon: Layers },
    { href: "/admin/projects", label: t("projects"), icon: BookOpen },
    { href: "/admin/experiences", label: t("experiences"), icon: Briefcase },
  ];
  const NavLinks = () => (
    <nav className="space-y-2">
      {adminLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setOpen(false)}
          prefetch={true}
          className={clsx(
            "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
            pathname === href
              ? "bg-primary text-white"
              : "text-muted-foreground hover:bg-muted-foreground/10"
          )}
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </Link>
      ))}
      <AdminLogoutButton />
      <LanguageSwitcher />
    </nav>
  );

  return (
    <>
      {/* Mobile top nav with Sheet trigger */}
      <div
        className={cn(
          "lg:hidden flex items-center justify-between lg:p-4 border-b sticky top-0 z-50 h-fit",
          open && "bg-background"
        )}
      >
        {/* <h2 className="text-xl font-bold">Admin Panel</h2> */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mb-auto">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <h2 className="text-xl font-bold mb-8 mt-0.5 ">Admin Panel</h2>
            <NavLinks />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:h-screen bg-muted border-r p-4 sticky top-0">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <NavLinks />
      </aside>
    </>
  );
}
