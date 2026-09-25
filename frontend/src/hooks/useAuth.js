
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { safeFetch } from "../utils/api";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await safeFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

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
      await safeFetch("/api/auth/logout", {
        method: "POST",
      });
    } catch {
    
    } finally {
      localStorage.removeItem("broker-user");
      setAuthUser(null);
      setLoading(false);
      window.location.replace("/");
    }
  };

  return { loading, logout };
};
