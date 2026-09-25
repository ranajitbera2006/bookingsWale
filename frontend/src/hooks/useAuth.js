// src/hooks/useAuth.js
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Login failed");
      }

      // Save user record
      localStorage.setItem("broker-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success(`Welcome back, ${data.name}!`);

      // ✅ Force clean dashboard mount (eliminates white screen)
      window.location.replace("/");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem("broker-user");
      setAuthUser(null);
      setLoading(false);

      // ✅ Force clean login mount
      window.location.replace("/");
    }
  };

  return { loading, logout };
};
