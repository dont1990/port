"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();

  const logout = () => {
    document.cookie = "admin-auth=; path=/admin; max-age=0";
    router.push("/auth/login");
  };

  return (
    <button
      onClick={logout}
      className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 w-full mt-8"
    >
      Logout
    </button>
  );
}
