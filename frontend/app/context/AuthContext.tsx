import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  // Load token from cookie on mount
  useEffect(() => {
    const cookieToken = Cookies.get("admin-token") || null;
    if (cookieToken) {
      setTokenState(cookieToken);
    }
  }, []);

  const setToken = (token: string | null) => {
    setTokenState(token);
    if (token) {
      // Save token to cookie (expires in 1 hour)
      Cookies.set("admin-token", token, { expires: 1 / 24, sameSite: "lax" });
    } else {
      // Remove cookie when token is null
      Cookies.remove("admin-token");
    }
  };

  const logout = () => {
    setToken(null);
    // optionally clear localStorage/sessionStorage here too
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
