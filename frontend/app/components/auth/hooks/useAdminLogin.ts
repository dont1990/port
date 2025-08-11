"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { loginAdmin } from "../actions/authActions";

export function useLoginForm() {
  const { t } = useTranslation("login");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await loginAdmin(password);
      router.push("/admin");
    } catch (err: any) {
      setError(t(err.message) || t("invalidPassword"));
    } finally {
      setIsLoading(false);
    }
  }

  return {
    t,
    password,
    error,
    showPassword,
    isLoading,
    handleSubmit,
    onPasswordChange: setPassword,
    toggleShowPassword: () => setShowPassword((v) => !v),
  };
}
