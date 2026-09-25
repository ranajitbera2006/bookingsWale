
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

const safeParse = async (res) => {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Server returned status ${res.status}`);
  }
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await safeParse(res);
      if (!res.ok || data.error) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("broker-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success(`Welcome back, ${data.name}!`);

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
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignore network errors
    } finally {
      localStorage.removeItem("broker-user");
      setAuthUser(null);
      setLoading(false);
      window.location.replace("/");
    }
  };

  return { loading, logout };
};
