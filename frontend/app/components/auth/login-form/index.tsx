"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/app/lib/utils/cn/cn";
import { useLang } from "@/app/context/langContext"; // <-- import your lang hook
import { useTranslation } from "react-i18next";


const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

const LoginForm = () => {
  const { t } = useTranslation("login");
  const { dir } = useLang();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      document.cookie = `admin-auth=${password}; path=/admin; max-age=3600; Secure; SameSite=Strict`;
      router.push(from);
    } else {
      setError("Invalid password");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center">{t("adminLogin")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder={t("enterPassword")}
                autoFocus
                aria-label={t("enterPassword")}
                className={cn(
                  "",
                  error &&
                    "border-none outline outline-red-600 pr-10 focus:outline-red-600 focus:border-none"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? t("hidePassword") : t("showPassword")
                }
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary focus:outline-none",
                  dir === "rtl" ? "left-3" : "right-3"
                )}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {error && (
              <p
                role="alert"
                className="text-sm text-red-600 font-medium text-center"
              >
                {t("invalidPassword")}
              </p>
            )}

            <Button type="submit" className="w-full">
              {t("loginButton")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
